import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppChainId } from 'store/user/hooks';

const useAppChainIdError = () => {
  const appChainId = useAppChainId();
  const { chainId, active } = useWeb3React();
  return useMemo(() => {
    if (active) {
      return chainId !== appChainId;
    }
    return undefined;
  }, [appChainId, active, chainId]);
};

export default useAppChainIdError;
