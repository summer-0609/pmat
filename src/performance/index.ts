import puppeteer from 'puppeteer';

import type { ICliOptions } from '../cli/interface';
import type { IPerformanceOutput } from './interface';

class Performance {
  async init(options?: ICliOptions): Promise<IPerformanceOutput> {
    const browser = await puppeteer.launch({
      product: 'chrome',
    });
    const page = await browser.newPage();
    await page.goto(options.url, { waitUntil: 'load' });

    return { page, browser };
  }
}

export default Performance;
