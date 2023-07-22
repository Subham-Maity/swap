import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '..';
import { addSwapTransaction, addXswapTransaction, changeSwapTxStatus, updateXSwapTransactionStepStatus } from '.';
import { SwapTransaction, UpdatedSwapTransactionFields, XswapTransaction } from './types';

export const useAddSwapTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (transaction: SwapTransaction) => {
      dispatch(addSwapTransaction(transaction));
    },
    [dispatch],
  );
};

export const useSetSwapTransactionStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (txData: UpdatedSwapTransactionFields) => {
      dispatch(changeSwapTxStatus(txData));
    },
    [dispatch],
  );
};

export const useAddXswapTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (transaction: XswapTransaction) => {
      dispatch(addXswapTransaction(transaction));
    },
    [dispatch],
  );
};

export const useAllTransactions = () => {
  let allTransactions = useSelector((state: AppState) => state.transactions);
  return allTransactions;
};

export const useXSWAPTransactionStatusManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (transactionMemo: string, status: boolean, txhash: string) => {
      dispatch(updateXSwapTransactionStepStatus({ transactionMemo, status, txhash }));
    },
    [dispatch],
  );
};
