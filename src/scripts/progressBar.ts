export const inProgressNumber = (progress: number, total: number) => {
  const percentage = (progress / total) * 100;
  const percentage2Digits = Math.round(percentage * 100) / 100;
  const bar = '🟩'.repeat(percentage / 10);
  const currentProgress =
    percentage % 10 <= 5 ? (percentage % 10 == 0 ? '' : '🟥') : '🟧';
  const empty = '️️▫️'.repeat(10 - percentage / 10);
  const allBar = bar + currentProgress + empty;
  return { percentage2Digits, allBar };
};
