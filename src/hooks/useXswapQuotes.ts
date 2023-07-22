import { NATIVE_TOKEN_ADDRESS } from 'config';
import { DEPOSIT_ACTION_ID, XswapCases } from 'config/crosschain';
import { BigNumber, ethers } from 'ethers';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { Token } from 'store/tokens';
import { useXSwapState } from 'store/xswap/hook';
import useSwr from 'swr';
import { useDebounce } from 'use-debounce';
import { roundValue } from 'utils';
import { formatCurrency, parseCurrency } from 'utils/units';
import getXswapQuotes, { XswapQuotesFetchOptions } from '../utils/getXswapQuotes';
import { Quote as XQuote, Route } from '../utils/getXswapQuotes';
import useGetGasPrice from './useGetGasPrice';
import useTokenPrices from './useTokenPrices';

export interface Quote {
  gasUSD: number;
  actionCounts: number;
  aggregatorId: string;
  estimatedTime: number;
  bridgeName: string;
  bridgeCase: XswapCases;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  fromChainId: number;
  toChainId: number;
  bridgeFee: number;
  gasEstimate: number;
  bridgeLogo: string;
}

const useXswapQuotes = (fetchOptions: XswapQuotesFetchOptions) => {
  const debouncedAmount = useDebounce(fetchOptions?.amount ?? '0', 2000);

  // create cache key
  let cache_key = useMemo(() => {
    let debounceAmount = debouncedAmount[0];
    if (Object.values(fetchOptions).some((el) => !el) || debounceAmount !== fetchOptions.amount) return null;
    // set fetch options
    fetchOptions.amount = debouncedAmount[0];
    return `xswap_${fetchOptions.fromTokenAddress}_${fetchOptions.toTokenAddress}_${fetchOptions.slippageTolerance}_${fetchOptions.toChainId}_${fetchOptions.fromChainId}_${debounceAmount}`;
  }, [fetchOptions, debouncedAmount]);

  const { data, isLoading, isValidating } = useSwr(cache_key, () => getXswapQuotes(fetchOptions), {
    refreshInterval: 60000,
    dedupingInterval: 60000,
    focusThrottleInterval: 2000,
    errorRetryCount: 2,
  });

  return {
    quotes: data,
    isLoading,
    isValidating,
  };
};

export const useFormulateXswapQuotes = (quotes: XQuote[] | null | undefined, gasSpeedSelected: string): Quote[] => {
  const { fromChainId, xSwapInputValue, fromToken, toToken, toChainId } = useXSwapState();
  const tokenPrices = useTokenPrices(fromChainId);
  const gasSpeeds = useGetGasPrice();

  return useMemo(() => {
    if (isEmpty(quotes)) return null;
    const nativeTokenPrice = tokenPrices?.[NATIVE_TOKEN_ADDRESS.toLowerCase()]?.usd;
    const gasPrice = parseCurrency(gasSpeeds?.speeds?.[gasSpeedSelected]?.gasPrice, 9);

    return quotes.map((quote) => {
      let gasUsed = gasPrice.mul(BigNumber.from(quote?.gasEstimate ?? 0));
      let routes = quote?.routes;

      // aggregator name
      let route = routes?.filter((route) => route?.actionId?.toLowerCase() === DEPOSIT_ACTION_ID.toLowerCase())?.[0];

      let parsedToAmount = routes?.[routes?.length - 1]?.toAmount;

      console.log('bridgeFee', quote?.bridgeFee);
      return {
        gasUSD: roundValue(parseFloat(ethers.utils.formatEther(gasUsed)) * nativeTokenPrice, 4),
        actionCounts: quote.actionCounts,
        estimatedTime: Number(quote.expectTime) / 60,
        bridgeCase: quote.bridgeCase,
        bridgeName: route?.aggregatorName,
        fromToken,
        toToken,
        fromChainId,
        toChainId,
        fromAmount: xSwapInputValue,
        toAmount: roundValue(formatCurrency(BigNumber.from(parsedToAmount), toToken?.decimals), 4),
        bridgeFee: formatCurrency(quote?.bridgeFee, fromToken?.decimals),
        gasEstimate: parseFloat(ethers.utils.formatEther(gasUsed)),
        bridgeLogo: route?.aggregatorLogoURI,
        aggregatorId: '',
      };
    }) as Quote[];
  }, [tokenPrices, quotes, gasSpeedSelected, gasSpeeds, fromToken, toToken, xSwapInputValue, fromChainId, toChainId]);
};

export default useXswapQuotes;
