export const OffPercentage = (currentPrice: number, PreviousPrice: number) => {
  return Math.abs(
    ((currentPrice - PreviousPrice) / PreviousPrice) * 100
  ).toFixed(0);
};
