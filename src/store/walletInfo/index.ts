import { BigNumber } from 'ethers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Token balances */
export interface Balance {
  /** Token address to balances */
  [tokenAddress: string]: BigNumber;
}

export interface WalletInfo {
  /** The ens name */
  ensName: string | null;
  /** native token balance */
  nativeTokenBalance: BigNumber | null;
  /** token balances */
  tokenBalances: Balance | null;
}

const initialState: WalletInfo = {
  ensName: null,
  nativeTokenBalance: null,
  tokenBalances: null,
};

const walletInfoSlice = createSlice({
  name: 'walletInfoSlice',
  initialState,
  reducers: {
    updateNativeBalance(state, { payload }: PayloadAction<BigNumber>) {
      state.nativeTokenBalance = payload;
      return state;
    },
  },
});

export const { updateNativeBalance } = walletInfoSlice.actions;

export default walletInfoSlice.reducer;
