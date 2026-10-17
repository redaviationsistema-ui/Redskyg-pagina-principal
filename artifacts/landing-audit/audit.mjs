import { chromium } from '/Users/redaviation/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = 'http://127.0.0.1:5174';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
if (process.argv.includes('--flight')) {
  const page = await browser.newPage();
  await page.goto(base + '/compra-venta-aeronaves');
  await page.locator('.service-choice').nth(2).click();
  await page.waitForURL('https://redskyg.com/landing/es-mx/reserva', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.screenshot({ path: 'artifacts/landing-audit/flight-quote.png', fullPage: true });
  const result = { url: page.url(), title: await page.title(), bodyExcerpt: (await page.locator('body').innerText()).slice(0, 500), formCount: await page.locator('form').count(), bookingSubmitted: false };
  await writeFile('artifacts/landing-audit/flight-quote.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
  await browser.close();
  process.exit(0);
}
const results = [];
const errors = [];
for (const viewport of [{width:1440,height:1100},{width:390,height:844},{width:360,height:800}]) {
  for (const [locale,path] of [['es','/compra-venta-aeronaves'],['en','/en/aircraft-trade']]) {
    const context = await browser.newContext({ viewport, reducedMotion:'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push({ path, viewport, error: error.message }));
    await page.goto(base+path);
    await page.locator('.service-choice').last().waitFor();
    const title = locale === 'es' ? 'Tu próxima operación aeronáutica comienza aquí.' : 'Your next aviation venture starts here.';
    assert.equal(await page.locator('h1').innerText(),title);
    assert.equal(await page.locator('.service-choice').count(),5);
    assert.equal(await page.locator('form').count(),0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const links = await page.locator('.service-choice').evaluateAll(items=>items.map(item=>({title:item.querySelector('h3').textContent,href:item.getAttribute('href')})));
    assert.ok(links.every(link=>!!link.href),`All service options must be real links: ${JSON.stringify(links)}`);
    assert.equal(await page.locator('.service-choice h3').first().evaluate(el => getComputedStyle(el).color), 'rgb(7, 27, 48)');
    await page.screenshot({path:`artifacts/landing-audit/${locale}-${viewport.width}.png`,fullPage:true});
    const destinations = [];
    for (const [index,service] of [[0,'buy'],[1,'sell'],[3,'management'],[4,'maintenance']]) {
      await page.locator('.service-choice').nth(index).click();
      await page.waitForURL(`**/solicitud/${service}`);
      await page.locator('form').waitFor();
      assert.equal(await page.locator('form').count(),1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.waitForFunction(() => ['INPUT','SELECT'].includes(document.activeElement?.tagName));
      if (viewport.width === 390 || viewport.width === 1440) await page.screenshot({path:`artifacts/landing-audit/${locale}-${viewport.width}-${service}.png`,fullPage:true});
      destinations.push({service,url:page.url(),fields:await page.locator('form input:not([tabindex="-1"]),form select,form textarea').count(),focused:await page.evaluate(()=>document.activeElement.tagName)});
      await page.locator('.back-link').click();
      await page.locator('.service-choice').last().waitFor();
    }
    assert.equal(await page.locator('.service-choice').nth(2).getAttribute('href'),'https://redskyg.com/landing/es-mx/reserva');
    await page.goto(base+path);
    await page.getByRole('button',{name:locale === 'es' ? 'English' : 'Español',exact:true}).click();
    await page.waitForURL(`**${locale === 'es' ? '/en/aircraft-trade' : '/compra-venta-aeronaves'}`);
    await page.locator('.service-choice').last().waitFor();
    assert.equal(await page.locator('.service-choice').count(),5);
    results.push({locale,path,viewport,title,links,destinations,languageSwitch:true,noHorizontalOverflow:true,noInitialForm:true});
    await context.close();
  }
}
// The primary home routes use the same selector, not an unused view.
const page = await browser.newPage();
for (const path of ['/mx','/en']) {
  await page.goto(base+path);
  await page.locator('.service-choice').last().waitFor();
  assert.equal(await page.locator('.service-choice').count(),5);
}
assert.deepEqual(errors,[]);
await writeFile('artifacts/landing-audit/results.json',JSON.stringify({base,results,errors,homeRoutesVerified:['/mx','/en'],flightQuote:'Existing link verified; quote calculations and booking submission untouched.'},null,2));
await browser.close();
console.log(`PASS: ${results.length} viewport/language combinations, 24 form navigations, language switching, both home routes, no browser exceptions.`);
