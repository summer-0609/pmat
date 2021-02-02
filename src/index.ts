import Cli from './cli';
import Performance from './performance';
import Observer from './observers';

class Zelda {
  public cli: Cli;
  public performance: Performance;
  public observer: Observer;

  constructor() {
    this.cli = new Cli();
    this.performance = new Performance();
    this.observer = new Observer();
  }

  async run() {
    const options = await this.cli.monitor();
    const puppeteerOutput = await this.performance.init(options);

    await this.observer.init(puppeteerOutput).start();
    await this.observer.calculate();
    // await this.observer.output();
  }
}

new Zelda().run();
