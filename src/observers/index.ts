import { IPerformanceOutput } from '../performance/interface';

import Navigation from './navigation';

class Observer {
  private options: IPerformanceOutput;
  private observers: Array<Observer>;

  constructor(options?: IPerformanceOutput) {
    this.options = options;
    this.observers = [];
  }

  addObserver<T extends Observer>(observer?: T): void {
    this.observers.push(observer);
  }

  run() {
    const { browser } = this.options;

    browser.on('targetchanged', async (target) => {
      const page = await target.page();
      // 等待 dom 文档加载完成的时候
      page.on('domcontentloaded', async () => {
        // 通过 evaluate 方法可以获取到页面上的元素和方法
        await page.evaluate(() => {
          // return document.body.scrollWidth > document.body.clientWidth;
        });
      });
    });
  }
}

export default Observer;
