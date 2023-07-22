import { ICall, IResponse } from '@makerdao/multicall';
import { NATIVE_TOKEN_ADDRESS } from '../config/index';
import { isEmpty } from 'lodash';
import { Token } from '../store/tokens';
import { unitFormatter } from '.';
import multicall from './multicall';

export const createMultiCallForBalance = (target: string, args: string[]): ICall => {
  if (target.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()) {
    return {
      call: ['getEthBalance(address)(uint256)', ...args],
      returns: [[`${target.toLowerCase()}`, (val) => val]],
    };
  }
  return {
    target,
    call: ['balanceOf(address)(uint256)', ...args],
    returns: [[`${target.toLowerCase()}`, (val) => val]],
  };
};

interface MulticallResults {
  [tokenAddress: string]: number;
}

export const getMultipleTokensBalances = async (
  chainId: number,
  tokens: Token[],
  account: string,
): Promise<MulticallResults> => {
  if (!chainId || isEmpty(tokens) || !account) return null;
  const tokenAddresses = tokens.map((token) => {
    return token.address;
  });
  let calls = [] as ICall[];
  const args = [account];
  for (let t = 0; t < tokenAddresses.length; t++) {
    calls.push(createMultiCallForBalance(tokenAddresses[t].toLowerCase(), args));
  }

  try {
    const multiCallBalance: IResponse = await multicall(chainId, calls);
    const originalResults: { [tokenAddress: string]: string } = multiCallBalance.results.original;

    // formatted balance
    let formattedBalance: { [tokenAddress: string]: number } = {};

    for (let k = 0; k < tokens.length; k++) {
      let token = tokens[k];
      formattedBalance[token?.address?.toLowerCase()] = unitFormatter(
        originalResults[token?.address?.toLowerCase()],
        token.decimals,
      );
    }

    return formattedBalance;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
