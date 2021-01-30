export const isSupportPerformance = (): boolean => {
  const { performance } = window;
  return performance && !!performance.getEntriesByType && !!performance.now && !!performance.mark;
};

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development';
};
