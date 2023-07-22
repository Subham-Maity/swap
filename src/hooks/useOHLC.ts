import useSWR from 'swr';
import getOHLCData from '../utils/getOHLCData';

export const useOHLC = (
  fromToken: string,
  toToken: string,
  timeInterval: number,
  chainId: number,
): [boolean, string[] | undefined, number[] | undefined] => {
  let { data, error } = useSWR(
    `${fromToken}_${toToken}_${timeInterval}`,
    () => getOHLCData(chainId, fromToken, toToken, timeInterval),
    {
      refreshInterval: 600000,
      shouldRetryOnError: false,
      revalidateOnMount: false,
      dedupingInterval: 600000,
    },
  );

  if (error) {
    return [true, [], []];
  }

  return [false, data?.xAxisData, data?.comparativePrices];
};
