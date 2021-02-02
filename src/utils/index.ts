import { EntryType, ObserverCallback } from '../types';

export * from './log';
export * from './validate';
export * from './score';
export * from './utils';

export const initObserver = (
  entryTypes: EntryType[] | EntryType,
  callback: ObserverCallback,
): void => {
  const observer = new PerformanceObserver((list) => {
    // 当记录一个新的性能指标时执行
    if (typeof callback === 'function') {
      callback.call(null, list.getEntries());
    }
  });

  // 注册长任务观察者
  if (typeof entryTypes === 'string') {
    observer.observe({ type: entryTypes, buffered: true });
    return;
  }
  observer.observe({ entryTypes });
};

/**
 * @param {Number} ms
 * 把毫秒数转化为人类可读的字符串
 */
export const format = (ms: number, readable = true): string => {
  let ret = `${ms.toFixed(2)} ms`;
  if (!readable) return ret;
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HORE = 60 * ONE_MINUTE;
  // 小于1秒，那么用毫秒为单位
  if (ms >= ONE_SECOND && ms < ONE_MINUTE) {
    // 大于一秒小于一分钟，用秒作为单位
    ret = `${(ms / 1000).toFixed(2)} s`;
  } else if (ms >= ONE_MINUTE && ms < ONE_HORE) {
    // 大于一分钟，小于一小时，用分钟作单位
    ret = `${(ms / 1000 / 60).toFixed(2)} m`;
  } else if (ms >= ONE_HORE) {
    // 大于一个小时，用小时作单位
    ret = `${(ms / 1000 / 60 / 60).toFixed(2)} h`;
  }
  return ret;
};
