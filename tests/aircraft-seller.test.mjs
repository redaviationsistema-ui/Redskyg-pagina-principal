import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { randomUUID } from 'node:crypto';
import { validateSeller, validateFiles } from '../src/features/aircraft-sales/sellerSchema.js';
import { createSellerApi, decodeSellerFiles } from '../server/aircraft-seller-api.mjs';
const valid = () => ({ aircraft_type:'Jet privado',manufacturer:'Cessna',model:'Citation XLS+',manufacturing_year:2012,registration:'n123ab',country:'México',city:'Toluca',aircraft_status:'Operativa',contact_name:'Propietario de prueba',email:'owner@example.com',phone:'7221234567',relationship_to_aircraft:'Propietario',preferred_contact_method:'Correo electrónico',currency:'USD',price_to_be_defined:true,privacy_accepted:true,request_id:randomUUID(),turnstile_token:'test-token',files:[] });
const env = { SELLER_ALLOWED_ORIGINS:'https://redskyg.com',TURNSTILE_SECRET_KEY:'test-secret',SELLER_IP_HASH_SECRET:'test-ip-hash-secret' };
async function invoke(handler, data, { path='/api/aircraft-seller',method='POST',headers={} } = {}) {
  const req=Readable.from([Buffer.from(JSON.stringify(data))]);
  req.method=method;req.headers={'content-type':'application/json',origin:'https://redskyg.com',...headers};req.socket={remoteAddress:'127.0.0.1'};
  let response;const res={writeHead(status){this.status=status;},end(body){response={status:this.status,body:JSON.parse(body)};}};
  await handler(req,res,new URL(path,'https://redskyg.com'));
  return response;
}
function fixture({ failSave=false, failMail=false, captcha={}, authorized=false }={}) {
  const tables={ aircraft_sale_submissions:[],aircraft_sale_submission_files:[],aircraft_seller_email_outbox:[],aircraft_seller_admins:authorized?[{user_id:'admin'}]:[] };
  let uploads=0, removals=0, emailCalls=0;
  const db={
    auth:{getUser:async()=>({data:{user:{id:'admin'}}})},
    from(name){
      const filters=[];let patch=null,single=false;
      const query={
        select(){return this;},eq(key,value){filters.push(row=>row[key]===value);return this;},neq(key,value){filters.push(row=>row[key]!==value);return this;},
        update(value){patch=value;return this;},maybeSingle(){single=true;return this;},single(){single=true;return this;},
        then(resolve,reject){try{const matches=(tables[name]||[]).filter(row=>filters.every(f=>f(row)));if(patch)matches.forEach(row=>Object.assign(row,patch));return Promise.resolve({data:single?matches[0]||null:matches,error:null}).then(resolve,reject);}catch(e){return Promise.reject(e).then(resolve,reject);}}
      };return query;
    },
    storage:{from(){return {upload:async()=>{uploads++;return {data:{},error:null};},remove:async(paths)=>{removals+=paths.length;return {data:[],error:null};}};}},
    async rpc(name,args){
      if(failSave)return {error:{message:'DB failure'}};
      assert.equal(name,'register_aircraft_seller');
      tables.aircraft_sale_submissions.push(args.p_submission);
      tables.aircraft_sale_submission_files.push(...args.p_files.map(f=>({...f,submission_id:args.p_submission.id})));
      tables.aircraft_seller_email_outbox.push(...['owner','internal'].map(kind=>({submission_id:args.p_submission.id,kind,status:'pending'})));
      return {data:args.p_submission.id,error:null};
    }
  };
  const handler=createSellerApi({...env,RESEND_API_KEY:'test-mail-key',SELLER_EMAIL_FROM:'Sky Group <sales@example.com>'},{db,fetch:async(url)=>{
    if(url.includes('siteverify'))return {ok:true,json:async()=>({success:true,action:'aircraft_seller',hostname:'redskyg.com',...captcha})};
    emailCalls++;return {ok:!failMail,json:async()=>failMail?{message:'rejected'}:{id:`mail-${emailCalls}`}};
  }});
  return {handler,tables,stats:()=>({uploads,removals,emailCalls})};
}
const pdf={name:'specifications.pdf',type:'application/pdf',data:Buffer.from('%PDF-1.7\nTest document').toString('base64')};
test('normalizes valid data and ignores client administrative fields',()=>{
  const data=validateSeller({...valid(),asking_price:123,submission_status:'accepted',admin_notes:'untrusted'});
  assert.equal(data.registration,'N123AB');assert.equal(data.asking_price,null);assert.equal(data.submission_status,undefined);assert.equal(data.admin_notes,undefined);
});
test('rejects missing privacy, invalid enums, numeric fields and international phones',()=>{
  for(const patch of [{privacy_accepted:false},{aircraft_type:'unknown'},{manufacturing_year:3000},{total_cycles:2.5},{total_time:-1},{phone:'722123456'},{email:'invalid'}])assert.throws(()=>validateSeller({...valid(),...patch}));
});
test('rejects file content spoofing, paths, excessive size, count and combined size',()=>{
  assert.equal(decodeSellerFiles([pdf])[0].size,Buffer.from(pdf.data,'base64').length);
  assert.throws(()=>decodeSellerFiles([{...pdf,data:Buffer.from('<script>').toString('base64')}]));
  assert.throws(()=>decodeSellerFiles([{...pdf,name:'../file.pdf'}]));
  assert.throws(()=>validateFiles(Array(7).fill({name:'a.pdf',type:'application/pdf',size:10})));
  assert.throws(()=>validateFiles([{name:'a.pdf',type:'application/pdf',size:6*1024*1024}]));
  assert.throws(()=>validateFiles(Array(5).fill({name:'a.pdf',type:'application/pdf',size:5*1024*1024})));
});
test('unconfigured service fails closed and public reads are refused',async()=>{
  assert.equal((await invoke(createSellerApi({}),valid())).status,503);
  const f=fixture();assert.equal((await invoke(f.handler,{}, {method:'GET'})).status,405);
});
test('rejects foreign origins, spam traps and invalid captcha before upload',async()=>{
  const f=fixture();assert.equal((await invoke(f.handler,valid(),{headers:{origin:'https://evil.example'}})).status,403);
  assert.equal((await invoke(f.handler,{...valid(),website:'spam'})).status,400);
  const invalid=fixture({captcha:{hostname:'evil.example'}});assert.equal((await invoke(invalid.handler,{...valid(),files:[pdf]})).status,400);assert.equal(invalid.stats().uploads,0);
});
test('saves private file linkage and confirms mail only after provider success',async()=>{
  const f=fixture();const result=await invoke(f.handler,{...valid(),files:[pdf]});
  assert.equal(result.status,201);assert.equal(result.body.email_status,'sent');
  assert.equal(f.tables.aircraft_sale_submissions.length,1);assert.equal(f.tables.aircraft_sale_submission_files.length,1);
  assert.equal(f.tables.aircraft_sale_submission_files[0].submission_id,result.body.id);
  assert.equal(f.stats().emailCalls,2);assert.ok(f.tables.aircraft_seller_email_outbox.every(job=>job.status==='sent'&&job.provider_id));
});
test('email rejection preserves saved submission and records failure',async()=>{
  const f=fixture({failMail:true});const result=await invoke(f.handler,valid());
  assert.equal(result.status,201);assert.equal(result.body.email_status,'failed');assert.equal(f.tables.aircraft_sale_submissions.length,1);assert.ok(f.tables.aircraft_seller_email_outbox.every(job=>job.status==='failed'&&!job.sent_at));
});
test('failed persistence never returns success or sends mail; removes uploads',async()=>{
  const f=fixture({failSave:true});const result=await invoke(f.handler,{...valid(),files:[pdf]});
  assert.equal(result.status,500);assert.equal(f.stats().emailCalls,0);assert.ok(f.stats().removals>=1);assert.equal(f.tables.aircraft_sale_submissions.length,0);
});
test('retry is idempotent; altered payload conflicts',async()=>{
  const f=fixture();const data={...valid(),files:[pdf]};const first=await invoke(f.handler,data);const second=await invoke(f.handler,data);
  assert.equal(first.body.id,second.body.id);assert.equal(f.tables.aircraft_sale_submissions.length,1);assert.equal(f.stats().uploads,1);assert.equal(f.stats().emailCalls,2);
  assert.equal((await invoke(f.handler,{...data,model:'Another model'})).status,409);
});
test('admin data requires verified JWT and membership, not a client claim',async()=>{
  const f=fixture();assert.equal((await invoke(f.handler,{}, {path:'/api/aircraft-seller/admin',method:'GET'})).status,401);
  assert.equal((await invoke(f.handler,{}, {path:'/api/aircraft-seller/admin',method:'GET',headers:{authorization:'Bearer client-token'}})).status,403);
});
test('burst limit rejects excessive requests',async()=>{
  const f=fixture();let response;for(let i=0;i<9;i++)response=await invoke(f.handler,{...valid(),website:'spam'});
  assert.equal(response.status,429);
});
