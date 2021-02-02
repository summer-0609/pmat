import figlet from 'figlet';
import clui from 'clui';
import chalk from 'chalk';

const { log } = console;
const { Line } = clui;

class Output {
  writeASCII() {
    log('\n');
    log(chalk.cyan(figlet.textSync('Zelda')));
    log('\n');
  }

  writeIntro(url: string) {
    log(`${`🚀 It loaded` } ${  chalk.yellow(`${url}`)}`)
    log('\n');
  }

  writeInfo({ DNS }) {
    new Line()
      .padding(2)
      .column('DNS lookup time', 32)
      .column(DNS, 20, [chalk.green])
      .fill()
      .output();
  }
}

export default new Output();
