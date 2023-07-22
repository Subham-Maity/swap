export enum XswapCases {
  SwapDepositSwap = '2OA67HS611', // when token not available on both chain
  Deposit = 'CFEE4UL9UX', // when token available on both chain
  SwapDeposit = 'AR25AOPQZ7', // when token not available on source chain, but available on destination chain
  DepositSwap = 'V3WGIZ5Y91', // when token availble on source chain, but not availble on destination chain
}

// swap and deposit action Id
export const FROM_CHAIN_SWAP_ACTION_ID = 'urFXoK100o';

// deposit action Id
export const DEPOSIT_ACTION_ID = 'txqrWu9oj9';

// to side swap action Id
export const TO_CHAIN_SWAP_ACTION_ID = 'ZfGteemf2A';
