"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = __importDefault(require("./navigation"));
const output_1 = __importDefault(require("../output"));
class Observer {
    init(options) {
        this.options = options;
        this.observers = [navigation_1.default];
        return this;
    }
    async start() {
        for (const observer of this.observers) {
            await observer.start(this.options);
        }
    }
    calculate() {
        const results = [];
        for (const observer of this.observers) {
            results[observer.name] = observer.calculate();
        }
        this.results = results;
    }
    output(options) {
        output_1.default.writeASCII();
        output_1.default.writeIntro(options.url);
        for (const observer of this.observers) {
            output_1.default.writeInfo(this.results[observer.name]);
        }
    }
}
exports.default = Observer;
