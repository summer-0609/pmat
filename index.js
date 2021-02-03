const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');

const Good3G = {
  offline: false,
  downloadThroughput: (1.5 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  latency: 40,
};

// const phone = devices['Nexus 5X'];

class Gud {
  async getLCP(url) {
    const browser = await puppeteer.launch({
      // args: ['--no-sandbox'],
      // timeout: 10000
      product: 'chrome',
    });

    try {
      const page = await browser.newPage();
      // const client = await page.target().createCDPSession();

      // await client.send('Network.enable');
      // await client.send('ServiceWorker.enable');
      // await client.send('Network.emulateNetworkConditions', Good3G);
      // await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      // await page.emulate(phone);

      await page.evaluate(this.calcLCP);
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });

      let lcp = await page.evaluate(() => {
        return window.largestContentfulPaint;
      });
      return lcp;
    } catch (error) {
      console.log(error);
      browser.close();
    }
  }

  calcLCP() {
    window.largestContentfulPaint = 0;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        observer.takeRecords();
        observer.disconnect();
        console.log('LCP:', window.largestContentfulPaint);
      }
    });
  }
}

new Gud().getLCP('https://www.baidu.com').then((lcp) => console.log('LCP is: ' + lcp));
