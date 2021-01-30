import puppeteer from 'puppeteer';

import type { ICliOptions } from '../cli/interface';
import type { IPerformanceOutput } from './interface';

class Performance {
  async run(options?: ICliOptions): Promise<IPerformanceOutput> {
    const { url, indicators } = options;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });

    return { page, browser };
  }
}

export default Performance;
