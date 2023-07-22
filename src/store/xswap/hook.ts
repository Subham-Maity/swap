import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, AppState } from './../';
import { setXSwapChainId, setXSwapToken, setXSwapInputValue, switchXSwapChain } from '.';
import { Token } from '../tokens';

// set xswap chain id 'fromChainId' and 'toChainId'
export const useSetXSwapChain = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (key: string, chainId: number) => {
      dispatch(setXSwapChainId({ key, chainId }));
    },
    [dispatch],
  );
};

// set xswap token 'fromToken' and 'toToken'
export const useSetXSwapTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (key: string, token: Token) => {
      dispatch(setXSwapToken({ key, token }));
    },
    [dispatch],
  );
};

export const useSetXSwapInputValue = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (value: number) => {
      dispatch(setXSwapInputValue({ value }));
    },
    [dispatch],
  );
};

// switch xswap chain
export const useSwitchXSwapChain = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(switchXSwapChain());
  }, [dispatch]);
};

export const useXSwapState = () => {
  return useSelector((state: AppState) => state.xswap);
};
