import { BigNumber } from 'ethers';
import { SWAP_TRANSACTION_STATUS } from '../../hooks/useSwap';
import { Token } from '../tokens';

export interface UpdatedSwapTransactionFields {
  txHash: string;
  txStatus: SWAP_TRANSACTION_STATUS;
  gas: number;
  gasPrice: string;
}

export interface SwapTransaction {
  aggregatorId: string;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  status: SWAP_TRANSACTION_STATUS;
  txHash: string;
  chainId: number;
  time: number;
  account: string;
  gas?: number;
  gasPrice?: string;
}

export interface TransactionStepPayload {
  actionId: string;
  fromChainId: number;
  toChainId: number;
  fromToken: string;
  toToken: string;
  fromAmount: BigNumber;
  toAmount: BigNumber;
  status: boolean;
  transactionHash?: string;
}

export interface XswapTransaction {
  transactionMemo: string;
  steps: TransactionStepPayload[];
  currentStep: number;
  account: string;
  bridgeCase: string;
}

export interface TransactionHistory {
  swaps: SwapTransaction[] | null | undefined;
  xswaps: XswapTransaction[] | null | undefined;
}

export enum TRANSACTION_ACTION {
  INSERT,
  UPDATE,
}
