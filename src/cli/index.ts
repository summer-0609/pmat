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
      .option('-n, --count <n>', 'specified loading times (default: 3)', parseInt)
      .option('-u, --useragent <ua>', 'to set the useragent')
      .option('--no-cache', 'disable cache (default: false)')
      .option('--no-javascript', 'disable javascript (default: false)')
      .option('--no-online', 'disable network (defalut: false)')
      .parse(process.argv);

    const { count = 3, cache, javascript, useragent, online } = program.opts() as ICliOptions;

    const { tti } = await this.prompt();

    return {
      cache,
      count,
      url,
      javascript,
      useragent,
      online,
      tti,
    };
  }

  prompt(): Promise<Pick<ICliOptions, 'tti'>> {
    const promptList = [
      {
        type: 'confirm',
        name: 'tti',
        message: 'Whether to measure TTI (the speed is very slow after opening)',
        default: false,
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
