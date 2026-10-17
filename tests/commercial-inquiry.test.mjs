import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { contract, validateCommercial, normalizePhone, isValidPhone } from '../src/features/aircraft-sales/commercialSchema.js';
import { submitCommercialInquiry } from '../src/features/aircraft-sales/services/commercialInquiry.service.js';
const base = operation => ({ operation,aircraftType:'jet',name:'María Pérez',email:'test@example.com',phone:'7221234567',country:'México',model:'',manufacturer:'Cessna',year:'',service:contract.operations[operation].fields.service?'Atención personalizada de aeronaves':'',comments:'',privacyAccepted:true,privacyVersion:contract.version });
const cases=[];
for(const operation of Object.keys(contract.operations)) {
 const valid={...base(operation),...(operation==='sell'?{model:'Citation XLS+'}:{})};
 test(operation+' accepts optional fields, free text country and Mexican national contact',()=>{
  const {errors,values}=validateCommercial(valid,operation); assert.deepEqual(errors,{});assert.equal(values.phone,'7221234567');assert.equal(values.privacyAccepted,true);
  assert.deepEqual(validateCommercial({...valid,phone:'7221234567'},operation).errors,{});
  assert.equal(validateCommercial({...valid,phone:'+1 202 555 0123'},operation).errors.phone,'phone');
 });
 const patches=[{}, {country:''},{country:'México'},{country:'ZZ'},{country:'A'},{country:'x'.repeat(81)},{country:'<bad>'},{country:'  Côte d’Ivoire  '},{aircraftType:''},{aircraftType:'unknown'},{name:'A'},{name:'n'.repeat(101)},{name:'Name\r\nBcc: attacker'},{email:'invalid'},{email:'a..b@example.com'},{email:'a'.repeat(255)+'@test.com'},{phone:''},{phone:'722123456'},{phone:'72212345678'},{phone:' 7221234567'},{phone:'+520000000000'},{phone:'123abc'},{comments:'x'.repeat(1001)},{privacyAccepted:false},{privacyAccepted:'true'}];
 if(operation==='sell')patches.push({manufacturer:'A'},{model:'A'},{model:'m'.repeat(101)},{year:'1902'},{year:String(new Date().getFullYear()+1)},{year:'2020.5'});
 else patches.push({model:'m'.repeat(121)});
 if(contract.operations[operation].fields.service) patches.push({service:''},{service:'unverified repair'},{service:'ab'},{service:'x'.repeat(121)},{service:'<bad>'},{service:'  Inspección especial  '});
 for(const patch of patches)cases.push({operation,input:{...valid,...patch}});
 test(operation+' requires each contact field and consent',()=>{
  for(const key of ['aircraftType','name','email','phone','country'])assert.ok(validateCommercial({...valid,[key]:''},operation).errors[key]);
  assert.ok(validateCommercial({...valid,privacyAccepted:false},operation).errors.privacyAccepted);
 });
}
test('PHP and frontend validate the same contract fixtures',()=>{
 const output=execFileSync('php',['tests/commercial-contract-parity.php'],{input:JSON.stringify(cases),encoding:'utf8'});
 const backend=JSON.parse(output);
 cases.forEach((fixture,index)=>{
  const front=validateCommercial(fixture.input,fixture.operation);
  assert.deepEqual(backend[index].errors,front.errors,JSON.stringify(fixture));
  if(!Object.keys(front.errors).length)assert.deepEqual(backend[index].phone,front.values.phone);
 });
});
test('commercial receipt requires server confirmation and matching request id',async()=>{
 const payload={requestId:'fixture'};
 for(const data of [{success:true},{success:true,received:true,requestId:'other',delivery:'sent'},{success:true,received:true,requestId:'fixture',delivery:'pending',stored:false}])await assert.rejects(submitCommercialInquiry(payload,{fetchImpl:async()=>({ok:true,status:200,json:async()=>data})}));
 const receipt={success:true,received:true,requestId:'fixture',delivery:'sent',stored:false};
 assert.deepEqual(await submitCommercialInquiry(payload,{fetchImpl:async()=>({ok:true,status:200,json:async()=>receipt})}),receipt);
 const pending={...receipt,delivery:'pending',stored:true};
 assert.deepEqual(await submitCommercialInquiry(payload,{fetchImpl:async()=>({ok:true,status:200,json:async()=>pending})}),pending);
});

test('phone input normalization keeps only the first ten ASCII digits',()=>{
 assert.equal(normalizePhone('abc72 21-23x456789012'),'7221234567');
 assert.equal(normalizePhone(null),'');
 for(const value of ['722123456','72212345678','+527221234567','722 1234567',' 7221234567','１２３４５６７８９０'])assert.equal(isValidPhone(value),false);
 assert.equal(isValidPhone('7221234567'),true);
});
test('free country and service text obey lengths, trim and content validation',()=>{
 for(const operation of Object.keys(contract.operations)){
  const input={...base(operation),model:operation==='sell'?'Citation':'',country:'  Côte d’Ivoire  ',service:'  Inspección especial y mantenimiento  '};
  const result=validateCommercial(input,operation);assert.deepEqual(result.errors,{});assert.equal(result.values.country,'Côte d’Ivoire');
  for(const value of ['', 'A', 'x'.repeat(81), '<script>', 'México\nBcc: bad'])assert.ok(validateCommercial({...input,country:value},operation).errors.country);
  for(const value of ['', '12', 'x'.repeat(121), '<script>'])if(contract.operations[operation].fields.service)assert.ok(validateCommercial({...input,service:value},operation).errors.service);
  assert.equal(validateCommercial({...input,phone:''},operation).errors.phone,'phoneRequired');
  for(const value of ['722123456','72212345678','722-1234567',' 7221234567'])assert.equal(validateCommercial({...input,phone:value},operation).errors.phone,'phone');
 }
});
