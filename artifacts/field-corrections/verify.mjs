import {chromium} from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[];const errors=[];
try{
for(const width of [1440,390])for(const locale of ['es','en'])for(const mode of ['buy','sell','management','maintenance']){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));let payload;
 await page.route('**/aircraft-inquiry.php',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true,received:true,stored:false,delivery:'sent',requestId:payload.requestId})});});
 await page.goto('http://127.0.0.1:5174/'+(locale==='es'?'mx':'en')+'/solicitud/'+mode);
 const phone=page.locator('#commercial-phone');await phone.waitFor();await phone.focus();await phone.pressSequentially('722123456');
 assert.equal(await phone.getAttribute('aria-invalid'),null);await phone.blur();assert.equal(await phone.getAttribute('aria-invalid'),'true');
 assert.equal(await page.locator('#field-error-phone').innerText(),locale==='es'?'El teléfono debe contener 10 dígitos.':'The phone number must contain 10 digits.');
 await phone.focus();await phone.press('End');await phone.pressSequentially('789012');assert.equal(await phone.inputValue(),'7221234567');await page.waitForTimeout(30);assert.equal(await phone.getAttribute('aria-invalid'),null);
 await phone.fill('');await phone.pressSequentially('abc -+()');assert.equal(await phone.inputValue(),'');
 await phone.evaluate(el=>{el.focus();const dt=new DataTransfer();dt.setData('text','abc72 21-23foo456789012');el.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));});assert.equal(await phone.inputValue(),'7221234567');
 await phone.evaluate(el=>{el.focus();el.setSelectionRange(3,5);});await phone.pressSequentially('98');assert.equal(await phone.inputValue(),'7229834567');assert.equal(await phone.evaluate(el=>el.selectionStart),5);
 await phone.fill('');await phone.blur();assert.equal(await page.locator('#field-error-phone').innerText(),locale==='es'?'Introduce tu número de teléfono.':'Enter your phone number.');
 await phone.fill('7221234567');
 await page.locator('.commercial-submit').click();assert.equal(await page.locator('#commercial-country').getAttribute('aria-invalid'),'true');
 await page.locator('#commercial-country').fill('  México  ');assert.equal(await page.locator('#commercial-country').evaluate(el=>el.tagName),'INPUT');
 if(mode==='management'||mode==='maintenance'){assert.equal(await page.locator('#commercial-service').getAttribute('aria-invalid'),'true');await page.locator('#commercial-service').fill('  Inspección especializada y coordinación  ');assert.equal(await page.locator('#commercial-service').evaluate(el=>el.tagName),'INPUT');}
 await page.locator('#commercial-aircraftType').selectOption('Jet privado');if(mode==='sell'){await page.locator('#commercial-manufacturer').fill('Cessna');await page.locator('#commercial-model').fill('Citation');}
 await page.locator('#commercial-name').fill('Prueba Nacional');await page.locator('#commercial-email').fill('test@example.com');await page.locator('#commercial-privacy').check();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(mode==='management'){await page.screenshot({path:'artifacts/field-corrections/'+locale+'-'+width+'.png',fullPage:true});}
 await page.locator('.commercial-submit').click();await page.locator('.confirmation').waitFor();assert.equal(payload.phone,'7221234567');assert.equal(payload.country,'México');assert.equal(payload.operation,{buy:'buy',sell:'sell',management:'aircraft_management',maintenance:'technical_service'}[mode]);if(payload.service)assert.equal(payload.service,'Inspección especializada y coordinación');
 results.push({width,locale,mode,phoneTyping:true,paste:true,cursor:true,freeText:true,payload:true});await context.close();
}
assert.deepEqual(errors,[]);await writeFile('artifacts/field-corrections/results.json',JSON.stringify({results,errors,serverResponses:'simulated; no hosting requests'},null,2));console.log('PASS 16 desktop/mobile ES/EN form cases including typing, paste, cursor, touched errors and payloads');
}finally{await browser.close();}
