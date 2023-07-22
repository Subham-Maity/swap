import { Token } from './../store/tokens/index';
import { useState, useCallback, useEffect } from 'react';
import { useActiveTokens } from '../store/tokens/hooks';
import getTokenInfoByAddress from '../utils/getTokenInfoByAddress';
import { isEmpty } from 'lodash';

export const useSearchTokens = (): [string, (search: string) => void] => {
  let [searchValue, setSearchValue] = useState<string>('');
  const searchHandler = useCallback((search) => {
    setSearchValue(search);
  }, []);
  return [searchValue, searchHandler];
};

export const useSearchResults = (
  searchValue: string,
  chainId: number,
): { tokenResults: Token[]; hasImported: { [key in string]: boolean } } => {
  let tokens = useActiveTokens(chainId);
  let [tokenResults, setTokenResults] = useState<Token[]>(tokens);
  let [hasImported, setImported] = useState<{ [key in string]: boolean }>();

  useEffect(() => {
    const fetchTokenSearchResults = async () => {
      // tell user to import this token
      if (searchValue?.length === 42) {
        // check if tokens are exist on the token list
        let tokenSearchResults = tokens?.filter((e) => e.address.toLowerCase() === searchValue?.toLowerCase());
        if (!isEmpty(tokenSearchResults)) {
          setTokenResults(tokenSearchResults);
        } else {
          let token = await getTokenInfoByAddress(searchValue, chainId);
          setTokenResults([token]);
          let imported = {};
          imported[token?.address?.toLowerCase()] = true;
          setImported(imported);
        }
      }

      // search value is not address
      else {
        let tokenSearchResults = tokens?.filter(
          (e) =>
            e.name.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
            e.symbol.toLowerCase().includes(searchValue.toLowerCase().trim()),
        );

        setTokenResults(tokenSearchResults);
      }
    };

    fetchTokenSearchResults();
  }, [chainId, searchValue, tokens]);

  return { tokenResults, hasImported };
};
