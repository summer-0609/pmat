import figlet from 'figlet';
import chalk from 'chalk';

import { ICliOptions } from '../cli/interface';

const { log } = console;

const ui = require('cliui')();

class Output {
  writeASCII() {
    log('\n');
    log(chalk.cyan(figlet.textSync('Zelda')));
    log('\n');
  }

  writeIntro(options?: ICliOptions) {
    log(`🚀 It loaded ${chalk.yellow(options.url)} ${chalk.bold.green(options.count)} times`);
  }

  writeInfo(title, data) {
    ui.div({
      text: chalk.yellow(`${title}:`),
      padding: [2, 0, 1, 0],
    });

    Object.keys(data).map((key) =>
      ui.div(
        {
          text: key,
          width: 40,
          padding: [0, 4, 0, 4],
        },
        {
          text: `${chalk.green(data[key])}`,
          width: 20,
        },
      ),
    );

    log(ui.toString());
  }
}

export default new Output();
