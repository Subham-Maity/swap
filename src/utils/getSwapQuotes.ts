import axios from 'axios';
import { API_URL } from 'config';
import { BigNumber } from 'ethers';

export interface SwapQuotesResponse {
  plugFeePercentage: number;
  plugSwapFee: string;
  aggregatorId: string;
  aggregatorLogo: string;
  fromToken: string;
  toToken: string;
  fromTokenAmount: string;
  toTokenAmount: string;
  routes: [];
  data: string;
  estimateGas?: string;
  chainId: number;
  gasCostUSD?: string;
}

export interface SwapFetchOptions {
  chainId: number;
  fromToken: string;
  toToken: string;
  slippageTolerance: number;
  toTokenDecimals: number;
  fromTokenDecimals: number;
  gasPrice: number;
  amount: BigNumber;
}

const getSwapQuotes = async (options: SwapFetchOptions): Promise<SwapQuotesResponse[] | null> => {
  try {
    const quotes = await axios.get(
      `${API_URL}/swap_quotes?chainId=${options?.chainId}&fromToken=${options?.fromToken}&toToken=${options?.toToken}&amount=${options?.amount}&slippageTolerance=${options?.slippageTolerance}&toTokenDecimals=${options?.toTokenDecimals}&fromTokenDecimals=${options?.fromTokenDecimals}&gasPrice=${options?.gasPrice}`,
    );

    return quotes?.data?.data as SwapQuotesResponse[];
  } catch (err) {
    if (err instanceof Error) {
      console.log('SwapQuote Failed', err.message);
    }
    return null;
  }
};

export default getSwapQuotes;
