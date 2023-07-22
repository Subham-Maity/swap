import { styled } from '@mui/system';
import { Container, Grid } from '@mui/material';
import PairLineChart from '../../components/swap/PairLineChart';
import QuoteTables from '../../components/swap/QuoteTable';
import SwapComponent from '../../components/swap/Swap';
import { useMediaQuery } from '@material-ui/core';

const MainDiv = styled(Container)({
  // marginLeft: '3%',
  // marginRight: '3%',
  // marginTop: '4%',
  margin:'auto',
  '@media (max-width: 660px)': {
    marginLeft: '3%',
    marginRight: '0%',
  },
});

const ChartDiv = styled('div')({
  margin: '0px auto',
  maxWidth: '680px',
});

const Quotadiv = styled('div')({
  marginTop: '15%',
});

const Swap = () => {
  const isDesktop = useMediaQuery('(min-width:660px)');
  return (
    <>
      <MainDiv>
        <Grid container spacing={isDesktop ? 5 : 0}>
          <Grid item sm={7}>
            <ChartDiv>
              <PairLineChart
                inputCurrency={null}
                outputCurrency={null}
                switchCurrencyHandler={() => null}
                currencyPriceInUSD={null}
                currencyPriceChangeInUSD={null}
                currencyPriceChangePercentage={null}
                pairOhlcData={null}
                currentInterval={null}
                intervalHandler={() => null}
              />
              {/* <Quotadiv>
                <QuoteTables quotes={null} allowedSlippage={null} lastRefresh={null} userSelectedGasPrice={null} />
              </Quotadiv> */}
            </ChartDiv>
          </Grid>
          <Grid item sm={5}>
            <SwapComponent />
          </Grid>
        </Grid>
      </MainDiv>
    </>
  );
};

export default Swap;
