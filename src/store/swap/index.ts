import { Token } from './../tokens/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SwapState {
  fromToken: Token;
  toToken: Token;
  swapInputValue: number;
}

const initialSwapState: SwapState = {
  fromToken: null,
  toToken: null,
  swapInputValue: null,
};

const swapSlice = createSlice({
  name: 'swap',
  initialState: initialSwapState,
  reducers: {
    setSwapTokens(state, { payload }: PayloadAction<{ key: string; token: Token }>) {
      let { key, token } = payload;
      state[key] = token;
      return state;
    },
    switchSwapTokens(state) {
      let fromToken = state.fromToken;

      // set inverse
      state.fromToken = state.toToken;
      state.toToken = fromToken;
      return state;
    },
    setSwapInputValue(state, { payload }: PayloadAction<number>) {
      state.swapInputValue = payload;
      return state;
    },
  },
});

export const { setSwapTokens, switchSwapTokens, setSwapInputValue } = swapSlice.actions;
export default swapSlice.reducer;
