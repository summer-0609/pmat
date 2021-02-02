import type { IPerformanceOutput } from '../performance/interface';
import type { ICliOptions } from '../cli/interface';

import navigation from './navigation';
import output from '../output';

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
    this.results = results;
  }

  output(options?: ICliOptions): void {
    output.writeASCII();
    output.writeIntro(options.url);
    for (const observer of this.observers) {
      output.writeInfo(this.results[observer.name])
    }
  }
}

export default Observer;
