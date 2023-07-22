import { useMemo } from 'react';
import { useAllTransactions } from '../store/transactions/hook';
import { Token } from '../store/tokens';
import { useWeb3React } from '@web3-react/core';
import { isEmpty, orderBy } from 'lodash';
import { SWAP_TRANSACTION_STATUS } from './useSwap';

export enum TxType {
  SWAP,
  XSWAP,
}

interface Transaction {
  fromChainId: number;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  hash: string;
  toChainId?: number;
  status: string | null;
  time: number;
  destHash?: string;
}

export interface TransactionHistory {
  date: string;
  transactions: Transaction[];
}

const useTransactions = (type: TxType) => {
  // get transaction history
  let allTransactions = useAllTransactions();
  let { account } = useWeb3React();

  return useMemo(() => {
    if (typeof account === 'undefined') return null;
    if (type === TxType.SWAP) {
      let swaps = allTransactions.swaps;
      swaps = swaps?.filter((swap) => swap.account.toLowerCase() === account?.toLowerCase());

      // is not empty
      if (!isEmpty(swaps) && swaps !== undefined) {
        // group by dates
        const groupByDates = swaps.reduce((groups: { [date: string]: Transaction[] }, swap) => {
          let date = new Date(swap.time * 1000).toLocaleString();
          date = date.split(' ')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push({
            fromChainId: swap.chainId,
            fromToken: swap.fromToken,
            toToken: swap.toToken,
            fromAmount: swap.fromAmount,
            toAmount: swap.toAmount,
            hash: swap.txHash,
            time: swap.time,
            status:
              swap.status === SWAP_TRANSACTION_STATUS.FAILED
                ? 'Failed'
                : swap.status === SWAP_TRANSACTION_STATUS.COMPLETED
                ? 'Completed'
                : swap.status === SWAP_TRANSACTION_STATUS.CANCELLED
                ? 'Canceled'
                : swap.status === SWAP_TRANSACTION_STATUS.WAITING
                ? 'Pending'
                : null,
          });
          return groups;
        }, {});

        let transactionHistory = [] as TransactionHistory[];

        // iterate
        Object.entries(groupByDates).forEach((tx) => {
          transactionHistory.push({
            date: tx[0],
            transactions: tx[1],
          });
        });

        return orderBy(transactionHistory, 'date', 'desc');
      }
    }
    return null;
  }, [account, allTransactions?.swaps, type]);
};

export default useTransactions;
