"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class Puppeteer {
    async init() {
        const browser = await puppeteer_1.default.launch({
            product: 'chrome',
        });
        const page = await browser.newPage();
        return { page, browser };
    }
}
exports.default = Puppeteer;
