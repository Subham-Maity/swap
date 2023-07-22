import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Grid } from '@mui/material';
import { ThemeProps } from 'theme';
import { Quote } from 'hooks/useXswapQuotes';
import { CHAINS } from 'config/chains';
import { roundValue } from 'utils';

const ActionWrapper = styled(Box)((props: { theme?: ThemeProps }) => ({
  backgroundColor: '#FFFFFF',
  margin: 'auto',
  marginTop: 30,
  position: 'relative',
  flex: 'none',
  alignSelf: 'stretch',
  flexGrow: 1,
  maxWidth: 713,
  minHeight: 202,
  padding: '30px',
  border: '1px solid #E5E5E5',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  borderRadius: 24,
  [props.theme.breakpoints.down('md')]: {
    padding: '10px',
  },
}));

const ActionTabs = styled('div')({
  display: 'flex',
});

const ActionTab = styled('div')((props: { theme?: ThemeProps }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.01em',
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 12,
  marginRight: 8,
  padding: '6px 12px',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 10,
    padding: '3px 10px',
  },
}));

const ActionRefreshTab = styled('div')({
  backgroundColor: 'white',
  width: 'fit-content',
  borderRadius: 100,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.01em',
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 12,
  padding: '6px 12px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
});

const QuestionIcon = styled('img')((props: { theme?: ThemeProps }) => ({
  height: 15,
  width: 15,
  marginLeft: 5,
  marginRight: 5,
  opacity: '0.35',
  [props.theme.breakpoints.down('md')]: {
    height: 13,
    width: 13,
  },
}));

const MoreOption = styled('img')({
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 100,
  margin: 'auto',
  marginTop: '-23px',
  cursor: 'pointer',
  zIndex: 20,
  position: 'relative',
  border: '2px solid #bd58e5',
});

const FirstBox = styled(Box)(({ theme }) => ({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: 16,
  display: 'flex',
  padding: '18px 16px',
  [theme.breakpoints.down('md')]: {
    border: 'none',
    padding: '12px 6px',
  },
}));

const ActionTitle = styled('span')(({ theme }) => ({
  fontWeight: '600',
  opacity: 0.65,
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));

const ActionSubTitle = styled('p')({
  fontWeight: '500',
  opacity: 0.65,
  fontSize: 14,
});

const BridgeStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.01em',
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 12,
  padding: '6px 12px',
  minWidth: 140,
  position: 'relative',
  height: 'fit-content',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    minWidth: 40,
    backgroundColor: 'transparent',
    padding: '6px 10px',
  },
}));

const BridgeImg = styled('img')(({ theme }) => ({
  height: '28px',
  width: '28px',
  marginRight: '8px',
  [theme.breakpoints.down('md')]: {
    height: '20px',
    width: '20px',
    marginRight: '0px',
  },
}));

const Img = styled('img')({
  height: '36px',
  width: '36px',
});

const DottedBorder = styled('div')(({ theme }) => ({
  minWidth: 27,
  width: '100%',
  borderTop: '1px dotted #c669d2',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    minWidth: 19,
  },
}));

const BridgeQuestionIcon = styled('img')(({ theme }) => ({
  height: 15,
  width: 15,
  marginLeft: 5,
  marginRight: 5,
  opacity: '0.35',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Text = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

interface QuotesProps {
  refreshQuoteHandler: () => void;
  quotes: Quote[];
  selectQuoteHandler: (bridgeName: string) => void;
}

const Quotes = ({ refreshQuoteHandler, quotes, selectQuoteHandler }: QuotesProps) => {
  const [moreRoute, setMoreRoute] = useState(1);

  return (
    <>
      <Box mb={12}>
        <ActionRefreshTab onClick={() => refreshQuoteHandler()}>
          <QuestionIcon src="/images/icons/refresh.png" alt="QuestionIcon" />
          Refreshed routes in ~57s
        </ActionRefreshTab>
        {quotes?.map((quote, i) => {
          return (
            moreRoute > i && (
              <ActionWrapper key={i} onClick={() => selectQuoteHandler(quote?.bridgeName)}>
                <ActionTabs>
                  <ActionTab>
                    <span>{quote?.actionCounts} User Action</span>
                    <QuestionIcon src="/images/image/puestion.svg" alt="QuestionIcon" />
                  </ActionTab>
                  <ActionTab>
                    ${quote?.gasUSD} Gas Fee
                    <QuestionIcon src="/images/image/puestion.svg" alt="QuestionIcon" />
                  </ActionTab>
                  <ActionTab>
                    ~{roundValue(quote?.estimatedTime, 2)}m
                    <QuestionIcon src="/images/image/puestion.svg" alt="QuestionIcon" />
                  </ActionTab>
                </ActionTabs>

                <Box mt={4} display="flex" alignItems={'center'} position={'relative'}>
                  <Grid container>
                    <Grid md={4} sm={12} item>
                      <FirstBox sx={{ float: 'right' }}>
                        <Img src={quote?.fromToken?.logoURI ?? 'images/icons/defaultTokenIcon.png'} alt="Coin" />
                        <Box ml={2}>
                          <ActionTitle>
                            {quote?.fromAmount} {quote?.fromToken?.symbol}
                          </ActionTitle>
                          <ActionSubTitle>on {CHAINS[quote?.fromChainId]?.name}</ActionSubTitle>
                        </Box>
                      </FirstBox>
                    </Grid>
                    <Grid md={4} sm={12} item display="flex">
                      <DottedBorder />
                      <BridgeStyle>
                        <BridgeImg src={quote?.bridgeLogo} alt="Coin" />
                        <BridgeQuestionIcon src="/images/image/transfer.png" alt="QuestionIcon" />
                        <Text>{quote?.bridgeName}</Text>
                      </BridgeStyle>
                      <DottedBorder />
                    </Grid>
                    <Grid md={4} sm={12} item>
                      <FirstBox>
                        <Img src={quote?.toToken?.logoURI ?? 'images/icons/defaultTokenIcon.png'} alt="Coin" />
                        <Box ml={2}>
                          <ActionTitle>
                            {quote?.toAmount} {quote?.toToken?.symbol}
                          </ActionTitle>
                          <ActionSubTitle>on {CHAINS[quote?.toChainId]?.name}</ActionSubTitle>
                        </Box>
                      </FirstBox>
                    </Grid>
                  </Grid>
                </Box>
              </ActionWrapper>
            )
          );
        })}

        <MoreOption
          src="/images/icons/down.png"
          alt="Icon"
          onClick={
            quotes?.length > moreRoute
              ? () => {
                  setMoreRoute(moreRoute + 2);
                }
              : () => {
                  setMoreRoute(1);
                }
          }
        />
      </Box>
    </>
  );
};
export default Quotes;
