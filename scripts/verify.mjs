import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width:1440,height:1000 } });
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await page.goto('http://127.0.0.1:4321');await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'artifacts/home-desktop.png',fullPage:true});
await page.getByRole('button',{name:'Close to home',exact:true}).click();assert.equal(await page.locator('.event:visible').count(),2);
await page.getByRole('button',{name:'Qualifiers',exact:true}).click();assert.equal(await page.locator('.event:visible').count(),3);
await page.getByRole('button',{name:'All events',exact:true}).click();assert.equal(await page.locator('.event:visible').count(),9);
assert.equal(await page.locator('#cost-total').textContent(),'$17,280');
assert.equal(await page.locator('#team-total').textContent(),'$172,800');
assert.equal(await page.locator('#roster').count(),0);
assert.equal(await page.locator('.event .trip-cost').filter({hasText:'$1,500'}).count(),7);
assert.equal(await page.locator('.event .trip-cost').filter({hasText:'excluded from total'}).count(),1);
await page.getByRole('button',{name:'Let’s team up'}).nth(1).click();await page.getByLabel('Your name').fill('Example Sponsor');await page.getByLabel('Business or organization').fill('Example Company');await page.getByLabel('Email',{exact:true}).fill('example@example.com');
const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Download my inquiry'}).click();const download=await downloaded;assert.equal(download.suggestedFilename(),'triangle-13-black-sponsor-inquiry.txt');
await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
const calendar=await (await page.request.get('http://127.0.0.1:4321/season.ics')).text();assert.equal((calendar.match(/BEGIN:VEVENT/g)||[]).length,8);assert(!calendar.includes('Sunshine'));assert(calendar.includes('DTEND;VALUE=DATE:20270119'));
for(const route of ['/','/pitch/gametime']) {
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4321'+route);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('#cost-total').textContent(),'$17,280');
  assert.equal(await page.locator('#team-total').textContent(),'$172,800');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} overflows at ${width}`);
  if(width===390||width===1440)await page.screenshot({path:`artifacts/${route==='/'?'home':'gametime'}-${width}.png`,fullPage:true});
 }
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: both routes at 4 widths, filters, 10-player budget and travel estimates, inquiry download, dialog, 8-event ICS, no runtime errors.');
