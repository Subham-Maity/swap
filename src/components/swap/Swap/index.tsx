import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { Box, Button, CircularProgress, Skeleton } from '@mui/material';
import CurrencyInput from './CurrencyInput';
import CurrencyOutput from './CurrencyOutput';
import SwapHeader from './SwapHeader';
import SwapRouter from './SwapRouter';
import { SWAP_VIEWS, useSwapView } from '../../../hooks/useSwapState';
import { useCurrencyModal } from 'hooks/useCurrencyModalState';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import TransactionSettings from './TransactionSettings';
import CurrencyModal from 'components/CurrencyModal';
import SwapConfirmModal from './SwapConfirmModal';
import { useSetSwapDefaultTokens, useSwapTokens } from 'store/swap/hooks';
import { ApprovalTransactionStatus, useApproval } from '../../../hooks/useApproval';
import { NATIVE_TOKEN_ADDRESS } from 'config';
import useTokenBalances from 'hooks/useTokenBalances';
import { useOpenSwapConfirmationModal, useOpenWalletModal } from 'store/app/hooks';
import useSwapQuotes from '../../../hooks/useSwapQuotes';
import { PLUG_ROUTER_CONTRACT_ADDRESSES } from 'config/contracts';
import { isEmpty } from 'lodash';
import useTokenPrices from 'hooks/useTokenPrices';
import { roundValue } from 'utils';
import { useAppChainId } from 'store/user/hooks';

const SwapModal = styled('div')({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  width: '97%',
  marginTop: '12%',
  transition: 'all 0.6s ease',
  paddingBottom: '10px',
});

const WrongBtn = styled(Button)({
  margin: 15,
  width: '90%',
  background: 'red',
  color: 'white',
  borderRadius: '12px',
  marginBottom: '10%',
  marginTop: '10%',
  textTransform: 'initial',
});

const SwapDiv = styled('div')({
  margin: '0px auto',
  maxWidth: '460px',
  '@media (max-width: 660px)': {
    marginBottom: '150px',
  },
});

const TransactionBox = styled('div')((props: { isMount: boolean }) => ({
  animation: props.isMount ? 'inAnimation 250ms ease-in' : 'outAnimation 270ms ease-out',
  animationFillMode: !props.isMount && 'forwards',
}));

const ApprovalButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })(
  (props: { active: boolean }) => ({
    marginLeft: '5%',
    marginRight: 15,
    marginTop: 15,
    width: '90%',
    background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
    color: 'white',
    borderRadius: '12px',
    textTransform: 'initial',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: '12px',
    height: '35px',
    opacity: props.active ? 1 : 0.4,
    cursor: props.active ? 'pointer' : 'not-allowed',
  }),
);

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'width' && prop !== 'active' })(
  (props: { width: string; active: boolean }) => ({
    margin: 15,
    width: props.width,
    background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
    color: 'white',
    borderRadius: '12px',
    marginBottom: '6%',
    marginTop: '5%',
    marginLeft: '5%',
    textTransform: 'initial',
    opacity: props.active ? 1 : 0.4,
    cursor: props.active ? 'pointer' : 'not-allowed',
    fontWeight: '800',
    height: '52px',
  }),
);

const Swap = () => {
  // set default tokens
  useSetSwapDefaultTokens();

  let { swapView, updateSwapViewCallback } = useSwapView();
  let { currencyModalCall, updateCurrencyModalCallCallback } = useCurrencyModal();
  let { account, active, error, chainId } = useWeb3React();
  let { fromToken, swapInputValue, toToken } = useSwapTokens();
  let [isSwitch, setIsSwitch] = React.useState(false);
  const appChainId = useAppChainId();

  const openWalletModal = useOpenWalletModal();
  const { quotes: swapQuotes, isLoading } = useSwapQuotes();

  const tokenPrices = useTokenPrices(appChainId);
  const [selectedAggregatorId, setSelectedAggregatorId] = React.useState<string>();

  let { approvalStatus, isApprovalRequired, triggeredApproval } = useApproval(
    PLUG_ROUTER_CONTRACT_ADDRESSES[chainId],
    fromToken?.address,
  );

  let balances = useTokenBalances(chainId);

  let fromTokenBalance = useMemo(() => {
    if (!balances) return null;
    return balances[fromToken?.address?.toLowerCase()];
  }, [balances, fromToken]);

  const openSwapConfirmModal = useOpenSwapConfirmationModal();

  const { fromTokenAmount, toTokenAmount } = React.useMemo(() => {
    if (isEmpty(fromToken) || isEmpty(toToken) || isEmpty(tokenPrices))
      return { fromTokenAmount: null, toTokenAmount: null };

    const tokenA = tokenPrices?.[fromToken?.address.toLowerCase()]?.usd;
    const tokenB = tokenPrices?.[toToken?.address.toLowerCase()]?.usd;

    if (!isSwitch) {
      return { fromTokenAmount: 1, toTokenAmount: tokenA / tokenB };
    } else {
      return { fromTokenAmount: 1, toTokenAmount: tokenB / tokenA };
    }
  }, [fromToken, toToken, tokenPrices, isSwitch]);

  const selectedQuote = React.useMemo(() => {
    if (isEmpty(swapQuotes)) return null;
    if (isEmpty(selectedAggregatorId)) return swapQuotes[0];
    const filterQuote = swapQuotes?.filter(
      (swapQuote) => swapQuote?.aggregatorId?.toLowerCase() === selectedAggregatorId.toLowerCase(),
    );
    return filterQuote[0];
  }, [swapQuotes, selectedAggregatorId]);

  // returns error message for swap input
  let errorMessage = useMemo(() => {
    // swap input value is empty
    if (!swapInputValue) {
      return 'Enter Amount';
    }

    // insufficient balance error
    else if (swapInputValue > fromTokenBalance && account && active) {
      return 'Insufficient balance';
    }

    // when there is no match results
    else if (!isEmpty(swapInputValue) && isEmpty(selectedQuote)) {
      return 'No matching results found';
    }

    // when there is no connection
    else if (typeof account === undefined || !active) {
      return 'Connect Wallet';
    }

    // for default
    else {
      return null;
    }
  }, [fromTokenBalance, swapInputValue, selectedQuote, account, active]);

  return (
    <SwapDiv>
      {swapView === SWAP_VIEWS.SWAP_SETTINGS ? (
        <TransactionSettings swapView={swapView} resetView={updateSwapViewCallback} />
      ) : swapView === SWAP_VIEWS.TOKENLIST_VIEW ? (
        <CurrencyModal
          swapView={swapView}
          chainId={appChainId}
          resetView={updateSwapViewCallback}
          currencyModalCall={currencyModalCall}
          fromToken={fromToken?.address}
          toToken={toToken?.address}
          isXswap={false}
        />
      ) : (
        swapView === SWAP_VIEWS.SWAP && (
          <TransactionBox isMount={swapView === SWAP_VIEWS.SWAP}>
            <SwapModal>
              <SwapHeader transactionSettingHandler={updateSwapViewCallback} />
              <CurrencyInput
                toggleCurrencyModal={updateSwapViewCallback}
                setCoinTarget={updateCurrencyModalCallCallback}
                Read={true}
              />
              <CurrencyOutput
                toggleCurrencyModal={updateSwapViewCallback}
                setCoinTarget={updateCurrencyModalCallCallback}
                Read={true}
                receivedToken={!swapInputValue ? 0 : selectedQuote?.formattedRecievedAmount}
              />

              {isLoading ? (
                <>
                  <Box pl={3} pr={3} pt={1}>
                    <Skeleton variant="rounded" height={92} sx={{ marginBottom: '8px' }} />
                  </Box>
                  <Box pl={3} pr={3}>
                    <Skeleton variant="rounded" height={92} />
                  </Box>
                </>
              ) : (
                <SwapRouter
                  liquiditySources={swapQuotes}
                  router={[]}
                  toTokenTicker={isSwitch ? fromToken?.symbol : toToken?.symbol}
                  fromTokenTicker={isSwitch ? toToken?.symbol : fromToken?.symbol}
                  changeSwitch={() => setIsSwitch(!isSwitch)}
                  fromTokenAmount={roundValue(fromTokenAmount, 3)}
                  toTokenAmount={roundValue(toTokenAmount, 3)}
                  setSelectedAggregatorId={setSelectedAggregatorId}
                  selectedAggregatorId={selectedAggregatorId}
                />
              )}

              {error instanceof UnsupportedChainIdError ? (
                <WrongBtn>Wrong Network</WrongBtn>
              ) : !errorMessage ? (
                isApprovalRequired && fromToken?.address?.toLowerCase() !== NATIVE_TOKEN_ADDRESS.toLowerCase() ? (
                  <>
                    <ApprovalButton onClick={() => triggeredApproval()} active={!errorMessage}>
                      {approvalStatus === ApprovalTransactionStatus.APPROVAL_LOADING ? (
                        <>
                          <CircularProgress style={{ color: '#fff' }} size={16} />
                          &nbsp; Approving
                        </>
                      ) : (
                        <>
                          Allow the Plug protocol to use your {fromToken?.symbol}
                          <img src="/images/icons/WhiteQue.png" alt="?" style={{ marginLeft: '8px' }} />
                        </>
                      )}
                    </ApprovalButton>
                  </>
                ) : (
                  <StyledButton width="90%" active={true} onClick={() => openSwapConfirmModal()}>
                    Swap
                  </StyledButton>
                )
              ) : (
                <StyledButton
                  width="90%"
                  active={!errorMessage || errorMessage === 'Connect Wallet'}
                  onClick={() => {
                    if (errorMessage === 'Connect Wallet') {
                      openWalletModal();
                    }
                  }}
                >
                  {errorMessage}
                </StyledButton>
              )}
            </SwapModal>
          </TransactionBox>
        )
      )}

      <SwapConfirmModal
        selectedQuote={selectedQuote}
        toTokenTicker={isSwitch ? fromToken?.symbol : toToken?.symbol}
        fromTokenTicker={isSwitch ? toToken?.symbol : fromToken?.symbol}
        changeSwitch={() => setIsSwitch(!isSwitch)}
        fromTokenAmount={roundValue(fromTokenAmount, 3)}
        toTokenAmount={roundValue(toTokenAmount, 3)}
      />

      {/* <Resetmorediv>
        <ReferralModal />
      </Resetmorediv> */}
    </SwapDiv>
  );
};

export default Swap;
