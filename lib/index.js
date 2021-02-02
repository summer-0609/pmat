"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = __importDefault(require("./cli"));
const performance_1 = __importDefault(require("./performance"));
const observers_1 = __importDefault(require("./observers"));
class Zelda {
    constructor() {
        this.cli = new cli_1.default();
        this.performance = new performance_1.default();
        this.observer = new observers_1.default();
    }
    async run() {
        const options = await this.cli.monitor();
        const puppeteerOutput = await this.performance.init(options);
        await this.observer.init(puppeteerOutput).start();
        await this.observer.calculate();
        await this.observer.output(options);
    }
}
new Zelda().run();
