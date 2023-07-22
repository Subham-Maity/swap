import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapTransaction, TransactionHistory, UpdatedSwapTransactionFields, XswapTransaction } from './types';

const initialState: TransactionHistory = {
  swaps: null,
  xswaps: null,
};

const transactionsSlice = createSlice({
  name: 'transactionHistory',
  initialState,
  reducers: {
    // add swap transaction
    addSwapTransaction(state, { payload }: PayloadAction<SwapTransaction>) {
      let swaps = state.swaps;
      swaps = swaps === null ? [] : swaps;
      swaps.push(payload);
      state.swaps = swaps;
      return state;
    },
    // change swap tx status
    changeSwapTxStatus(state, { payload }: PayloadAction<UpdatedSwapTransactionFields>) {
      let txIndex = state.swaps.findIndex((swap) => swap.txHash.toLowerCase() === payload.txHash.toLowerCase());
      // save the state
      state.swaps[txIndex].status = payload.txStatus;
      state.swaps[txIndex].gas = payload.gas;
      state.swaps[txIndex].gasPrice = payload.gasPrice;
      return state;
    },
    // add xswap transaction
    addXswapTransaction(state, { payload }: PayloadAction<XswapTransaction>) {
      let xswaps = state.xswaps;
      xswaps.push(payload);
      state.xswaps = xswaps;
      return state;
    },
    // transaction step updater
    updateXSwapTransactionStepStatus(
      state,
      { payload }: PayloadAction<{ transactionMemo: string; status: boolean; txhash: string }>,
    ) {
      let xswapsTransactions = state?.xswaps;
      let index = xswapsTransactions.findIndex(
        (el) => el?.transactionMemo?.toLowerCase() === payload?.transactionMemo?.toLowerCase(),
      );
      let isIndexUndefined = index === -1;
      if (!isIndexUndefined) {
        let xSwapCurrentStep = xswapsTransactions?.[index]?.currentStep;
        let nextStep = xSwapCurrentStep + 1;
        state.xswaps[index]['steps'][nextStep]['status'] = payload?.status;
        state.xswaps[index]['steps'][nextStep]['transactionHash'] = payload?.txhash;
        state.xswaps[index]['currentStep'] = nextStep;
      }
      return state;
    },
  },
});

export const { addSwapTransaction, addXswapTransaction, changeSwapTxStatus, updateXSwapTransactionStepStatus } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
