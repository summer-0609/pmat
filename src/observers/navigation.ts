import { NavigationTime } from '../types';
import { IPerformanceOutput } from '../performance/interface';

class Navigation {
  start(options?: IPerformanceOutput): void {
    const { browser } = options;


    browser.on('targetchanged', async (target) => {
      const page = await target.page();
      // 等待 dom 文档加载完成的时候
      page.on('domcontentloaded', async () => {
        // 通过 evaluate 方法可以获取到页面上的元素和方法
        await page.evaluate(() => {
          this.monitor();
          // return document.body.scrollWidth > document.body.clientWidth;
        });
      });
    });
  }

  monitor() {
    const navigation = performance.getEntriesByType('navigation');
    const time = navigation[0] as PerformanceNavigationTiming;

    if (time) {
      const {
        domainLookupEnd,
        domainLookupStart,
        connectEnd,
        connectStart,
        workerStart,
        redirectEnd,
        redirectStart,
        redirectCount,
        responseEnd,
        responseStart,
        fetchStart,
        domContentLoadedEventEnd,
        domContentLoadedEventStart,
        requestStart,
      } = time;

      return {
        redirectCount,
        redirectTime: redirectEnd - redirectStart,
        appCache: domainLookupStart - fetchStart,
        // dns lookup time
        DNS: domainLookupEnd - domainLookupStart,
        // handshake end - handshake start time
        TCP: connectEnd - connectStart,
        responseTime: responseEnd - responseStart,
        // Time to First Byte
        TTFB: responseStart - requestStart,
        // fetch resource time
        fetchTime: responseEnd - fetchStart,
        // Service work response time
        workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
        domReady: domContentLoadedEventEnd - fetchStart,
        // DOMContentLoaded time
        DCL: domContentLoadedEventEnd - domContentLoadedEventStart,
      };
    }

    return {};
  }
}

export default Navigation;
