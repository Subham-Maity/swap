import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

export interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extensions?: any;
}

export interface Tokenlist {
  tokens: Token[];
  importedTokens: Token[];
}

export interface BalanceOfMap {
  [tokenAddress: string]: BigNumber;
}

let initialState: Tokenlist = {
  tokens: [],
  importedTokens: [],
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(state, { payload }: PayloadAction<Token[]>) {
      // set tokens
      state.tokens = payload;
      return state;
    },
    importToken(state, { payload }: PayloadAction<Token>) {
      state.importedTokens.push(payload);
      return state;
    },
  },
});

export const { setTokens, importToken } = tokensSlice.actions;

export default tokensSlice.reducer;
