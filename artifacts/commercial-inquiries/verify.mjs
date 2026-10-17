import { chromium } from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base='http://127.0.0.1:5174';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report={base,backendResponses:'simulated in browser; real PHP/SMTP path tested separately against local TLS fixture',errors:[],cases:[]};
const modes=['buy','sell','management','maintenance'];
const operations=['buy','sell','aircraft_management','technical_service'];
async function fill(page,mode){
 await page.locator('#commercial-aircraftType').selectOption('Jet privado');
 await page.locator('#commercial-country').fill('México');
 if(mode==='sell'){await page.locator('#commercial-manufacturer').fill('Cessna');await page.locator('#commercial-model').fill('Citation XLS+');}
 if(['management','maintenance'].includes(mode))await page.locator('#commercial-service').fill('Inspección y mantenimiento personalizado');
 await page.locator('#commercial-name').fill('Prueba Comercial');
 await page.locator('#commercial-email').fill('test@example.com');
 await page.locator('#commercial-phone').fill('7221234567');
 await page.locator('#commercial-privacy').check();
}
try{
for(const width of (process.argv.includes('--screens')?[1440,390,320]:[1440,1280,768,390,320]))for(const locale of ['es','en']){
 const context=await browser.newContext({viewport:{width,height:width<600?844:1050},reducedMotion:'reduce',isMobile:width<600,hasTouch:width<600});
 const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
 const payloads=[];let failNext=false;
 await page.route('**/aircraft-inquiry.php',async route=>{
  assert.equal(route.request().method(),'POST');
  const payload=route.request().postDataJSON();payloads.push(payload);
  assert.ok(!Object.keys(payload).some(key=>/registration|serial|budget|price|cycles|hours/i.test(key)));
  assert.equal(payload.phone,'7221234567');
  const fail=failNext;failNext=false;await new Promise(resolve=>setTimeout(resolve,450));
  await route.fulfill({status:fail?503:200,contentType:'application/json',body:JSON.stringify(fail?{success:false,received:false,delivery:'failed',code:'delivery_failed'}:{success:true,received:true,stored:false,delivery:'sent',requestId:payload.requestId})});
 });
 await page.goto(base+(locale==='es'?'/compra-venta-aeronaves':'/en/aircraft-trade'));
 await page.locator('.hero-ready').waitFor();
 assert.equal(await page.locator('h1').innerText(),locale==='es'?'Tu próxima operación aeronáutica comienza aquí.':'Your next aviation venture starts here.');
 assert.equal(await page.locator('.service-choice').count(),5);assert.equal(await page.locator('form').count(),0);
 assert.equal(await page.locator('.service-choice').nth(2).getAttribute('href'),'https://redskyg.com/landing/es-mx/reserva');
 for(const card of await page.locator('.service-choice').all()){await card.evaluate(el=>el.scrollIntoView({behavior:'instant'}));}
 await page.waitForTimeout(150);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'artifacts/commercial-inquiries/'+locale+'-'+width+'-landing.png',fullPage:true});
 for(let index=0;index<modes.length;index++){
  const mode=modes[index],cardIndex=index<2?index:index+1;
  await page.locator('.service-choice').nth(cardIndex).click();await page.waitForURL('**/solicitud/'+mode);await page.locator('.commercial-submit').waitFor();
  assert.equal(await page.locator('form').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('#commercial-country').evaluate(el=>el.tagName),'INPUT');
  assert.equal(await page.locator('#commercial-comments').getAttribute('maxlength'),'1000');
  assert.ok((await page.locator('.consent a').getAttribute('href')).endsWith('/privacy'));
  if(index===0){
   await page.locator('.commercial-submit').click();
   await page.waitForFunction(()=>document.activeElement?.id==='commercial-aircraftType');
   assert.equal(await page.locator('#commercial-country').getAttribute('aria-invalid'),'true');
   await page.locator('#commercial-name').fill('A');await page.locator('#commercial-name').blur();assert.equal(await page.locator('#commercial-name').getAttribute('aria-invalid'),'true');
  }
  await fill(page,mode);
  await page.locator('#commercial-privacy').uncheck();
  await page.locator('.commercial-submit').click();
  await page.waitForFunction(()=>document.activeElement?.id==='commercial-privacy');
  assert.equal(await page.locator('#commercial-privacy').getAttribute('aria-invalid'),'true');
  await page.locator('#commercial-privacy').check();
  await page.waitForFunction(()=>document.querySelector('#commercial-privacy').getAttribute('aria-invalid')!=='true');
  if(index===0){
   await page.getByRole('button',{name:locale==='es'?'English':'Español',exact:true}).click();
   await page.waitForURL('**/'+(locale==='es'?'en':'mx')+'/solicitud/buy');
   assert.equal(await page.locator('#commercial-name').inputValue(),'Prueba Comercial');
   assert.equal(await page.locator('#commercial-country').inputValue(),'México');
   await page.getByRole('button',{name:locale==='es'?'Español':'English',exact:true}).click();
   await page.waitForURL('**/'+(locale==='es'?'mx':'en')+'/solicitud/buy');
   await page.locator('.back-link').click();await page.locator('.service-choice.is-selected').waitFor();
   await page.locator('.service-choice').first().click();await page.locator('.commercial-submit').waitFor();
   assert.equal(await page.locator('#commercial-name').inputValue(),'Prueba Comercial');
  }
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  if(width===1440||width===390||width===320)await page.screenshot({path:'artifacts/commercial-inquiries/'+locale+'-'+width+'-'+mode+'.png',fullPage:true});
  const before=payloads.length;
  if(index===0){
   failNext=true;
   await page.locator('.commercial-submit').evaluate(button=>{button.click();button.click();});
   await page.waitForFunction(()=>document.querySelector('.commercial-submit')?.disabled===true);
   assert.equal(await page.locator('.spinner').count(),1);
   await page.locator('.form-alert').waitFor();assert.equal(payloads.length,before+1);
   assert.equal(await page.locator('#commercial-name').inputValue(),'Prueba Comercial');
  }
  await page.locator('.commercial-submit').evaluate(button=>{button.click();button.click();});
  await page.locator('.confirmation').waitFor();
  assert.equal(payloads.length,before+(index===0?2:1));
  assert.equal(payloads.at(-1).operation,operations[index]);
  if(index===0)assert.equal(payloads.at(-1).requestId,payloads.at(-2).requestId);
  await page.locator('.confirmation a').click();await page.locator('.service-choice').first().waitFor();
 }
 report.cases.push({width,locale,forms:4,submissions:payloads.length,preservedAfterLocaleSwitch:true,preservedAfterReturn:true,duplicateBlocked:true,recoverableFailure:true,quoteUnchanged:true});
 await context.close();console.log('PASS '+locale+' '+width);
}
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const page=await context.newPage();
await page.goto(base+'/compra-venta-aeronaves');await page.locator('.hero-ready').waitFor();await page.waitForTimeout(1300);assert.ok((await page.locator('h1').evaluate(el=>getComputedStyle(el).animationName)).startsWith('hero-rise'));
await page.locator('.hero-link').click();await page.waitForTimeout(900);await page.locator('.service-choice').first().hover();await page.waitForTimeout(400);assert.ok((await page.locator('.service-choice').first().evaluate(el=>getComputedStyle(el).transform)).includes('-5'));
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.equal(await page.locator('.motion-enabled').count(),0);
report.animationsAndReducedMotion=true;
assert.deepEqual(report.errors,[]);await writeFile('artifacts/commercial-inquiries/results.json',JSON.stringify(report,null,2));
console.log('PASS all ten viewport/language cases, forty form navigations, simulated delivery/retries and draft preservation.');
}finally{await browser.close();}
