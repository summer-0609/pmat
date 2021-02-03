import { initObserver, getScore } from '../utils';
import type { IPuppeteerOutput } from '../puppeteer/interface';

class Performance {
  public performanceList: object[] = [];

  async beforeStart(options?: IPuppeteerOutput): Promise<void> {
    const { page } = options;
    await page.evaluateOnNewDocument(getLCP);
    await page.evaluateOnNewDocument(getCLS);
    await page.evaluateOnNewDocument(getFID);
  }

  async start(options?: IPuppeteerOutput) {
    const { page } = options;
    const result = await page.evaluate(() => {
      const { LCP, CLS, FID } = window;
      return { LCP, CLS, FID };
    });

    // await page.waitForNavigation();

    const FP = await page.evaluate(() => performance.getEntriesByName('first-paint')[0].startTime);
    const FCP = await page.evaluate(
      () => performance.getEntriesByName('first-contentful-paint')[0].startTime,
    );

    this.performanceList.push({ ...result, FP, FCP });
    console.log(4, this.performanceList);
  }
}

function getLCP() {
  window.LCP = 0;

  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1] as { renderTime?: number; loadTime?: number };
    window.LCP = lastEntry.renderTime || lastEntry.loadTime;
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'], buffered: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      observer.takeRecords();
      observer.disconnect();
    }
  });
}

function getCLS() {
  window.CLS = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as any) {
      if (!entry.hadRecentInput) {
        window.CLS += entry.value;
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      observer.takeRecords();
      observer.disconnect();
    }
  });
}

function getFID() {
  window.FID = '';
  const observer = new PerformanceObserver((list) => {
    window.FID = JSON.stringify(list.getEntries());
    // for (const entry of list.getEntries() as any) {
    //   window.FID = JSON.stringify(entry);
    // }
  });

  observer.observe({ type: 'first-input', buffered: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      observer.takeRecords();
      observer.disconnect();
    }
  });
}

export default new Performance();
