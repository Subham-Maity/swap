import useSWR from 'swr';
import { useActiveTokens } from '../store/tokens/hooks';
import getTokenPrices from '../utils/getTokenPrices';

const useTokenPrices = (chainId: number) => {
  const tokenList = useActiveTokens(chainId);
  const { data } = useSWR(`prices_${chainId}`, () => getTokenPrices(chainId, tokenList), {
    refreshInterval: 600000,
    shouldRetryOnError: false,
    dedupingInterval: 600000,
  });

  return data;
};

export default useTokenPrices;
