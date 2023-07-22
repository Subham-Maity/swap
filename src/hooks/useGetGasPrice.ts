import getGasPrice from '../utils/getGasPrice';
import useSWR from 'swr';
import { useAppChainId } from 'store/user/hooks';

const useGetGasPrice = () => {
  const appChainId = useAppChainId();

  const { data } = useSWR(`gasPrice_${appChainId}`, () => getGasPrice(appChainId), {
    refreshInterval: 10000,
  });

  return data;
};

export default useGetGasPrice;
