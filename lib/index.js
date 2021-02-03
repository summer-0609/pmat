"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = __importDefault(require("./cli"));
const puppeteer_1 = __importDefault(require("./puppeteer"));
const observers_1 = __importDefault(require("./observers"));
class Zelda {
    constructor() {
        this.cli = new cli_1.default();
        this.puppeteer = new puppeteer_1.default();
        this.observer = new observers_1.default();
    }
    async run() {
        const options = await this.cli.monitor();
        const puppeteer = await this.puppeteer.init();
        this.observer.init(options, puppeteer);
        const { count, url } = options;
        for (let i = 0; i < count; i += 1) {
            await this.observer.beforeStart();
            await this.observer.puppeteer.page.goto(url, { waitUntil: 'load' });
            await this.observer.start();
        }
        // await this.observer.calculate();
        // await this.observer.output();
    }
}
new Zelda().run();
