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
await page.getByRole('button',{name:'Let’s team up'}).nth(1).click();
await page.getByRole('button',{name:'Send sponsorship inquiry'}).click();
assert.equal(await page.locator('#inquiry-form').evaluate(form=>form.checkValidity()),false);
await page.getByLabel('Your name').fill('Example Sponsor');await page.getByLabel('Business or organization').fill('Example Company');await page.getByLabel('Email',{exact:true}).fill('invalid-email');
assert.equal(await page.locator('#inquiry-form').evaluate(form=>form.checkValidity()),false);
await page.getByLabel('Email',{exact:true}).fill('example@example.com');await page.getByLabel('What do you have in mind?').fill('Travel support & team meals');
assert.equal(await page.locator('#inquiry-form').getAttribute('data-netlify'),'true');
assert.equal(await page.locator('#inquiry-form').getAttribute('netlify-honeypot'),'bot-field');
let submitted;
await page.route('**/thank-you/',async route=>{if(route.request().method()==='POST'){submitted=new URLSearchParams(route.request().postData());await route.fulfill({status:303,headers:{location:'/thank-you/'}});}else await route.continue();});
await page.getByRole('button',{name:'Send sponsorship inquiry'}).click();await page.waitForURL('**/thank-you/');
assert.equal(submitted.get('form-name'),'sponsorship');assert.equal(submitted.get('sponsorship-level'),'Team partner — $500');assert.equal(submitted.get('name'),'Example Sponsor');assert.equal(submitted.get('email'),'example@example.com');assert.equal(submitted.get('business'),'Example Company');assert.equal(submitted.get('message'),'Travel support & team meals');assert.equal(submitted.get('bot-field'),'');
assert(await page.getByRole('heading',{name:'Thanks for showing up.'}).isVisible());
await page.goto('http://127.0.0.1:4321');await page.getByRole('button',{name:'Explore a team partnership'}).click();assert.equal(await page.locator('#sponsorship-level').inputValue(),'Company partnership — $5,000');await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
const calendar=await (await page.request.get('http://127.0.0.1:4321/season.ics')).text();assert.equal((calendar.match(/BEGIN:VEVENT/g)||[]).length,8);assert(!calendar.includes('Sunshine'));assert(calendar.includes('DTEND;VALUE=DATE:20270119'));
for(const route of ['/','/pitch/gametime']) {
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4321'+route);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('meta[property="og:image"]').count(),1);
  assert((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/social-share.png'));
  assert.equal(await page.locator('#cost-total').textContent(),'$17,280');
  assert.equal(await page.locator('#team-total').textContent(),'$172,800');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} overflows at ${width}`);
  if(width===390||width===1440)await page.screenshot({path:`artifacts/${route==='/'?'home':'gametime'}-${width}.png`,fullPage:true});
 }
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: both routes at 4 widths, filters, 10-player budget and travel estimates, Netlify form validation/payload/confirmation (intercepted POST), social metadata, dialog, 8-event ICS, no runtime errors.');
