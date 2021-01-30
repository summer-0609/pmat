import { initObserver, logIndicator, getScore } from '../utils';

const getPaintTime = (): void => {
  initObserver('paint', (entries) => {
    entries.forEach((entry) => {
      const time = entry.startTime;
      const { name } = entry;
      if (name === 'first-contentful-paint') {
        logIndicator('FCP', {
          time,
          score: getScore('fcp', time),
        });
      } else {
        logIndicator('FP', {
          time,
        });
      }
    });
  });
};

export default getPaintTime;
