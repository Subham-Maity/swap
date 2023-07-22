import { Token } from './../store/tokens/index';
import { ICall } from '@makerdao/multicall';
import multicall from './multicall';
import _ from 'lodash';

const getTokenInfoCalls = (token: string): ICall[] => {
  return [
    {
      target: token,
      call: ['name()(string)'],
      returns: [['TOKEN_NAME']],
    },
    {
      target: token,
      call: ['symbol()(string)'],
      returns: [['TOKEN_SYMBOL']],
    },
    {
      target: token,
      call: ['decimals()(uint8)'],
      returns: [['TOKEN_DECIMALS']],
    },
  ];
};

const getTokenInfoByAddress = async (token: string, chainId: number): Promise<Token | undefined> => {
  let tokenInfoCalls = getTokenInfoCalls(token);
  let callResults = await multicall(chainId, tokenInfoCalls);
  let original = callResults.results.original;
  if (_.isEmpty(original)) return undefined;

  return {
    name: original['TOKEN_NAME'] as string,
    symbol: original['TOKEN_SYMBOL'] as string,
    decimals: parseInt(original['TOKEN_DECIMALS']),
    address: token,
    chainId,
  };
};

export default getTokenInfoByAddress;
