import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, walletConnect, binanceWallet, coinbase, fortmatic, mew } from '../connectors';

export const getWalletInfo = (connector: AbstractConnector | undefined): [string, string] => {
  if (connector === injected && !window.ethereum?.isMetaMask) {
    return ['Injected', ''];
  }
  // metamask
  else if (connector === injected && window.ethereum?.isMetaMask) {
    return ['Metamask', '/images/wallets/metamask.png'];
  }
  // wallet connect
  else if (connector === walletConnect) {
    return ['Wallet Connect', '/images/wallets/walletconnect.png'];
  }
  // binance wallet
  else if (connector === binanceWallet) {
    return ['Binance Wallet', '/images/wallets/bsc.png'];
  }
  // coinbase
  else if (connector === coinbase) {
    return ['Coinbase', '/images/wallets/coinbase.png'];
  }
  // fortmatic
  else if (connector === fortmatic) {
    return ['Fortmatic', '/images/wallets/fortmatic.png'];
  }
  // mew
  else if (connector === mew) {
    return ['My Ether Wallet', '/images/wallets/mew.png'];
  }
  // other connector
  else {
    return ['', ''];
  }
};

export const sortAccount = (account: string, chars = 4): string => {
  if (!account) return null;
  return `${account.substring(0, chars + 2)}...${account.substring(42 - chars)}`;
};
