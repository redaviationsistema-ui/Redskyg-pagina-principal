import test from 'node:test';
import assert from 'node:assert/strict';
import { aircraftInquiryUrl, buildAircraftInquiryPayload, submitAircraftInquiry } from '../src/features/aircraft-sales/services/aircraftInquiry.service.js';
import { validateSeller } from '../src/features/aircraft-sales/sellerSchema.js';
import { aircraftTypeOptions, validateCommercial } from '../src/features/aircraft-sales/commercialSchema.js';
const seller = () => ({ aircraft_type:'Jet privado',manufacturer:'Cessna',model:'Citation XLS+',manufacturing_year:'2012',registration:'n123ab',serial_number:'123',total_time:'2250',total_cycles:'1800',country:'México',city:'Toluca',asking_price:'2300000',price_to_be_defined:false,currency:'USD',aircraft_status:'Operativa',aircraft_notes:'Prueba simulada',contact_name:'Propietario de prueba',company:'Empresa de prueba',email:'owner@example.com',phone:'7221234567',relationship_to_aircraft:'Propietario',preferred_contact_method:'Correo electrónico',privacy_accepted:true });
const mock = (status,data) => async()=>({ok:status>=200&&status<300,status,json:async()=>data});
test('uses relative same-origin PHP URL by default',()=>assert.equal(aircraftInquiryUrl,'/aircraft-inquiry.php'));
test('maps real seller fields to PHP without DB, captcha, attachments or invented data',()=>{
  const input=seller(),validated=validateSeller(input);const payload=buildAircraftInquiryPayload({...validated,privacy_accepted:input.privacy_accepted},'sell');
  assert.deepEqual(payload,{operation:'sell',aircraftType:'jet',manufacturer:'Cessna',model:'Citation XLS+',year:'2012',registration:'N123AB',serialNumber:'123',totalHours:'2250',totalCycles:'1800',country:'México',city:'Toluca',askingPrice:'2300000',priceToBeDefined:false,currency:'USD',aircraftStatus:'Operativa',company:'Empresa de prueba',relationship:'Propietario',preferredContact:'Correo electrónico',comments:'Prueba simulada',name:'Propietario de prueba',email:'owner@example.com',phone:'7221234567',privacyAccepted:true,website:''});
});
test('selector keeps Spanish labels while storing and validating PHP aircraft codes',()=>{
  assert.deepEqual(aircraftTypeOptions(['Jet privado','Turbohélice','Helicóptero','Otro']),[
    {label:'Jet privado',value:'jet'},{label:'Turbohélice',value:'turboprop'},{label:'Helicóptero',value:'helicopter'},{label:'Otro',value:'other'},
  ]);
  const input={aircraftType:'jet',country:'México',name:'María Pérez',email:'maria@example.com',phone:'7221234567',privacyAccepted:true};
  assert.equal(validateCommercial(input,'buy').values.aircraftType,'jet');
  for(const type of ['jet','turboprop','helicopter','other']) assert.equal(buildAircraftInquiryPayload({aircraftType:type},'buy').aircraftType,type);
});
test('price to be defined does not submit a stale asking price',()=>{
  const payload=buildAircraftInquiryPayload({...seller(),price_to_be_defined:true},'sell');assert.equal(payload.askingPrice,'');
});
test('rejects all missing required seller fields and privacy',()=>{
  for(const key of ['aircraft_type','manufacturer','model','country','contact_name','email','phone']) assert.throws(()=>validateSeller({...seller(),[key]:''}));
  assert.throws(()=>validateSeller({...seller(),privacy_accepted:false}));
});
test('does not split free text manufacturer/model or invent buyer fields',()=>{
  const form={aircraft_type:'Helicóptero',manufacturer_model:'Airbus Helicopters H145',approximate_year:'',registration:'',budget_range:'1m_3m',primary_use:'Personal',country:'Perú',company:'',comments:'',contact_name:'Comprador',email:'buyer@example.com',phone:'9876543210',privacy_accepted:true};
  const payload=buildAircraftInquiryPayload(form,'buy','');assert.equal(payload.model,form.manufacturer_model);assert.equal(payload.manufacturer,'');assert.equal(payload.year,'');assert.equal(payload.budget,'USD $1,000,000 a $3,000,000');assert.equal(payload.registration,'');assert.equal(payload.city,undefined);assert.equal(payload.privacyAccepted,true);
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
  await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>({ok:false,status:500,json:async()=>{throw Error('empty response');}})}),/respuesta inválida/);
});
test('handles network errors and timeouts without disclosing details',async()=>{
  for(const reason of [new TypeError('Failed to fetch'),new DOMException('Timeout','TimeoutError')]) await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>{throw reason;}}),/No se pudo conectar/);
});
test('rejects invalid operation',()=>assert.throws(()=>buildAircraftInquiryPayload({},'other')));

test('normalizes only explicit PHP payload fields, preserving booleans and source data', () => {
  const input={...seller(), manufacturing_year:2006, total_time:3520.5,total_cycles:4200,asking_price:null,privacy_accepted:true,price_to_be_defined:true};
  const before=structuredClone(input), payload=buildAircraftInquiryPayload(input,'sell');
  assert.deepEqual(input,before);
  assert.equal(payload.year,'2006');assert.equal(payload.totalHours,'3520.5');assert.equal(payload.totalCycles,'4200');assert.equal(payload.askingPrice,'');
  assert.equal(payload.priceToBeDefined,true);assert.equal(payload.privacyAccepted,true);
  for (const [key,value] of Object.entries(payload)) assert.equal(typeof value,['privacyAccepted','priceToBeDefined'].includes(key)?'boolean':'string');
  assert.equal(buildAircraftInquiryPayload({...input,price_to_be_defined:false,asking_price:123.45},'sell').askingPrice,'123.45');
  assert.equal(buildAircraftInquiryPayload({...input,privacy_accepted:'true'},'sell').privacyAccepted,false);
});
test('buyer optional values are empty strings and entered year becomes a string', () => {
  for(const year of [undefined,null,'',2008,'2008']) {
    const payload=buildAircraftInquiryPayload({approximate_year:year,manufacturer_model:'SA226-T(B)',privacy_accepted:true},'buy');
    assert.equal(payload.year,year==null||year===''?'':'2008');assert.equal(payload.manufacturer,'');assert.equal(payload.registration,'');assert.equal(payload.model,'SA226-T(B)');assert.equal(payload.privacyAccepted,true);
    for(const [key,value] of Object.entries(payload))assert.equal(typeof value,key==='privacyAccepted'?'boolean':'string');
  }
});
test('shows only allowlisted PHP validation messages for JSON HTTP 422', async () => {
  for(const message of ['Valor inválido: year','Campo obligatorio: aircraftType','Debes aceptar el aviso de privacidad','Nombre, correo válido y teléfono son obligatorios']) {
    await assert.rejects(submitAircraftInquiry({},{fetchImpl:mock(422,{success:false,message})}),e=>e.message===message);
  }
  for(const message of ['Valor inválido: SMTP_PASSWORD','Valor inválido: year password=SECRET','Campo obligatorio: /home/private','SMTP authentication failed','<b>Valor inválido: year</b>','test@example.com']) {
    await assert.rejects(submitAircraftInquiry({},{fetchImpl:mock(422,{success:false,message})}),e=>e.message==='El servidor no aceptó los datos de la solicitud. Contacta a nuestro equipo para recibir asistencia.');
  }
});
test('distinguishes 403, 502, 503, HTML and malformed JSON', async () => {
  const messages=[];
  for(const status of [403,502,503]) {
    try { await submitAircraftInquiry({},{fetchImpl:mock(status,{success:false,message:'private'})}); } catch(e) {messages.push(e.message);}
  }
  assert.equal(new Set(messages).size,3);
  await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>({ok:false,status:422,headers:new Headers({'Content-Type':'text/html; charset=UTF-8'}),json:async()=>{throw Error();}})}),/HTML en lugar de JSON/);
  await assert.rejects(submitAircraftInquiry({},{fetchImpl:async()=>({ok:false,status:422,json:async()=>{throw Error();}})}),/respuesta inválida/);
});
test('safe backend validation messages remain specific in ES and EN', async () => {
  const {localizedInquiryError}=await import('../src/features/aircraft-sales/services/aircraftInquiry.service.js');
  assert.equal(localizedInquiryError('Valor inválido: year','en'),'Invalid value: year');
  assert.equal(localizedInquiryError('Campo obligatorio: aircraftType','es'),'Campo obligatorio: aircraftType');
  assert.equal(localizedInquiryError('Campo obligatorio: aircraftType','en'),'Required field: aircraftType');
  assert.equal(localizedInquiryError('SMTP_PASSWORD=SECRET','en'),'');
});
