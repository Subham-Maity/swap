import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  slippage: number;
  deadLine: number;
  gasSpeedSelect: string;
  autoRouterAPI: boolean;
  appChainId: number;
}

const initialState: User = {
  slippage: 0.5,
  deadLine: 10,
  gasSpeedSelect: 'instant',
  autoRouterAPI: true,
  appChainId: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTransactionSetting(state, { payload }: PayloadAction<{ key: string; configDetail: string | number | boolean }>) {
      state[payload.key] = payload.configDetail;
      return state;
    },
    setAppChainId(state, { payload }: PayloadAction<number>) {
      state.appChainId = payload;
      return state;
    },
  },
});

export const { setTransactionSetting, setAppChainId } = userSlice.actions;

export default userSlice.reducer;
