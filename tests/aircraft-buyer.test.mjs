import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBuyer, buyerBudgets } from '../src/features/aircraft-sales/buyerSchema.js';
import { submitBuyer } from '../src/features/aircraft-sales/services/aircraftBuyer.service.js';
const valid = () => ({ aircraft_type:'Jet privado',manufacturer_model:'Cessna Citation XLS+',approximate_year:'',budget_range:'undefined',registration:'',primary_use:'Corporativo',contact_name:'Comprador de prueba',company:'',email:'buyer@example.com',phone:'+52 722 123 4567',country:'México',comments:'',privacy_accepted:true });
test('purchase validation needs no seller registration, year, cycles or documents',()=>{
  const result=validateBuyer(valid());assert.equal(result.operation_type,'purchase');assert.equal(result.approximate_year,null);assert.equal(result.budget_min,null);assert.equal(result.registration,'');assert.equal(result.files,undefined);
});
test('validates all budget bands and USD amounts',()=>{
  for(const [key,,min,max] of buyerBudgets){const value=validateBuyer({...valid(),budget_range:key});assert.equal(value.budget_min,min);assert.equal(value.budget_max,max);assert.equal(value.currency,'USD');}
});
test('rejects invalid required fields, privacy, year, enums and phone',()=>{
  for(const patch of [{contact_name:''},{manufacturer_model:' '},{email:'invalid'},{phone:'7221234567'},{country:''},{privacy_accepted:false},{approximate_year:3000},{approximate_year:2020.5},{approximate_year:[]},{budget_range:'other'},{primary_use:'invalid'},{aircraft_type:'unknown'},{registration:'<script>'}])assert.throws(()=>validateBuyer({...valid(),...patch}));
});
test('purchase submits email inquiry without a database persistence requirement',async()=>{
  let body;
  const result=await submitBuyer(validateBuyer(valid()),{endpoint:'/test-only',fetchImpl:async(url,options)=>{
    body=JSON.parse(options.body);return {ok:true,json:async()=>({success:true,confirmation_pending:true})};
  }});
  assert.equal(body.operation,'buy');assert.equal(body.model,'Cessna Citation XLS+');assert.equal(body.name,'Comprador de prueba');assert.equal(body.privacyAccepted,true);
  assert.equal(body.budget,'Por definir');assert.equal(body.manufacturer,undefined);assert.equal(body.operation_type,undefined);assert.equal(result.success,true);
});
