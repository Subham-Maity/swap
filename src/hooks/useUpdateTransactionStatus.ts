import { useEffect } from 'react';
import { useAllTransactions, useSetSwapTransactionStatus } from '../store/transactions/hook';
import { SWAP_TRANSACTION_STATUS } from './useSwap';
import { useWeb3React } from '@web3-react/core';
import { isEmpty } from 'lodash';
import { Web3Provider } from '@ethersproject/providers';

const useUpdateSwapTransactionStatus = () => {
  const allSwapTransaction = useAllTransactions();
  const { library } = useWeb3React() as { library: Web3Provider };
  const setSwapTransactionStatus = useSetSwapTransactionStatus();

  useEffect(() => {
    if (isEmpty(allSwapTransaction)) return;
    async function getConfirmedTransaction() {
      // filter pending transaction
      const pendingTransactions = allSwapTransaction?.swaps?.filter(
        (transaction) => transaction?.status === SWAP_TRANSACTION_STATUS.WAITING,
      );
      if (isEmpty(pendingTransactions)) return;

      try {
        const getTransactionReceipts = pendingTransactions?.map((transaction) =>
          library.getTransactionReceipt(transaction?.txHash),
        );
        const txReceipts = await Promise.all(getTransactionReceipts).then((value) => value);

        console.log({ txReceipts });

        for (let i = 0; i < txReceipts?.length; i++) {
          if (txReceipts[i].status === 1) {
            setSwapTransactionStatus({
              txHash: txReceipts[i].transactionHash,
              txStatus: SWAP_TRANSACTION_STATUS.COMPLETED,
              gas: parseInt(txReceipts[i].cumulativeGasUsed.toString()),
              gasPrice: txReceipts[i].effectiveGasPrice?.toString(),
            });
          } else if (txReceipts[i].status === 0) {
            setSwapTransactionStatus({
              txHash: txReceipts[i].transactionHash,
              txStatus: SWAP_TRANSACTION_STATUS.FAILED,
              gas: parseInt(txReceipts[i].cumulativeGasUsed.toString()),
              gasPrice: txReceipts[i].effectiveGasPrice?.toString(),
            });
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log('useUpdateSwapTransactionStatus Failed', err);
        }
      }
    }

    getConfirmedTransaction();
  }, [library, allSwapTransaction, setSwapTransactionStatus]);
};

export default useUpdateSwapTransactionStatus;
