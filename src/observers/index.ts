import { IPerformanceOutput } from '../performance/interface';

import navigation from './navigation';

class Observer {
  private options: IPerformanceOutput;
  private observers: any;
  private results: {};

  init(options?: IPerformanceOutput): this {
    this.options = options;
    this.observers = [navigation];

    return this;
  }

  async start(): Promise<void> {
    for (const observer of this.observers) {
      await observer.start(this.options);
    }
  }

  calculate(): void {
    const results = [];
    for (const observer of this.observers) {
      results[observer.name] = observer.calculate();
    }
  }
}

export default Observer;
