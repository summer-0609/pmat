import type { Page, Browser } from 'puppeteer';

export interface IPuppeteerOutput {
  page: Page;
  browser: Browser;
  tti: boolean;
}
