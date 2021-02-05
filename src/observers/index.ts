import type { IPuppeteerOutput } from '../puppeteer/interface';
import type { ICliOptions } from '../cli/interface';

import navigation from './navigation';
import metric from './metric';
import output from '../output';

class Observer {
  public puppeteer: IPuppeteerOutput;
  public options: ICliOptions;

  private observers: Array<Partial<typeof navigation | typeof metric>>;
  private results: {};

  init(options: ICliOptions, puppeteer: IPuppeteerOutput): this {
    this.puppeteer = puppeteer;
    this.options = options;
    this.observers = [navigation, metric];

    return this;
  }

  async beforeStart(): Promise<void> {
    for (const observer of this.observers) {
      await observer.beforeStart?.(this.puppeteer);
    }
  }

  async start(): Promise<void> {
    for (const observer of this.observers) {
      await observer.start(this.puppeteer);
    }
  }

  calculate(): void {
    const results = [];
    for (const observer of this.observers) {
      results[observer.name] = observer.calculate();
    }
    this.results = results;
  }

  output(): void {
    output.writeASCII();
    output.writeIntro(this.options);
    for (const observer of this.observers) {
      output.writeInfo(observer.name, this.results[observer.name]);
    }
    output.writeLog();
  }
}

export default Observer;
