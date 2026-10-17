import test from 'node:test';
import assert from 'node:assert/strict';
import { aircraftInquiryUrl, buildAircraftInquiryPayload, submitAircraftInquiry } from '../src/features/aircraft-sales/services/aircraftInquiry.service.js';
import { validateSeller } from '../src/features/aircraft-sales/sellerSchema.js';
const seller = () => ({ aircraft_type:'Jet privado',manufacturer:'Cessna',model:'Citation XLS+',manufacturing_year:'2012',registration:'n123ab',serial_number:'123',total_time:'2250',total_cycles:'1800',country:'México',city:'Toluca',asking_price:'2300000',price_to_be_defined:false,currency:'USD',aircraft_status:'Operativa',aircraft_notes:'Prueba simulada',contact_name:'Propietario de prueba',company:'Empresa de prueba',email:'owner@example.com',phone:'+52 722 123 4567',relationship_to_aircraft:'Propietario',preferred_contact_method:'Correo electrónico',privacy_accepted:true });
const mock = (status,data) => async()=>({ok:status>=200&&status<300,status,json:async()=>data});
test('uses relative same-origin PHP URL by default',()=>assert.equal(aircraftInquiryUrl,'/aircraft-inquiry.php'));
test('maps real seller fields to PHP without DB, captcha, attachments or invented data',()=>{
  const input=seller(),validated=validateSeller(input);const payload=buildAircraftInquiryPayload({...validated,privacy_accepted:input.privacy_accepted},'sell');
  assert.deepEqual(payload,{operation:'sell',aircraftType:'Jet privado',manufacturer:'Cessna',model:'Citation XLS+',year:2012,registration:'N123AB',serialNumber:'123',totalHours:2250,totalCycles:1800,country:'México',city:'Toluca',askingPrice:2300000,currency:'USD',aircraftStatus:'Operativa',company:'Empresa de prueba',relationship:'Propietario',preferredContact:'Correo electrónico',comments:'Prueba simulada',name:'Propietario de prueba',email:'owner@example.com',phone:'+52 722 123 4567',privacyAccepted:true,website:''});
});
test('price to be defined does not submit a stale asking price',()=>{
  const payload=buildAircraftInquiryPayload({...seller(),price_to_be_defined:true},'sell');assert.equal(payload.askingPrice,null);
});
test('rejects all missing required seller fields and privacy',()=>{
  for(const key of ['aircraft_type','manufacturer','model','manufacturing_year','registration','country','city','contact_name','email','phone']) assert.throws(()=>validateSeller({...seller(),[key]:''}));
  assert.throws(()=>validateSeller({...seller(),privacy_accepted:false}));
});
test('does not split free text manufacturer/model or invent buyer fields',()=>{
  const form={aircraft_type:'Helicóptero',manufacturer_model:'Airbus Helicopters H145',approximate_year:'',registration:'',budget_range:'1m_3m',primary_use:'Personal',country:'Perú',company:'',comments:'',contact_name:'Comprador',email:'buyer@example.com',phone:'+51 987654321',privacy_accepted:true};
  const payload=buildAircraftInquiryPayload(form,'buy','');assert.equal(payload.model,form.manufacturer_model);assert.equal(payload.manufacturer,undefined);assert.equal(payload.year,null);assert.equal(payload.budget,'USD $1,000,000 a $3,000,000');assert.equal(payload.registration,'');assert.equal(payload.city,undefined);assert.equal(payload.privacyAccepted,true);
});
test('posts JSON and accepts strictly confirmed mail success with no id',async()=>{
  let sent;
  const data=await submitAircraftInquiry({operation:'buy'},{endpoint:'/mock-php',fetchImpl:async(url,options)=>{sent={url,...options};return {ok:true,status:200,json:async()=>({success:true,confirmation_pending:true})};}});
  assert.equal(sent.url,'/mock-php');assert.equal(sent.method,'POST');assert.equal(sent.headers['Content-Type'],'application/json');assert.equal(sent.headers.Accept,'application/json');assert.equal(sent.mode,undefined);assert.deepEqual(JSON.parse(sent.body),{operation:'buy'});assert.equal(data.success,true);assert.equal(data.confirmation_pending,true);
});
test('accepts confirmation pending without claiming client confirmation was sent',async()=>{
  const data=await submitAircraftInquiry({},{fetchImpl:mock(200,{success:true,email_status:'pending'})});assert.equal(data.email_status,'pending');
});
test('rejects invalid or non JSON success responses',async()=>{
  for(const data of [null,[],{},true,{success:'true'},{success:1},{success:false}]) await assert.rejects(submitAircraftInquiry({},{fetchImpl:mock(200,data)}));
  await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>({ok:true,status:200,json:async()=>{throw new Error('HTML');}})}),/respuesta inválida/);
});
test('handles HTTP failures even when body incorrectly says success',async()=>{
  for(const status of [400,405,413,422,429,500,502,503,404])await assert.rejects(submitAircraftInquiry({},{fetchImpl:mock(status,{success:true,message:'SMTP password=PRIVATE',exception:'/home/private'})}),error=>!error.message.includes('PRIVATE')&&!error.message.includes('/home'));
});
test('never exposes SMTP configuration or authentication diagnostics',async()=>{
  for(const message of ['SMTP_PASSWORD missing','SMTP connect() failed','SMTP authentication failed password=PRIVATE','<script>alert(1)</script>']) await assert.rejects(submitAircraftInquiry({},{fetchImpl:mock(500,{success:false,message})}),e=>e.message==='No fue posible enviar tu solicitud. Inténtalo de nuevo o contacta a nuestro equipo.');
});
test('handles empty non JSON HTTP 500 from hosting',async()=>{
  await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>({ok:false,status:500,json:async()=>{throw Error('empty response');}})}),/No fue posible enviar/);
});
test('handles network errors and timeouts without disclosing details',async()=>{
  for(const reason of [new TypeError('Failed to fetch'),new DOMException('Timeout','TimeoutError')]) await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>{throw reason;}}),/No se pudo conectar/);
});
test('rejects invalid operation',()=>assert.throws(()=>buildAircraftInquiryPayload({},'other')));
