import { styled } from '@mui/system';
import React, { useMemo, useState } from 'react';
// import Modal from '../Modal';
// import ContinuewithWallets from './CrosschainWallets/CrosschainWallets';
// import Converting from './Converting/Converting';
import { Grid, useMediaQuery } from '@mui/material';
import { SWAP_VIEWS, useSwapView } from '../../hooks/useSwapState';
import TransactionSettings from '../swap/Swap/TransactionSettings';
import CurrencyModal from '../CurrencyModal';
import { CURRENCY_MODAL_CALLS, useCurrencyModal } from '../../hooks/useCurrencyModalState';
import MoveToken from './MoveToken';
import SwapBox from './SwapBox';
import CrosschainTransactionDetails from './CrosschainTransactionDetails';
import NotFoundRoute from './NotFoundRoute';
import { ThemeProps } from 'theme';
import { useXSwapState } from 'store/xswap/hook';
import useXswapQuotes, { useFormulateXswapQuotes } from '../../hooks/useXswapQuotes';
import { useUserTransactionSetting } from '../../store/user/hooks';
import { parseCurrency } from 'utils/units';
import { isEmpty, orderBy } from 'lodash';
import Quotes from './Quotes';

const LeftWrapper = styled('div')({
  backgroundColor: '#FFFFFF',
  maxWidth: 457,
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  width: '80%',
  margin: 'auto',
  borderRadius: 24,
  marginTop: '20%',
  '@media (max-width: 660px)': {
    width: '100%',
  },
});

const RightWrapper = styled('div')({
  backgroundColor: '#FFFFFF',
  maxWidth: 713,
  margin: 'auto',
  marginTop: '17%',
});

const RefreshDiv = styled('div')({
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '24px 30px',
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
});

const RefreshText = styled('div')({
  opacity: 0.65,
});

const RightBox = styled(Grid)((props: { theme?: ThemeProps }) => ({
  [props.theme.breakpoints.down('md')]: {
    margin: 'auto',
  },
}));

const Crosschain = () => {
  let { swapView, updateSwapViewCallback } = useSwapView();
  let { currencyModalCall, updateCurrencyModalCallCallback } = useCurrencyModal();
  let [isMoveOpen, setIsMoveOpen] = useState<boolean>(false);

  const isDesktop = useMediaQuery('(min-width:660px)');

  const moveOpenhandler = () => {
    setIsMoveOpen(!isMoveOpen);
  };

  const { fromToken, toToken, fromChainId, toChainId, xSwapInputValue } = useXSwapState();
  const { slippage, deadLine, gasSpeedSelect } = useUserTransactionSetting();
  const [selectedBridgeName, setSelectedBridgeName] = React.useState<string>();

  const showRoutes = useMemo(() => {
    return !(
      isEmpty(fromToken) &&
      isEmpty(toToken) &&
      isEmpty(fromChainId) &&
      isEmpty(toChainId) &&
      isEmpty(xSwapInputValue)
    );
  }, [fromChainId, toChainId, fromToken, toToken, xSwapInputValue]);

  const xswapQuotesData = useXswapQuotes({
    fromChainId,
    toChainId,
    fromTokenAddress: fromToken?.address,
    toTokenAddress: toToken?.address,
    slippageTolerance: slippage,
    deadline: parseInt((new Date().getTime() / 1000).toFixed(0)) + deadLine * 60,
    amount: parseCurrency(xSwapInputValue, fromToken?.decimals)?.toString(),
  });

  const xSwapQuote = useFormulateXswapQuotes(xswapQuotesData?.quotes, gasSpeedSelect);

  const sortedQuotes = orderBy(xSwapQuote, ['toAmount'], ['desc']);

  const selectedXSwap = useMemo(() => {
    if (isEmpty(sortedQuotes)) return null;
    if (isEmpty(selectedBridgeName)) return sortedQuotes[0];
    const filterQuote = sortedQuotes?.filter(
      (quote) => quote?.bridgeName?.toLowerCase() === selectedBridgeName?.toLowerCase(),
    );
    return filterQuote[0];
  }, [sortedQuotes, selectedBridgeName]);

  return (
    <>
      {/* <MainDiv> */}
      <Grid container spacing={isDesktop ? 3 : 0}>
        <Grid item sm={12} md={5} margin="auto">
          <LeftWrapper>
            {swapView === SWAP_VIEWS.SWAP_SETTINGS ? (
              <TransactionSettings swapView={swapView} resetView={updateSwapViewCallback} />
            ) : swapView === SWAP_VIEWS.TOKENLIST_VIEW ? (
              <CurrencyModal
                swapView={swapView}
                fromToken={fromToken?.address}
                toToken={toToken?.address}
                resetView={updateSwapViewCallback}
                currencyModalCall={currencyModalCall}
                isXswap={true}
                chainId={currencyModalCall === CURRENCY_MODAL_CALLS.SEND_COIN ? fromChainId : toChainId}
              />
            ) : (
              swapView === SWAP_VIEWS.SWAP && (
                <>
                  <SwapBox
                    resetView={updateSwapViewCallback}
                    coinTarget={updateCurrencyModalCallCallback}
                    fromToken={fromToken}
                    toToken={toToken}
                    selectedQuote={selectedXSwap}
                    moveScreenHandler={moveOpenhandler}
                  />
                </>
              )
            )}
          </LeftWrapper>
          <CrosschainTransactionDetails resetView={updateSwapViewCallback} selectedQuoteDeatails={selectedXSwap} />
        </Grid>
        <RightBox item sm={12} md={6}>
          <RightWrapper>
            {showRoutes === false ? (
              <div>
                <RefreshDiv>
                  {/* <ImgDiv>
                  <img src="images/icons/refreshLine1.png" alt="refreshLine" />
                   </ImgDiv> */}
                  <RefreshText>Please select the tokens and amount for your desired transfer.</RefreshText>
                </RefreshDiv>
              </div>
            ) : showRoutes && isEmpty(sortedQuotes) === false ? (
              <>
                <Quotes
                  refreshQuoteHandler={() => null}
                  quotes={sortedQuotes}
                  selectQuoteHandler={(data: string) => setSelectedBridgeName(data)}
                />
              </>
            ) : (
              <NotFoundRoute />
            )}
          </RightWrapper>
        </RightBox>
      </Grid>
      {/* </MainDiv> */}
      <MoveToken isMoveOpen={isMoveOpen} moveOpenHandler={() => moveOpenhandler()} selectedQuote={selectedXSwap} />
      {/* <Modal
        modalTitle=""
        isOpen={ContinueModalOpen}
        close={() => {
          setContinueModalOpen(false);
        }}
      >
        <Boxs>
          <ContinuewithWallets
            close={() => {
              setContinueModalOpen(false);
            }}
          />
        </Boxs>
      </Modal>
      <Modal
        modalTitle=""
        isOpen={HighSlippageModalopen}
        close={() => {
          closeHighSlippageModel();
        }}
      >
        <Boxs>
          <Converting
            close={() => {
              closeHighSlippageModel();
            }}
          />
        </Boxs>
      </Modal> */}
    </>
  );
};

export default Crosschain;
