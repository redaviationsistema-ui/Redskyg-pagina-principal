import {chromium} from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage();const logs=[];page.on('console',async message=>{if(message.text().startsWith('[SKY GROUP]'))logs.push({type:message.type(),text:message.text()});});
 await page.goto('http://127.0.0.1:5174/vender-aeronave');await page.locator('.service-choice').last().waitFor();
 await page.evaluate(async()=>{
  const {submitAircraftInquiry}=await import('/src/features/aircraft-sales/services/aircraftInquiry.service.js');
  for(const [status,body,type] of [[503,{success:false,code:'configuration',message:'SECRET_SENTINEL SMTP password private@example.com'},'application/json'],[429,{success:false,code:'rate_limit'},'application/json'],[422,{success:false,errors:{email:'email'}},'application/json'],[502,'<html>SECRET_SENTINEL</html>','text/html'],[200,{success:true,received:true},'application/json']]){
   try{await submitAircraftInquiry({operation:'buy',name:'SECRET_SENTINEL'},{fetchImpl:async()=>new Response(typeof body==='string'?body:JSON.stringify(body),{status,headers:{'Content-Type':type,'Retry-After':'900'}})});}catch{}
  }
  try{await submitAircraftInquiry({operation:'buy'},{fetchImpl:async()=>{throw Error('SECRET_SENTINEL');}});}catch{}
  let resolve;const first=submitAircraftInquiry({operation:'buy'},{fetchImpl:()=>new Promise(r=>resolve=r)});try{await submitAircraftInquiry({operation:'buy'});}catch{}resolve(new Response('{"success":true}',{headers:{'Content-Type':'application/json'}}));await first;
 });
 await page.waitForTimeout(100);
 const text=JSON.stringify(logs);assert.ok(!text.includes('SECRET_SENTINEL'));assert.ok(!text.includes('private@example.com'));for(const term of ['503','429','900','configuración','simultáneo','HTML','elapsedMs'])assert.ok(text.includes(term),term);
 await writeFile('artifacts/inquiry-diagnostics/browser-logs.json',JSON.stringify({responseMode:'injected fixtures only; no real POST sent',logs},null,2));console.log('PASS Chrome DEV logs, 503/429/422/HTML/network/duplicate diagnostics and no secret echoes');
}finally{await browser.close();}
