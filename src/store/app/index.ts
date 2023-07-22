import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ModalType {
  WALLET_MODAL,
  SWAP_CONFIRMATION_MODAL,
}

export interface App {
  modal: ModalType | null;
  blockNumber: number;
}

const initialAppState: App = {
  modal: null,
  blockNumber: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    toggleModal(state, { payload }: PayloadAction<ModalType | null>) {
      state.modal = payload;
      return state;
    },

    updateBlockNumber(state, { payload }: PayloadAction<number>) {
      state.blockNumber = payload;
      return state;
    },
  },
});

// reterive actions
export const { toggleModal, updateBlockNumber } = appSlice.actions;

export default appSlice.reducer;
