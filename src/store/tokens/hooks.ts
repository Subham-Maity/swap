import { CHAINS } from './../../config/chains';
import { AppState } from './../index';
import { importToken, Token } from './index';
import { setTokens } from '../../store/tokens';
import { getTokens } from './../../utils/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';

let log = console.log;

export const useFetchTokens = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchTokens() {
      try {
        let tokens = await getTokens();
        // dispatch tokens
        dispatch(setTokens(tokens));
      } catch (err) {
        if (err instanceof Error) {
          log(err.message);
        }
      }
    }

    fetchTokens();
  }, [dispatch]);
};

export const useImportToken = () => {
  const dispatch = useDispatch();

  return useCallback(
    (token: Token) => {
      dispatch(importToken(token));
    },
    [dispatch],
  );
};

export const usePlugExchangeDefaultTokens = (): Token[] => {
  let plugTokens = useSelector((state: AppState) => state.tokens);
  let activeTokens = plugTokens?.tokens;
  let importedTokens = plugTokens?.importedTokens;
  return useMemo(() => {
    return [...activeTokens, ...importedTokens];
  }, [activeTokens, importedTokens]);
};

export const useActiveTokens = (chainId: number): Token[] => {
  let activeTokens = usePlugExchangeDefaultTokens();
  return useMemo(() => {
    if (isEmpty(activeTokens) || !chainId) return null;
    return [CHAINS[chainId]?.nativeCurrencyInfo].concat(activeTokens?.filter((e) => e.chainId === chainId));
  }, [activeTokens, chainId]);
};

export const useObtainTokensByChainIds = (fromChainId: number, toChainId: number) => {
  let fromChainTokens = useActiveTokens(fromChainId);
  let toChainTokens = useActiveTokens(toChainId);
  return { fromChainTokens, toChainTokens };
};
