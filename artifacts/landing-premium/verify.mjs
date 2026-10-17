import { chromium } from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = 'http://127.0.0.1:5174';
const browser = await chromium.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true });
const report = { base, errors:[], cases:[] };
try {
for (const viewport of [{width:1440,height:1000},{width:768,height:1024},{width:390,height:844},{width:360,height:800}]) {
 for (const locale of ['es','en']) {
  const context = await browser.newContext({viewport,reducedMotion:'no-preference',isMobile:viewport.width<600,hasTouch:viewport.width<600});
  await context.addInitScript(() => { window.motionEvents=[]; document.addEventListener('animationstart',event=>window.motionEvents.push(event.animationName)); });
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  const path=locale==='es'?'/compra-venta-aeronaves':'/en/aircraft-trade';
  await page.goto(base+path);
  await page.locator('.hero-ready').waitFor();
  await page.waitForTimeout(1250);
  assert.equal(await page.locator('h1').innerText(),locale==='es'?'Tu próxima operación aeronáutica comienza aquí.':'Your next aviation venture starts here.');
  assert.equal(await page.locator('section').count(),2);
  assert.equal(await page.locator('.service-choice').count(),5);
  assert.equal(await page.locator('form').count(),0);
  const events=await page.evaluate(()=>window.motionEvents);
  assert.ok(events.some(name=>name.startsWith('hero-image')) && events.some(name=>name.startsWith('hero-rise')));
  const top=await page.evaluate(()=>scrollY);
  await page.locator('.hero-link').click();
  await page.waitForTimeout(100);
  const mid=await page.evaluate(()=>scrollY);
  await page.waitForTimeout(1100);
  const end=await page.evaluate(()=>scrollY);
  assert.ok(end>top);
  const parallax=await page.locator('.aviation-home').evaluate(el=>el.style.getPropertyValue('--hero-shift'));
  assert.ok(parseFloat(parallax)>0, JSON.stringify({locale,viewport,top,mid,end,parallax}));
  for (const card of await page.locator('.service-reveal').all()) { await card.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'})); await page.waitForTimeout(100); }
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.service-reveal.is-visible').count(),5);
  assert.ok((await page.evaluate(()=>window.motionEvents)).some(name=>name.startsWith('card-reveal')));
  assert.ok(await page.locator('.service-photo').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const columns=await page.locator('.services-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
  assert.equal(columns,viewport.width>1024?6:viewport.width>600?2:1);
  let hover=null;
  if(viewport.width===1440) {
   const card=page.locator('.service-choice').first();
   await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
   await card.hover({position:{x:70,y:70}}); await page.waitForTimeout(400);
   hover=await card.evaluate(el=>({transform:getComputedStyle(el).transform,light:getComputedStyle(el.querySelector('.service-light')).opacity,lightX:el.style.getPropertyValue('--light-x'),imageTransform:getComputedStyle(el.querySelector('img')).transform}));
   assert.ok(hover.transform.includes('-5')); assert.equal(hover.light,'1'); assert.ok(hover.lightX); assert.ok(hover.imageTransform.includes('1.04'));
   await page.screenshot({path:`artifacts/landing-premium/${locale}-hover.png`,fullPage:true});
  }
  await page.mouse.move(0,0);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(450);
  await page.screenshot({path:`artifacts/landing-premium/${locale}-${viewport.width}.png`,fullPage:true});
  const links=await page.locator('.service-choice').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  assert.equal(links[2],'https://redskyg.com/landing/es-mx/reserva');
  for(const [index,service] of [[0,'buy'],[1,'sell'],[3,'management'],[4,'maintenance']]) {
   await page.locator('.service-choice').nth(index).click();
   await page.waitForURL(`**/solicitud/${service}`); await page.locator('form').waitFor();
   assert.equal(await page.locator('form').count(),1);
   await page.locator('.back-link').click(); await page.locator('.service-choice').first().waitFor();
  }
  await page.goto(base+path); await page.locator('.hero-ready').waitFor(); await page.waitForTimeout(1250);
  await page.evaluate(()=>{window.originalHero=document.querySelector('.aviation-home')});
  await page.getByRole('button',{name:locale==='es'?'English':'Español',exact:true}).click();
  await page.waitForURL(`**${locale==='es'?'/en/aircraft-trade':'/compra-venta-aeronaves'}`);
  assert.ok(await page.evaluate(()=>window.originalHero===document.querySelector('.aviation-home')),'Locale switch must preserve the hero');
  report.cases.push({viewport,locale,entryAnimations:events,smoothScroll:{top,mid,end},parallax,columns,hover,links,formNavigations:4,languageSwitchPreservesHero:true});
  await context.close();
 }
}
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
await page.goto(base+'/compra-venta-aeronaves'); await page.locator('.hero-ready').waitFor();
assert.equal(await page.locator('.motion-enabled').count(),0);
assert.equal(await page.locator('.service-reveal.is-visible').count(),5);
assert.equal(await page.locator('h1').evaluate(el=>getComputedStyle(el).animationName),'none');
await page.locator('.hero-link').click();
assert.equal(await page.locator('.hero-image-layer').evaluate(el=>getComputedStyle(el).transform),'none');
await page.locator('.service-choice').first().hover();await page.waitForTimeout(100);
assert.equal(await page.locator('.service-choice').first().evaluate(el=>getComputedStyle(el).transform),'none');
report.reducedMotion=true;
await page.screenshot({path:'artifacts/landing-premium/reduced-motion.png',fullPage:true});
for(const path of ['/mx','/en']) { await page.goto(base+path); await page.locator('.hero-ready').waitFor();assert.equal(await page.locator('.service-choice').count(),5); }
// Keyboard navigation remains available without nested interactive elements.
await page.goto(base+'/compra-venta-aeronaves');await page.locator('.hero-ready').waitFor();
assert.equal(await page.locator('.service-choice button,.service-choice a').count(),0);
await page.locator('.service-choice').first().focus(); await page.keyboard.press('Enter');await page.waitForURL('**/solicitud/buy');
report.keyboardActivation=true;
assert.deepEqual(report.errors,[]);
await writeFile('artifacts/landing-premium/results.json',JSON.stringify(report,null,2));
console.log('PASS: eight ES/EN desktop/tablet/mobile cases; 32 form navigations; entry, hover, light tracking, parallax, smooth scroll, keyboard and reduced motion.');
} finally { await browser.close(); }
