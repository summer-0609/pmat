"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const { log } = console;
const ui = require('cliui')();
class Output {
    writeASCII() {
        log('\n');
        log(chalk_1.default.cyan(figlet_1.default.textSync('Zelda')));
        log('\n');
    }
    writeIntro(options) {
        log(`🚀 It loaded ${chalk_1.default.yellow(options.url)} ${chalk_1.default.bold.green(options.count)} times`);
    }
    writeInfo(title, data) {
        ui.div({
            text: chalk_1.default.yellow(`${title}:`),
            padding: [2, 0, 1, 0],
        });
        Object.keys(data).map((key) => ui.div({
            text: key,
            width: 40,
            padding: [0, 4, 0, 4],
        }, {
            text: `${chalk_1.default.green(data[key])}`,
            width: 20,
        }));
        log(ui.toString());
    }
}
exports.default = new Output();
