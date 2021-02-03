import puppeteer from 'puppeteer';

import type { IPuppeteerOutput } from './interface';

class Puppeteer {
  async init(): Promise<IPuppeteerOutput> {
    const browser = await puppeteer.launch({
      product: 'chrome',
    });
    const page = await browser.newPage();
    return { page, browser };
  }
}

export default Puppeteer;
