"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const clui_1 = __importDefault(require("clui"));
const chalk_1 = __importDefault(require("chalk"));
const { log } = console;
const { Line } = clui_1.default;
class Output {
    writeASCII() {
        log('\n');
        log(chalk_1.default.cyan(figlet_1.default.textSync('Zelda')));
        log('\n');
    }
    writeIntro(url) {
        log(`${`🚀 It loaded`} ${chalk_1.default.yellow(`${url}`)}`);
        log('\n');
    }
    writeInfo({ DNS }) {
        new Line()
            .padding(2)
            .column('DNS lookup time', 32)
            .column(DNS, 20, [chalk_1.default.green])
            .fill()
            .output();
    }
}
exports.default = new Output();
