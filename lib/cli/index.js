"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const packageJson = require('../../package.json');
class Cli {
    async monitor() {
        let url = null;
        commander_1.program
            .version(packageJson.version)
            .arguments('<url>')
            .usage(`[options] ${chalk_1.default.green('[url]')}`)
            .action((u) => {
            url = u;
        })
            .option('-n, --count <n>', 'specified loading times (default: 20)', parseInt)
            .option('-u, --useragent <ua>', 'to set the useragent')
            .option('-e, --executablePath <path>', 'use the specified chrome browser')
            .option('--no-banner', 'disable banner (default: false)')
            .option('--no-cache', 'disable cache (default: false)')
            .option('--no-javascript', 'disable javascript (default: false)')
            .option('--no-online', 'disable network (defalut: false)')
            .parse(process.argv);
        // const choices = await this.prompt();
        return {
            // ...choices,
            url,
        };
    }
    prompt() {
        const promptList = [
            {
                type: 'checkbox',
                name: 'indicators',
                message: 'What performance indicators do you wanna see',
                choices: [
                    {
                        name: 'FCP',
                        value: 'fcp',
                        checked: true,
                    },
                    {
                        name: 'TCP',
                        value: 'tcp',
                        checked: true,
                    },
                ],
            },
        ];
        return new Promise((resolve) => {
            inquirer_1.default.prompt(promptList).then((answer) => {
                resolve(answer);
            });
        });
    }
}
exports.default = Cli;
