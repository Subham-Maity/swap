import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { Token } from '../store/tokens/index';
export enum AddToMetaMaskStatus {
  /** loading */
  ADD_TO_METAMASK_LOADING,
  /** completed */
  ADD_TO_METAMASK_COMPLETED,
  /** error */
  ADD_TO_METAMASK_ERROR,
}

let log = console.log;

export const useAddTokenToMetaMask = (): [AddToMetaMaskStatus, (token: Token) => void] => {
  // for updating status
  let [addToMetaMaskStatus, setAddToMetaMaskStatus] = useState<AddToMetaMaskStatus>();

  const addToMetaMaskCallback = useCallback(async (token: Token) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /** @ts-ignore */
      if (window?.ethereum && window?.ethereum?.isMetaMask && !isEmpty(token)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /** @ts-ignore */
        let success = await window?.ethereum?.request({
          method: 'wallet_watchAsset',
          params: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /** @ts-ignore */
            type: 'ERC20',
            options: {
              address: token?.address,
              symbol: token?.symbol,
              decimals: token?.decimals,
              image: token?.logoURI,
            },
          },
        });
        if (success) {
          setAddToMetaMaskStatus(AddToMetaMaskStatus.ADD_TO_METAMASK_COMPLETED);
        }
      }
    } catch (err) {
      log(err.message);
      setAddToMetaMaskStatus(AddToMetaMaskStatus.ADD_TO_METAMASK_ERROR);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /** @ts-ignore */
  return [addToMetaMaskStatus, addToMetaMaskCallback];
};
