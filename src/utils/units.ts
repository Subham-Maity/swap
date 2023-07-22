import { utils, BigNumber } from 'ethers';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const parseCurrency = (amount: number, decimals: number = 18): BigNumber => {
  if (!amount) return null;
  return utils.parseUnits(amount?.toString(), decimals);
};

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const formatCurrency = (amount: BigNumber | string, decimals: number = 18): number => {
  if (!amount) return null;
  return parseFloat(utils.formatUnits(amount, decimals));
};
