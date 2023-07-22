import React, { useMemo } from 'react';
import { isEmpty, orderBy, multiply, divide, subtract } from 'lodash';
import useSWR from 'swr';
import getSwapQuotes from '../utils/getSwapQuotes';
import { useAppChainId } from '../store/user/hooks';
import { useUserTransactionSetting } from '../store/user/hooks';
import { parseCurrency } from '../utils/units';
import useGetGasPrice from './useGetGasPrice';
import { SwapQuotesResponse } from '../utils/getSwapQuotes';
import { useDebounce } from 'use-debounce';
import { BigNumber } from 'ethers';
import { formatCurrency } from '../utils/units';
import { NATIVE_TOKEN_ADDRESS } from 'config';
import useTokenPrices from './useTokenPrices';
import { useSwapTokens } from 'store/swap/hooks';
import { roundValue, unitFormatter } from 'utils';
import { ethers } from 'ethers';
import { SwapFetchOptions } from '../utils/getSwapQuotes';

export interface SwapQuotesResponseWithTxCost extends SwapQuotesResponse {
  formattedRecievedAmount: number;
  txCost: number;
  txCostInUsd: number;
  save: number;
  toAmountInUsd: number;
  priceImpact?: number;
}

const useSwapQuotes = (): { quotes: SwapQuotesResponseWithTxCost[]; isLoading: boolean } => {
  const appChainId = useAppChainId();
  const transactionSetting = useUserTransactionSetting();
  const gasPrices = useGetGasPrice();

  const tokenPrice = useTokenPrices(appChainId);
  const { toToken, fromToken, swapInputValue } = useSwapTokens();
  const debouncedAmount = useDebounce(swapInputValue, 2000);

  const fetchOptions = useMemo<SwapFetchOptions>(() => {
    return {
      chainId: appChainId,
      fromToken: fromToken?.address,
      toToken: toToken?.address,
      slippageTolerance: transactionSetting?.slippage,
      toTokenDecimals: toToken?.decimals,
      fromTokenDecimals: fromToken?.decimals,
      gasPrice: gasPrices?.speeds?.[transactionSetting?.gasSpeedSelect]?.gasPrice,
      amount: parseCurrency(debouncedAmount[0], fromToken?.decimals),
    };
  }, [appChainId, fromToken, toToken, transactionSetting, gasPrices, debouncedAmount]);

  let cacheKey = useMemo(() => {
    if (Object.values(fetchOptions).some((el) => !el) || (debouncedAmount[0] !== swapInputValue && swapInputValue < 0))
      return null;
    return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(fetchOptions)));
  }, [fetchOptions, debouncedAmount, swapInputValue]);

  const { data, isLoading } = useSWR(cacheKey, () => getSwapQuotes(fetchOptions), {
    refreshInterval: 45000,
    dedupingInterval: 45000,
    focusThrottleInterval: 2000,
    errorRetryCount: 2,
  });

  const swapQuotes = data as SwapQuotesResponse[];

  let quotes = React.useMemo(() => {
    if (isEmpty(swapQuotes)) return null;
    const sortedQuotes = orderBy(swapQuotes, ['toTokenAmount'], ['desc']);
    const nativeTokenPrice = tokenPrice?.[NATIVE_TOKEN_ADDRESS]?.usd;

    const gasEstimates = swapQuotes?.map((e) => Number(e?.estimateGas));
    const maxGasFee = Math.max(...gasEstimates);

    return sortedQuotes?.map((e) => {
      let transactionCost = formatCurrency(BigNumber.from(e?.estimateGas), 9);
      let save = formatCurrency(BigNumber.from(maxGasFee).sub(BigNumber.from(e?.estimateGas)), 9);

      // price impact calculate
      const fromTokenAmountInUSD =
        unitFormatter(e?.fromTokenAmount, fromToken?.decimals) * tokenPrice?.[e?.fromToken?.toLowerCase()]?.usd;
      const toAmountInUsd =
        unitFormatter(e?.toTokenAmount, toToken?.decimals) * tokenPrice?.[e?.toToken?.toLowerCase()]?.usd;

      const priceImpact = multiply(divide(subtract(fromTokenAmountInUSD, toAmountInUsd), fromTokenAmountInUSD), 100);
      return {
        ...e,
        priceImpact: roundValue(priceImpact, 2),
        formattedRecievedAmount: roundValue(formatCurrency(BigNumber.from(e?.toTokenAmount), toToken.decimals), 4),
        txCost: transactionCost,
        txCostInUsd: multiply(transactionCost, nativeTokenPrice),
        save: multiply(save, nativeTokenPrice), // saved amount in USD
        toAmountInUsd: multiply(
          formatCurrency(BigNumber.from(e?.toTokenAmount), toToken?.decimals),
          tokenPrice?.[toToken?.address?.toLowerCase()]?.usd,
        ),
      };
    });
  }, [
    swapQuotes,
    toToken?.address,
    tokenPrice,
    toToken?.decimals,
    fromToken?.decimals,
  ]) as SwapQuotesResponseWithTxCost[];

  return { quotes, isLoading };
};

export default useSwapQuotes;
