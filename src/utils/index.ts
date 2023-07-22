import { formatUnits } from '@ethersproject/units';
import { Tokens } from 'components/WalletDetails/UserAssets';
import { GAS_LIMIT_GRACE_PERCENTAGE } from 'config';
import { BigNumber, Contract } from 'ethers';
import { isEmpty } from 'lodash';

export const unitFormatter = (units: string | BigNumber, decimals = 18): number => {
  if (!units) return null;
  return Number(formatUnits(units, decimals ? decimals : 18));
};

export const sliceString = (text: string, size: number) => {
  return text?.length > size ? text.slice(0, size) + '...' : text;
};

export const getSumOfUSDBalance = (tokenList: Tokens[]) => {
  if (isEmpty(tokenList)) return null;
  return tokenList.map((item) => item.usdBalance).reduce((prev, next) => prev + next);
};

export const generateQuoteid = (length: number) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const currencyFormatter = (amount: number) => {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 3, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(amount);
};

export const getDateFromUnixTime = (unixTime: number): string => {
  let date = new Date(unixTime * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return `${months[month]} ${day}, ${year}`;
};

export const estimatedGas = async (
  contract: Contract,
  method: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodParams: any[],
  account: string,
  value: BigNumber,
): Promise<BigNumber> => {
  const estimatedGasLimit = await contract.estimateGas[method](...methodParams, {
    from: account,
    value,
  });
  return estimatedGasLimit.add(
    estimatedGasLimit.mul(BigNumber.from(GAS_LIMIT_GRACE_PERCENTAGE)).div(BigNumber.from(100)),
  );
};

export const roundValue = (value: number, roundTo: number) => {
  return Math.floor(value * 10 ** roundTo) / 10 ** roundTo;
};
