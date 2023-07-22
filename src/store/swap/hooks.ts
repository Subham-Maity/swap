import { Token } from './../tokens/index';
import { AppDispatch, AppState } from './../';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { setSwapInputValue, setSwapTokens, switchSwapTokens } from '.';
import _, { isEmpty } from 'lodash';
import { useActiveTokens } from 'store/tokens/hooks';
import { CHAINS } from 'config/chains';
import { useRouter } from 'next/router';
import { useAppChainId } from 'store/user/hooks';

export const useSetSwapTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (key: string, token: Token) => {
      dispatch(setSwapTokens({ key, token }));
    },
    [dispatch],
  );
};

export const useSwapTokens = () => {
  return useSelector((state: AppState) => state.swap);
};

export const useSetSwapInputValue = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (inputValue: number) => {
      dispatch(setSwapInputValue(inputValue));
    },
    [dispatch],
  );
};

export const useSwitchTokens = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(() => {
    dispatch(switchSwapTokens());
  }, [dispatch]);
};

export const useSetSwapDefaultTokens = () => {
  const appChainId = useAppChainId();
  let tokenlist = useActiveTokens(appChainId);
  let router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isEmpty(tokenlist)) {
      let [tokenA, tokenB] = CHAINS[appChainId].defaultSelectedTokens;

      let fromTokenAddress = (
        router?.query?.['fromToken'] === undefined ? tokenA : router?.query?.['fromToken']
      ) as string;
      let toTokenAddress = (router?.query?.['toToken'] === undefined ? tokenB : router?.query?.['toToken']) as string;

      let from = _.filter(tokenlist, (e) => e.address.toLowerCase() === fromTokenAddress.toLowerCase())?.[0];
      dispatch(setSwapTokens({ key: 'fromToken', token: from }));

      let to = _.filter(tokenlist, (e) => e.address.toLowerCase() === toTokenAddress.toLowerCase())?.[0];
      dispatch(setSwapTokens({ key: 'toToken', token: to }));
    }
  }, [dispatch, appChainId, tokenlist, router.query]);
};
