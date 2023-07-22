import React from 'react';
import useTokenBalances from './useTokenBalances';
import useTokenPrices from './useTokenPrices';
import { useAppChainId } from 'store/user/hooks';

const useNetworth = () => {
  let appChainId = useAppChainId();
  let tokenBalances = useTokenBalances(appChainId);
  let tokenPrices = useTokenPrices(appChainId);

  return React.useMemo(() => {
    if (!tokenBalances || !tokenPrices) return null;
    const tokenAddresses = Object.keys(tokenBalances)?.length;

    let tokenWithUsdBalances: { [tokenAddresses: string]: number } = {};
    let totalNetworth = 0;
    let keys = Object.keys(tokenBalances);

    for (let i = 0; i < tokenAddresses; i++) {
      let balance = tokenBalances[keys[i].toLowerCase()];

      // when balance is greater than zero
      if (balance > 0) {
        let tokenPrice = tokenPrices?.[keys[i].toLowerCase()]?.usd ?? 0;
        totalNetworth += tokenPrice * balance;
        tokenWithUsdBalances[keys[i].toLowerCase()] = tokenPrice * balance;
      }
    }
    return { tokenWithUsdBalances, totalNetworth };
  }, [tokenBalances, tokenPrices]);
};

export default useNetworth;
