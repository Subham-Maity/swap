import axios from 'axios';
import { NATIVE_TOKEN_ADDRESS } from '../config/index';
import { CHAINS } from 'config/chains';

interface TokenPrice {
  prices: number[][];
}

interface OHLCData {
  xAxisData: string[];
  comparativePrices: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPrices = (response: any) => {
  return response?.prices?.map((coin) => coin[1]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAxisData = (response: any) => {
  return response?.prices?.map((coin: (string | number | Date)[]) => {
    let date = new Date(coin[0]);
    return date.toLocaleDateString();
  });
};

const getOHLCData = async (
  chainId: number,
  fromToken: string,
  toToken: string,
  timeInterval: number,
): Promise<OHLCData> => {
  if (!chainId || !fromToken || !toToken) return null;
  const [fromTokenResponse, toTokenResponse] = await Promise.all([
    urlCall(chainId, fromToken, timeInterval),
    urlCall(chainId, toToken, timeInterval),
  ]);

  const fromTokenPrices = fromTokenResponse.data as TokenPrice | number[][];
  const toTokenPrices = toTokenResponse.data as TokenPrice;

  let fromPrice: number[] = getPrices(fromTokenPrices);
  let toPrice: number[] = getPrices(toTokenPrices);

  let comparativePrices: number[] = [];

  const xAxisData = getAxisData(fromTokenPrices);

  for (let i = 0; i < fromPrice?.length; i++) {
    comparativePrices[i] = fromPrice[i] / toPrice[i];
  }

  return { comparativePrices, xAxisData };
};

const urlCall = (chainId: number, token: string, timeInterval: number) => {
  let to = parseInt((new Date().getTime() / 1000).toFixed(0));
  let from = to - timeInterval * 86400;

  if (token.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()) {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${CHAINS?.[chainId]?.nativeCurrencyInfo?.coingeckoId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}
    `);
  }
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${CHAINS?.[chainId]?.nativeCurrencyInfo?.assetPlatform}/contract/${token}/market_chart/range/?vs_currency=usd&from=${from}&to=${to}`,
  );
};

export default getOHLCData;
