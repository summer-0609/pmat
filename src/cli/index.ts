import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

import type { ICliOptions } from './interface';

const packageJson = require('../../package.json');

class Cli {
  async monitor(): Promise<ICliOptions> {
    let url = null;
    program
      .version(packageJson.version)
      .arguments('<url>')
      .usage(`[options] ${chalk.green('[url]')}`)
      .action((u) => {
        url = u;
      })
      .option('-n, --count <n>', 'specified loading times (default: 10)', parseInt)
      .option('-u, --useragent <ua>', 'to set the useragent')
      .option('-e, --executablePath <path>', 'use the specified chrome browser')
      .option('--no-banner', 'disable banner (default: false)')
      .option('--no-cache', 'disable cache (default: false)')
      .option('--no-javascript', 'disable javascript (default: false)')
      .option('--no-online', 'disable network (defalut: false)')
      .parse(process.argv);

    const { count = 10 } = program as ICliOptions;
    return {
      count,
      url,
    };
  }

  prompt(): Promise<object> {
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
      inquirer.prompt(promptList).then((answer) => {
        resolve(answer);
      });
    });
  }
}

export default Cli;
