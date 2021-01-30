export const scoreLevel = ['fast', 'moderate', 'slow'];

export const scores: Record<string, number[]> = {
  fcp: [2000, 4000],
  lcp: [2500, 4500],
  fid: [100, 300],
  tbt: [300, 600],
  cls: [0.1, 0.25],
};

export const getScore = (type: string, data: number): string => {
  const score = scores[type];
  for (let i = 0; i < score.length; i += 1) {
    if (data <= score[i]) return scoreLevel[i];
  }

  return scoreLevel[2];
};
