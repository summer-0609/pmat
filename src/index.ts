import Cli from './cli';
import Performance from './performance';

class Zelda {
  public cli: Cli;
  public performance: Performance;

  constructor() {
    this.cli = new Cli();
    this.performance = new Performance();
  }

  async run() {
    const options = await this.cli.monitor();
    const puppeteerOutput = await this.performance.run(options);


  }
}

new Zelda().run();
