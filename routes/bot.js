const express = require('express');
const puppeteer = require('puppeteer');
const delay = require('delay');
const bot = express.Router();

bot.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://web.whatsapp.com/');
    await page.setDefaultTimeout(0);
    await page.waitForSelector('[data-testid="search"]').then(() =>
      page.click('[data-testid="search"]', {
        delay: 2000,
      })
    );

    await page.type('._13NKt', 'HaivTech Technical Dept.');
    await page.keyboard.press('Enter');
    await delay(2000);

    let messageAmount = 2;

    for (let i = 0; i < messageAmount; i++) {
      await delay(2000);
      await page.type(
        '.p3_M1',
        'Please Ignore when received! It jsut a testing'
      );
      await delay(2000);
      await page.keyboard.press('Enter');
    }

    res.send('done');
    browser.close();
  } catch (e) {
    console.error('error mine', e);
  }
});

module.exports = bot;
