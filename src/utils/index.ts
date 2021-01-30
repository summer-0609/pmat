import { EntryType, ObserverCallback } from '../types';

export * from './log';
export * from './validate';
export * from './score';

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
