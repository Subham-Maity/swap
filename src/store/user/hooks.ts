import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../index';
import { useWeb3React } from '@web3-react/core';
import { AppDispatch } from './../index';
import { supportedChainIds } from 'connectors';
import { hexValue } from 'ethers/lib/utils';
import { setAppChainId } from '.';
import { chainConfig } from 'config/chains';

export const useUserTransactionSetting = () => {
  return useSelector((state: AppState) => ({
    slippage: state.user.slippage,
    deadLine: state.user.deadLine,
    gasSpeedSelect: state.user.gasSpeedSelect,
    autoRouterAPI: state.user.autoRouterAPI,
  }));
};

export const useSwitchChainId = () => {
  const { library } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (newAppChainId: number, noSwitch?: boolean) => {
      const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
      try {
        if (!supportedChainIds.includes(newAppChainId)) return null;
        if (isMetaMask && !noSwitch) {
          await library.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexValue(newAppChainId) }],
          });
        }

        dispatch(setAppChainId(newAppChainId));

        return true;
      } catch (err) {
        if (err.code === 4902) {
          const ethereum = window?.ethereum;
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: chainConfig[newAppChainId],
          });
          dispatch(setAppChainId(newAppChainId));
        }
        console.log('Error in change of app chainId: ', err.message);
        return false;
      }
    },
    [dispatch, library],
  );
};

export const useAppChainId = () => {
  return useSelector((state: AppState) => state.user.appChainId);
};
