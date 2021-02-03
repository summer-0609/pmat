"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = __importDefault(require("./navigation"));
const performance_1 = __importDefault(require("./performance"));
const output_1 = __importDefault(require("../output"));
class Observer {
    init(options, puppeteer) {
        this.puppeteer = puppeteer;
        this.options = options;
        this.observers = [navigation_1.default, performance_1.default];
        return this;
    }
    async beforeStart() {
        var _a;
        for (const observer of this.observers) {
            await ((_a = observer.beforeStart) === null || _a === void 0 ? void 0 : _a.call(observer, this.puppeteer));
        }
    }
    async start() {
        for (const observer of this.observers) {
            await observer.start(this.puppeteer);
        }
    }
    calculate() {
        var _a;
        const results = [];
        for (const observer of this.observers) {
            results[observer.name] = (_a = observer.calculate) === null || _a === void 0 ? void 0 : _a.call(observer);
        }
        this.results = results;
    }
    output() {
        output_1.default.writeASCII();
        output_1.default.writeIntro(this.options);
        for (const observer of this.observers) {
            output_1.default.writeInfo(observer.name, this.results[observer.name]);
        }
    }
}
exports.default = Observer;
