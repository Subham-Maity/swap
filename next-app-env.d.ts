/// <reference types="next" />

export {};

declare global {
  interface Window {
    ethereum?: {
      request(arg0: { method: string; params: { chainId: string }[] }): unknown;
      isMetaMask?: boolean;
      isTrustWallet?: boolean;
    };
  }
}
