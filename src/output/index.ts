import figlet from 'figlet';
import chalk from 'chalk';

import { ICliOptions } from '../cli/interface';

const { log } = console;

const ui = require('cliui')();

const level = {
  fast: chalk.greenBright,
  moderate: chalk.yellowBright,
  slow: chalk.redBright,
};

class Output {
  writeASCII() {
    log('\n');
    log(chalk.cyanBright(figlet.textSync('Zelda')));
    log('\n');
  }

  writeIntro(options?: ICliOptions) {
    log(
      `🚀 It loaded ${chalk.magentaBright(options.url)} ${chalk.bold.blueBright(
        options.count,
      )} times`,
    );
  }

  writeInfo(title: string, data) {
    ui.div({
      text: chalk.magentaBright(`${title}:`),
      padding: [2, 0, 1, 0],
    });

    Array.prototype.map.call(data, (item) => {
      return ui.div(
        {
          text: `${chalk.cyanBright(item.name)}`,
          width: 40,
          padding: [0, 4, 0, 4],
        },
        {
          text: `${chalk.greenBright(item.measure)}`,
          width: 20,
        },
        item.score
          ? {
              text: `${level[item.score](item.score)}`,
              width: 20,
            }
          : {
              text: '',
            },
      );
    });

    ui.div({ text: '' });
  }

  writeScore() {}

  writeLog() {
    log(ui.toString());
  }
}

export default new Output();
