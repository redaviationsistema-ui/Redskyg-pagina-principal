import test from 'node:test';
import assert from 'node:assert/strict';
import { safeInquiryResponse, diagnosticEndpoint, classifyInquiryFailure, createInquiryDiagnostics, safeRetryAfter } from '../src/features/aircraft-sales/services/inquiryDiagnostics.js';
import { submitAircraftInquiry } from '../src/features/aircraft-sales/services/aircraftInquiry.service.js';
test('diagnostic JSON excludes arbitrary PHP messages, echoes, IDs and SMTP secrets',()=>{
 const result=safeInquiryResponse({success:false,code:'configuration',message:'SMTP secret test@example.com 7221234567',name:'Person',requestId:'private',token:'secret',errors:{email:'email',phone:'leaked phone',unexpected:'required'},nested:{password:'secret'}});
 assert.deepEqual(result,{success:false,code:'configuration',message:'[Mensaje PHP oculto: no pertenece al catálogo seguro]',errors:{email:'email'}});
 assert.ok(!JSON.stringify(result).includes('test@example.com'));
});
test('endpoint strips credentials/query/hash and Retry-After allows only standard values',()=>{
 assert.equal(diagnosticEndpoint('https://user:password@example.com/aircraft-inquiry.php?token=private#email'),'https://example.com/aircraft-inquiry.php');
 assert.equal(safeRetryAfter('900'),'900');assert.equal(safeRetryAfter('Wed, 21 Oct 2026 07:28:00 GMT'),'Wed, 21 Oct 2026 07:28:00 GMT');assert.ok(!safeRetryAfter('secret@example.com').includes('secret'));
});
test('classifies only backend-confirmed causes and distinguishes ambiguous proxy failures',()=>{
 assert.match(classifyInquiryFailure(503,{code:'configuration'}),/configuración/);
 assert.match(classifyInquiryFailure(503,{code:'delivery_failed'}),/envío comercial/);
 assert.match(classifyInquiryFailure(503,{}),/no determinado/);
 assert.match(classifyInquiryFailure(429,{code:'rate_limit'}),/confirmado/);
 assert.match(classifyInquiryFailure(503,null,'html'),/indeterminado/);
});
test('disabled diagnostics emit nothing; enabled logs have the required prefix',()=>{
 const calls=[];const logger=Object.fromEntries(['log','warn','error'].map(key=>[key,(...args)=>calls.push(args)]));
 const disabled=createInquiryDiagnostics(false,logger);disabled.log('start',{});disabled.warn('warn',{});disabled.error('error',{});assert.equal(calls.length,0);
 createInquiryDiagnostics(true,logger).log('start',{method:'POST'});assert.ok(calls[0][0].startsWith('[SKY GROUP][AIRCRAFT INQUIRY]'));
});
test('overlapping requests are blocked with no automatic retry and lock releases after failure',async()=>{
 let unblock;let calls=0;
 const first=submitAircraftInquiry({operation:'buy'},{fetchImpl:()=>{calls++;return new Promise(resolve=>{unblock=resolve;});}});
 await assert.rejects(submitAircraftInquiry({operation:'sell'},{fetchImpl:()=>{calls++;}}),error=>error.code==='in_progress');assert.equal(calls,1);
 unblock({status:503,ok:false,json:async()=>({success:false,code:'configuration'})});await assert.rejects(first);
 assert.deepEqual(await submitAircraftInquiry({operation:'buy'},{fetchImpl:async()=>({ok:true,status:200,json:async()=>({success:true})})}),{success:true});
});
