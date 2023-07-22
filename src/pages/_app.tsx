import React from 'react';
import { Provider } from 'react-redux';
import './app.css';
import type { AppProps } from 'next/app';
import WalletModal from '../components/WalletModal';
import AppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import GlobalStyles from '../theme/globalStyles';
import ThemeConfig from '../theme';
import createEmotionCache from 'createEmotionCache';
import { CacheProvider } from '@emotion/react';
import 'nprogress/nprogress.css';
import dynamic from 'next/dynamic';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import WalletManager from '../components/WalletManager';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';
import AppChainIdError from '../components/AppChainIdError';
import store, { persistor } from 'store';
import { Container } from '@mui/system';

const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar');
  },
  { ssr: false },
);

// client side emotion cache
const clientSideEmotionCache = createEmotionCache();

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  return new Web3Provider(provider);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function MyApp({ Component, emotionCache = clientSideEmotionCache, ...pageProps }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeConfig>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SWRConfig value={{ provider: () => new Map() }}>
              <Web3ReactProvider getLibrary={getLibrary}>
                <WalletManager />
                <TopProgressBar />
                <GlobalStyles />
                <AppBar />
                <AppChainIdError />
                <Container>
                  <Component {...pageProps} />
                </Container>
                <AppFooter type="Window" />
                <WalletModal />
              </Web3ReactProvider>
            </SWRConfig>
          </PersistGate>
        </Provider>
      </ThemeConfig>
    </CacheProvider>
  );
}

export default MyApp;
