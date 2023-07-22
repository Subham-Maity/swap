import { useCallback, useState } from 'react';

export enum SWAP_VIEWS {
  SWAP_SETTINGS,
  SWAP,
  TOKENLIST_VIEW,
}

export const useSwapView = (): { swapView: SWAP_VIEWS; updateSwapViewCallback: (view: SWAP_VIEWS) => void } => {
  let [swapView, updateSwapView] = useState<SWAP_VIEWS>(SWAP_VIEWS.SWAP);

  const updateSwapViewCallback = useCallback((view: SWAP_VIEWS) => {
    updateSwapView(view);
  }, []);

  return {
    swapView,
    updateSwapViewCallback,
  };
};
