"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class Performance {
    async init(options) {
        const browser = await puppeteer_1.default.launch({
            product: 'chrome',
        });
        const page = await browser.newPage();
        await page.goto(options.url, { waitUntil: 'load' });
        return { page, browser };
    }
}
exports.default = Performance;
