import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ModalType, toggleModal, updateBlockNumber } from '.';
import { AppDispatch, AppState } from '../';

export const useToggleModal = (modal: ModalType | null) => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(toggleModal(modal));
  }, [dispatch, modal]);
};

export const useOpenWalletModal = () => {
  return useToggleModal(ModalType.WALLET_MODAL);
};

export const useOpenSwapConfirmationModal = () => {
  return useToggleModal(ModalType.SWAP_CONFIRMATION_MODAL);
};

export const useIsModalOpen = (modal: ModalType): boolean => {
  const opened_modal = useSelector<AppState>((state) => state?.app.modal);
  return modal === opened_modal;
};

export const usePollBlockNumber = () => {
  let { library } = useWeb3React();
  let dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!library) return null;

    // subsribe the event
    library.on('block', (block: number) => {
      dispatch(updateBlockNumber(block));
    });

    return () => {
      library.removeAllListeners('block');
    };
  }, [library, dispatch]);
};

export const useBlocknumber = (): number => {
  return useSelector((state: AppState) => state.app.blockNumber);
};
