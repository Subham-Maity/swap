import { useWeb3React } from '@web3-react/core';
import { getMultipleTokensBalances } from '../utils/getMultipleTokensBalances';
import useSWR from 'swr';
import { useActiveTokens } from 'store/tokens/hooks';

const useTokenBalances = (chainId: number) => {
  const { account } = useWeb3React();
  const tokenList = useActiveTokens(chainId);
  const { data } = useSWR(
    account === undefined ? null : `balance_${account?.toLowerCase()}_${chainId}`,
    () => getMultipleTokensBalances(chainId, tokenList, account),
    {
      refreshInterval: 60000,
      dedupingInterval: 60000,
    },
  );

  return data;
};

export default useTokenBalances;
