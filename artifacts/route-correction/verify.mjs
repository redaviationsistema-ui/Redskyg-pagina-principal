import {chromium} from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[],errors=[];
try{
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/mx','/en']){
  await page.goto('http://127.0.0.1:5174'+path);await page.locator('.home-page').waitFor();assert.equal(await page.locator('.aviation-home').count(),0);assert.equal(await page.locator('.trade-header').count(),0);assert.ok(await page.locator('.home-page section').count()>2);
  await page.screenshot({path:'artifacts/route-correction/home-'+path.slice(1)+'-'+width+'.png',fullPage:true});results.push({path,width,title:await page.locator('h1').first().innerText(),originalHome:true});
 }
 for(const path of ['/vender-aeronave','/en/sell-aircraft']){
  await page.goto('http://127.0.0.1:5174'+path);await page.locator('.service-choice').last().waitFor();assert.equal(await page.locator('.service-choice').count(),5);assert.equal(await page.locator('form').count(),0);assert.equal(await page.locator('.trade-header').count(),1);
  const en=path.startsWith('/en');
  await page.screenshot({path:'artifacts/route-correction/premium-'+(en?'en':'es')+'-'+width+'.png',fullPage:true});
  for(const [index,mode] of [[0,'buy'],[1,'sell'],[3,'management'],[4,'maintenance']]){
   await page.locator('.service-choice').nth(index).click();await page.waitForURL('**/solicitud/'+mode);await page.locator('.commercial-submit').waitFor();assert.equal(await page.locator('form').count(),1);
   await page.locator('#commercial-name').fill('Prueba Rutas');await page.locator('.back-link').click();await page.waitForURL('**'+path+'#servicios');await page.locator('.service-choice').last().waitFor();
   await page.locator('.service-choice').nth(index).click();await page.locator('.commercial-submit').waitFor();assert.equal(await page.locator('#commercial-name').inputValue(),'Prueba Rutas');await page.locator('.back-link').click();await page.locator('.service-choice').last().waitFor();
  }
  assert.equal(await page.locator('.service-choice').nth(2).getAttribute('href'),'https://redskyg.com/landing/es-mx/reserva');
  await page.getByRole('button',{name:en?'Español':'English',exact:true}).click();await page.waitForURL('**'+(en?'/vender-aeronave':'/en/sell-aircraft')+'#servicios');assert.equal(await page.locator('.service-choice').count(),5);results.push({path,width,premium:true,forms:4,drafts:true,localeSwitch:true});
 }
 for(const [legacy,target] of [['/compra-venta-aeronaves','/vender-aeronave'],['/en/aircraft-trade','/en/sell-aircraft']]){await page.goto('http://127.0.0.1:5174'+legacy);await page.waitForURL('**'+target);await page.locator('.service-choice').last().waitFor();results.push({legacy,target,width});}
 await context.close();
}
const page=await browser.newPage();await page.goto('http://127.0.0.1:5174/vender-aeronave');await page.locator('.service-choice').nth(2).click();await page.waitForURL('https://redskyg.com/landing/es-mx/reserva',{waitUntil:'domcontentloaded'});results.push({quote:page.url(),title:await page.title(),submitted:false});
assert.deepEqual(errors,[]);await writeFile('artifacts/route-correction/results.json',JSON.stringify({results,errors},null,2));console.log('PASS original homes, premium ES/EN, legacy redirects, 16 form routes and retained drafts, desktop/mobile and live quote navigation');
}finally{await browser.close();}
