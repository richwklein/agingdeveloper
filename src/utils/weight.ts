/**
 * Calculates a font weight between 300 and 900 rounding up to the nearest 100.
 */
export const calculateWeight = (value: number, total: number): number => {
  const zeroBased = value - 1;
  const normalized = zeroBased / (total - 1);
  const shifted = normalized * (900 - 300) + 300;
  return Math.ceil(shifted / 100) * 100;
};
