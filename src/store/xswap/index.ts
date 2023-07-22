import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../tokens';

export interface XSwap {
  fromChainId: number;
  toChainId: number;
  fromToken: Token;
  toToken: Token;
  xSwapInputValue: number;
}

const initialXSwapState: XSwap = {
  fromChainId: 1,
  toChainId: 56,
  fromToken: null,
  toToken: null,
  xSwapInputValue: null,
};

const xswapSlice = createSlice({
  name: 'xswap',
  initialState: initialXSwapState,
  reducers: {
    setXSwapToken: (state, { payload }: PayloadAction<{ key: string; token: Token }>) => {
      let { key, token } = payload;
      state[key] = token;
      return state;
    },
    switchXSwapChain: (state) => {
      let fromToken = state.fromToken;
      let fromChain = state.fromChainId;

      // set inverse
      state.fromToken = state.toToken;
      state.toToken = fromToken;
      state.fromChainId = state.toChainId;
      state.toChainId = fromChain;
      return state;
    },
    setXSwapChainId: (state, { payload }: PayloadAction<{ key: string; chainId: number }>) => {
      let { key, chainId } = payload;
      state[key] = chainId;
      state[key === 'fromChainId' ? 'fromToken' : 'toToken'] = null;
      return state;
    },
    setXSwapInputValue: (state, { payload }: PayloadAction<{ value: number }>) => {
      state.xSwapInputValue = payload.value;
      return state;
    },
  },
});

export const { setXSwapToken, setXSwapChainId, setXSwapInputValue, switchXSwapChain } = xswapSlice.actions;

export default xswapSlice.reducer;
