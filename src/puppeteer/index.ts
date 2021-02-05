import puppeteer from 'puppeteer';

import type { IPuppeteerOutput } from './interface';
import type { ICliOptions } from '../cli/interface';

class Puppeteer {
  async init(options?: ICliOptions): Promise<IPuppeteerOutput> {
    const browser = await puppeteer.launch({
      product: 'chrome',
    });
    const page = await browser.newPage();

    const { cache, javascript, online, useragent } = options;

    await page.setCacheEnabled(cache);
    await page.setJavaScriptEnabled(javascript);
    await page.setOfflineMode(!online);

    if (useragent) {
      await page.setUserAgent(useragent);
    }

    return { page, browser };
  }
}

export default Puppeteer;
