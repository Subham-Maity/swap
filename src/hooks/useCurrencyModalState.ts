import { useCallback, useState } from 'react';

export enum CURRENCY_MODAL_CALLS     {
  SEND_COIN,
  RECEIVE_COIN,
}

export const useCurrencyModal = (): { currencyModalCall: CURRENCY_MODAL_CALLS; updateCurrencyModalCallCallback: (modalCall: CURRENCY_MODAL_CALLS) => void } => {
  let [currencyModalCall, updateCurrencyModalCall] = useState<CURRENCY_MODAL_CALLS>(CURRENCY_MODAL_CALLS.SEND_COIN);

  const updateCurrencyModalCallCallback = useCallback((modalCall: CURRENCY_MODAL_CALLS) => {
    updateCurrencyModalCall(modalCall);
  }, []);

  return {
    currencyModalCall,
    updateCurrencyModalCallCallback,
  };
};
