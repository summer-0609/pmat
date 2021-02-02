import { IPerformanceOutput } from '../performance/interface';

import Navigation from './navigation';

class Observer {
  private options: IPerformanceOutput;
  private observers: any;
  public results: any;

  init(options?: IPerformanceOutput): this {
    this.options = options;
    this.observers = [new Navigation()];

    return this;
  }

  async run(): Promise<void> {
    for (const observer of this.observers) {
      const result = await observer.start(this.options);
    }
  }

  output() {
    const results = [];
    for (const observer of this.observers) {
      results[observer.name] = observer.calculate();
    }
    console.log(5, results)
  }
}

export default Observer;
