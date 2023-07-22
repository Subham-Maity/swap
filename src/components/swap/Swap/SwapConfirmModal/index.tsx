import React from 'react';
import Modal from '../../../Modal';
import TransactionWaiting from './TransactionWaiting';
import TransactionFailed from './TransactionFailed';
import TransactionCompleted from './TransactionCompleted';
import SwapDefault from './SwapDefault';
import useSwap, { SWAP_TRANSACTION_STATUS } from '../../../../hooks/useSwap';
import { useToggleModal, useIsModalOpen } from 'store/app/hooks';
import { ModalType } from 'store/app';
import { SwapQuotesResponseWithTxCost } from 'hooks/useSwapQuotes';

type SwapConfirmModalProps = {
  selectedQuote: SwapQuotesResponseWithTxCost;
  toTokenTicker: string;
  fromTokenTicker: string;
  changeSwitch: () => void;
  fromTokenAmount: number;
  toTokenAmount: number;
};

const SwapConfirmModal = ({
  toTokenTicker,
  fromTokenTicker,
  toTokenAmount,
  fromTokenAmount,
  changeSwitch,
  selectedQuote,
}: SwapConfirmModalProps) => {
  let isOpen = useIsModalOpen(ModalType.SWAP_CONFIRMATION_MODAL);
  const closeSwapConfimModal = useToggleModal(null);
  const [swapTxStatus, close, swap, transactionHash] = useSwap(
    selectedQuote?.aggregatorId,
    selectedQuote?.data,
    selectedQuote?.formattedRecievedAmount,
  );

  const closeModel = () => {
    close();
    closeSwapConfimModal();
  };

  // render modal screen according to swap transaction status
  const renderedComponent = () => {
    // on transaction loading
    if (swapTxStatus === SWAP_TRANSACTION_STATUS.WAITING) {
      return <TransactionWaiting swapCurrency="" receivedCurrency="" />;
    }

    // on transaction error
    else if (swapTxStatus === SWAP_TRANSACTION_STATUS.FAILED) {
      return <TransactionFailed close={() => closeModel()} />;
    }

    // on transaction completed
    else if (swapTxStatus === SWAP_TRANSACTION_STATUS.COMPLETED) {
      return <TransactionCompleted transactionHash={transactionHash} />;
    }

    // default screen
    else {
      return (
        <SwapDefault
          minReceived={selectedQuote?.formattedRecievedAmount}
          gasEstimateInUSD={selectedQuote?.txCostInUsd}
          priceImpact={selectedQuote?.priceImpact}
          toTokenTicker={toTokenTicker}
          fromTokenTicker={fromTokenTicker}
          toTokenAmount={toTokenAmount}
          fromTokenAmount={fromTokenAmount}
          changeSwitch={changeSwitch}
          swap={swap}
        />
      );
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} close={closeSwapConfimModal} modalTitle="Swap Confirmation">
        {renderedComponent()}
      </Modal>
    </>
  );
};

export default SwapConfirmModal;
