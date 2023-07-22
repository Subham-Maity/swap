import axios from 'axios';
import { API_URL } from '../config';

export type XswapQuotesFetchOptions = {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  slippageTolerance: number;
  deadline: number;
};

export interface XswapQuoteResponse {
  code: number;
  data: Quote[];
}

export interface Quote {
  srcAmount: string;
  expectedReceivedAmount: string;
  routes: Route[];
  gasEstimate: string;
  bridgeFee: string;
  expectTime: number;
  actionCounts: number;
  totalEstimateGas: string;
  bridgeCase: string;
}

export interface Route {
  actionId: string;
  actionName: string;
  fromChainId: number;
  toChainId: number;
  aggregatorName: string;
  aggregatorId: string;
  aggregatorLogoURI: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

const getXswapQuotes = async (options: XswapQuotesFetchOptions): Promise<Quote[] | null> => {
  try {
    let results = await axios.get(
      `${API_URL}/xswap_routes?fromChainId=${options.fromChainId}&toChainId=${options.toChainId}&fromTokenAddress=${options.fromTokenAddress}&toTokenAddress=${options.toTokenAddress}&amount=${options.amount}&slippageTolerance=${options.slippageTolerance}&deadline=${options.deadline}`,
    );
    let quotes = results.data as XswapQuoteResponse;
    return quotes.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log('Xswap Quote Failed', err.message);
    }
    return null;
  }
};

export default getXswapQuotes;
