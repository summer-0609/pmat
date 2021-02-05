import Cli from './cli';
import Puppeteer from './puppeteer';
import Observer from './observers';

class Zelda {
  public cli: Cli;
  public puppeteer: Puppeteer;
  public observer: Observer;

  constructor() {
    this.cli = new Cli();
    this.puppeteer = new Puppeteer();
    this.observer = new Observer();
  }

  async run() {
    const options = await this.cli.monitor();
    const puppeteer = await this.puppeteer.init(options);

    this.observer.init(options, puppeteer);

    const { count, url } = options;
    const { page, browser } = puppeteer;

    for (let i = 0; i < count; i += 1) {
      await this.observer.beforeStart();
      await page.goto(url, { waitUntil: 'load' });
      await this.observer.start();
    }

    await this.observer.calculate();
    await this.observer.output();

    await browser.close();
  }
}

new Zelda().run();
