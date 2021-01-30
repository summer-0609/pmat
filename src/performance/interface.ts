import type { Page, Browser } from 'puppeteer';

export interface IPerformanceOutput {
  page: Page;
  browser: Browser;
}
