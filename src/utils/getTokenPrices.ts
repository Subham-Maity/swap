import { Token } from '../store/tokens';
import { CHAINS } from 'config/chains';
import axios, { AxiosResponse } from 'axios';
import { NATIVE_TOKEN_ADDRESS } from 'config';

interface TokenPrice {
  [key: string]: {
    usd: number;
  };
}

const getTokenPrices = async (chainId: number | undefined, tokenList: Token[]): Promise<TokenPrice | null> => {
  if (!chainId || !tokenList) return null;
  const tokenAddresses = tokenList.map((token) => {
    return token.address.toLowerCase();
  });

  try {
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let calls = [] as Promise<AxiosResponse<any, any>>[];

    while (i < tokenAddresses.length) {
      calls.push(
        axios.get(
          `https://api.coingecko.com/api/v3/simple/token_price/${
            CHAINS?.[chainId]?.nativeCurrencyInfo?.assetPlatform
          }?contract_addresses=${tokenAddresses.slice(i, i + 75)}&vs_currencies=usd`,
        ),
      );
      i = i + 75;
    }

    let ethPriceResult = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${CHAINS?.[chainId]?.nativeCurrencyInfo?.coingeckoId}&vs_currencies=usd`,
    );
    let responses = await Promise.all(calls);

    let tokenPrices = {} as TokenPrice;
    //
    responses.map((res) => {
      tokenPrices = { ...tokenPrices, ...res?.data };
    });

    tokenPrices[NATIVE_TOKEN_ADDRESS.toLowerCase()] =
      ethPriceResult?.data?.[CHAINS?.[chainId]?.nativeCurrencyInfo?.coingeckoId];
    return tokenPrices;
  } catch (err) {
    if (err instanceof Error) {
      console.log('Token Price Failed: ', err.message);
    }
    return null;
  }
};

export default getTokenPrices;
