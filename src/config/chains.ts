// types

import { Token } from 'store/tokens';

export interface NativeCurrencyInfo extends Token {
  coingeckoId?: string;
  assetPlatform?: string;
}

export type Chain = {
  /** name */
  name: string;
  /** icon */
  icon: string;
  /** rpc url */
  rpc_url: string | undefined;
  /** native currency */
  nativeCurrency?: string;
  /** chain exploler */
  exploler?: string;
  /** mutli call address */
  multicallAddress: string;
  /** native currency info */
  nativeCurrencyInfo: NativeCurrencyInfo;
  /** default selected tokens */
  defaultSelectedTokens: string[];
  /** exclude */
  exclude?: boolean;
};

export type ChainInfo = {
  [chainId: number]: Chain;
};

export enum SUPPORTED_CHAIN_IDS {
  Mainnet = 1,
  Goerli = 5,
  Binance = 56,
  Polygon = 137,
  Avalanche = 43114,
  Fantom = 250,
  Arbitrum = 42161,
  Optimism = 10,
}

export const CHAINS: ChainInfo = {
  [SUPPORTED_CHAIN_IDS.Mainnet]: {
    name: 'Ethereum',
    icon: '/images/chains/ethereum.png',
    rpc_url: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
    nativeCurrency: 'ETH',
    exploler: 'https://etherscan.io/',
    multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    nativeCurrencyInfo: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/tokens/ethereum.png',
      chainId: 1,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
      assetPlatform: 'ethereum',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xdAC17F958D2ee523a2206206994597C13D831ec7'],
  },
  [SUPPORTED_CHAIN_IDS.Goerli]: {
    name: 'Ethereum Goerli',
    icon: '/images/chains/ethereum.png',
    rpc_url: process.env.NEXT_PUBLIC_GOERLI_RPC_URL,
    nativeCurrency: 'Goerli ETH',
    exploler: 'https://goerli.etherscan.io/',
    exclude: true,
    multicallAddress: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    nativeCurrencyInfo: {
      name: 'Goerli Ethereum',
      symbol: 'GOERLI ETH',
      decimals: 18,
      logoURI: '/images/tokens/ethereum.png',
      chainId: 5,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
      assetPlatform: 'ethereum',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xdAC17F958D2ee523a2206206994597C13D831ec7'],
  },
  [SUPPORTED_CHAIN_IDS.Binance]: {
    name: 'BSC',
    icon: '/images/chains/smartchain.png',
    rpc_url: process.env.NEXT_PUBLIC_BSC_RPC_URL,
    nativeCurrency: 'BSC',
    exploler: 'https://bscscan.com/',
    multicallAddress: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    nativeCurrencyInfo: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
      logoURI: '/images/tokens/bnb.png',
      chainId: 56,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'binancecoin',
      assetPlatform: 'binance-smart-chain',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'],
  },
  [SUPPORTED_CHAIN_IDS.Polygon]: {
    name: 'Polygon',
    icon: '/images/chains/polygon.png',
    rpc_url: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
    nativeCurrency: 'MATIC',
    exploler: 'https://polygonscan.com/',
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    nativeCurrencyInfo: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
      logoURI: '/images/tokens/polygon.png',
      chainId: 137,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'matic-network',
      assetPlatform: 'polygon-pos',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'],
  },
  [SUPPORTED_CHAIN_IDS.Avalanche]: {
    name: 'Avalanche',
    icon: '/images/chains/avalanche.png',
    rpc_url: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL,
    nativeCurrency: 'AVAX',
    exploler: 'https://snowtrace.io/',
    multicallAddress: '0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4',
    nativeCurrencyInfo: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      logoURI: '/images/tokens/avax.png',
      chainId: 43114,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'avalanche-2',
      assetPlatform: 'avalanche',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'],
  },
  [SUPPORTED_CHAIN_IDS.Fantom]: {
    name: 'Fantom',
    icon: '/images/chains/fantom.png',
    rpc_url: process.env.NEXT_PUBLIC_FANTOM_RPC_URL,
    nativeCurrency: 'FTM',
    exploler: 'https://ftmscan.com/',
    multicallAddress: '0xb828C456600857abd4ed6C32FAcc607bD0464F4F',
    nativeCurrencyInfo: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
      logoURI: '/images/tokens/fantom.png',
      chainId: 250,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'fantom',
      assetPlatform: 'fantom',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E'],
  },
  [SUPPORTED_CHAIN_IDS.Optimism]: {
    name: 'Optimism',
    icon: '/images/chains/optimism.png',
    rpc_url: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
    nativeCurrency: 'OP',
    exploler: 'https://optimistic.etherscan.io/',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    nativeCurrencyInfo: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/tokens/ethereum.png',
      chainId: 10,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
      assetPlatform: 'optimism',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58'],
  },
  [SUPPORTED_CHAIN_IDS.Arbitrum]: {
    name: 'Arbitrum',
    icon: '/images/chains/arbitrum.png',
    rpc_url: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
    nativeCurrency: 'ETH',
    exploler: 'https://arbiscan.io/',
    multicallAddress: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
    nativeCurrencyInfo: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/tokens/ethereum.png',
      chainId: 42161,
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
      assetPlatform: 'arbitrum-one',
    },
    defaultSelectedTokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'],
  },
};

interface ChainConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls: string[];
}

export const chainConfig: { [chainId: number]: ChainConfig[] } = {
  [SUPPORTED_CHAIN_IDS.Binance]: [
    {
      chainId: '0x38',
      chainName: 'Binance Smart Chain (Mainnet)',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Binance].rpc_url],
      blockExplorerUrls: ['https://bscscan.com/'],
      iconUrls: ['/images/chains/ethereum.png'],
    },
  ],
  [SUPPORTED_CHAIN_IDS.Polygon]: [
    {
      chainId: '0x89',
      chainName: 'POLYGON Mainnet',
      nativeCurrency: {
        name: 'MATIC TOKEN',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Polygon].rpc_url],
      blockExplorerUrls: ['https://polygonscan.com/'],
      iconUrls: ['/images/chains/polygon.png'],
    },
  ],
  [SUPPORTED_CHAIN_IDS.Fantom]: [
    {
      chainId: '0xFA',
      chainName: 'Fantom Mainnet',
      nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Fantom].rpc_url],
      blockExplorerUrls: ['https://ftmscan.com/'],
      iconUrls: ['/images/chains/fantom.png'],
    },
  ],
  [SUPPORTED_CHAIN_IDS.Arbitrum]: [
    {
      chainId: '0xA4B1',
      chainName: 'Arbitrum Mainnet',
      nativeCurrency: {
        name: 'Arb Ethereum',
        symbol: 'aETH',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Arbitrum].rpc_url],
      blockExplorerUrls: ['https://arbiscan.io/'],
      iconUrls: ['/images/chains/arbitrum.png'],
    },
  ],
  [SUPPORTED_CHAIN_IDS.Optimism]: [
    {
      chainId: '0xA',
      chainName: 'Optimism Mainnet',
      nativeCurrency: {
        name: 'Optimism',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Optimism].rpc_url],
      blockExplorerUrls: ['https://optimistic.etherscan.io/'],
      iconUrls: ['/images/chains/optimism.png'],
    },
  ],
  [SUPPORTED_CHAIN_IDS.Avalanche]: [
    {
      chainId: '0xA86A',
      chainName: 'Avalanche Mainnet C-Chain',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: [CHAINS[SUPPORTED_CHAIN_IDS.Avalanche].rpc_url],
      blockExplorerUrls: ['https://snowtrace.io/'],
      iconUrls: ['/images/chains/avalanche.png'],
    },
  ],
};
