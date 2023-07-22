import { styled } from '@mui/system';
import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import * as echarts from 'echarts';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import { Token } from 'store/tokens';
import { roundValue, sliceString } from 'utils';
import { useSwapTokens } from 'store/swap/hooks';
import { useOHLC } from 'hooks/useOHLC';
import useTokenPrices from 'hooks/useTokenPrices';
import { isEmpty } from 'lodash';
import { useAppChainId } from 'store/user/hooks';

const CurrencyTitle = styled(Typography)({
  fontWeight: '600',
  display: 'flex',
  marginTop: '10%',
  marginBottom: '1%',
});
const CurrencySubName = styled(Typography)({
  fontWeight: '600',
  paddingLeft: 5,
  color: '#999999',
  fontSize: '1.25rem',
});
const CurrencyTotalPrice = styled('h1')(() => ({
  fontSize: '36px',
  fontWeight: '600',
  color: 'black',
}));

const Btn = styled('div')({
  marginTop: 5,
});

const PairLineChartMain = styled('div')({
  display: 'block',
  '@media (max-width: 660px)': {
    display: 'none',
  },
});

const PairLineChartData = styled('div')({
  width: '100%',
  marginTop: '10%',
});

const TabButton = styled(Tab, { shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'theme' })(
  (props: { isactive: boolean; theme?: ThemeProps }) => ({
    borderRadius: '100px',
    fontWeight: '500',
    fontStyle: 'normal',
    textTransform: 'lowercase',
    minHeight: '30px',
    height: '36px',
    maxWidth: '9px',
    minWidth: '65px',
    // width: '65px',
    background: props.isactive && props.theme ? props.theme.palette.color.active : '',
    color: props.isactive ? 'white!important' : '',
  }),
);

const TabBar = styled(Tabs)({
  marginLeft: '71%',
  backgroundColor: '#f7f7f7',
  borderRadius: '100px',
  minHeight: 36,
  width: '197px',
  marginTop: 25,
  '@media (max-width: 660px)': {
    marginLeft: '20%',
  },
});

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(i: number) {
  return {
    id: `simple-tab-${i}`,
    'aria-controls': `simple-tabpanel-${i}`,
  };
}

type PairLineChartProps = {
  inputCurrency: Token | null;
  outputCurrency: Token | null;
  switchCurrencyHandler: () => void | null;
  currencyPriceInUSD: string | null;
  currencyPriceChangeInUSD: string | null;
  currencyPriceChangePercentage: string | null;
  pairOhlcData: null;
  currentInterval: number | null;
  intervalHandler: () => void | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PairLineChart = (_props: PairLineChartProps) => {
  let Values = [1, 7, 30];
  const [value, setValue] = React.useState(0);
  const [isSwitch, setSwitch] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let appChainId = useAppChainId();
  let tokenPrices = useTokenPrices(appChainId);
  let { fromToken, toToken } = useSwapTokens();

  let senderToken = React.useMemo(() => {
    return isSwitch ? toToken : fromToken;
  }, [isSwitch, fromToken, toToken]);

  let recieverToken = React.useMemo(() => {
    return isSwitch ? fromToken : toToken;
  }, [isSwitch, toToken, fromToken]);

  const handleSwitch = () => {
    setSwitch(!isSwitch);
  };

  let quotedPrice = useMemo(() => {
    if (isEmpty(fromToken) || isEmpty(toToken) || isEmpty(tokenPrices)) return null;
    let receiveTokenPrice = tokenPrices?.[toToken?.address.toLowerCase()]?.usd;
    if (receiveTokenPrice > 0) {
      return tokenPrices?.[fromToken.address.toLowerCase()]?.usd / receiveTokenPrice;
    } else {
      return 0;
    }
  }, [fromToken, toToken, tokenPrices]);

  const [, xAxisData, comparativePrices] = useOHLC(
    fromToken?.address?.toLowerCase(),
    toToken?.address?.toLowerCase(),
    Values[value],
    appChainId,
  );

  return (
    <PairLineChartMain>
      <>
        <CurrencyTitle variant="h5">
          {sliceString(senderToken?.name, 10)}
          <CurrencySubName>({sliceString(senderToken?.symbol, 5)})</CurrencySubName>
          <Btn>
            <IconGlobalStyleComponent
              onClick={() => handleSwitch()}
              ml={10}
              mr={10}
              height={20}
              width={20}
              img="/images/icons/shortVartical.png"
              opecity={1}
            />
          </Btn>
          {sliceString(recieverToken?.name, 10)}
          <CurrencySubName>({sliceString(recieverToken?.symbol, 5)})</CurrencySubName>
        </CurrencyTitle>
        <CurrencyTotalPrice>
          {!quotedPrice ? 'No Data Found' : roundValue(quotedPrice, 6) + ' ' + toToken?.symbol}
        </CurrencyTotalPrice>
        <PairLineChartData>
          <Box sx={{ width: '100%' }}>
            {xAxisData && xAxisData.length !== 0 && comparativePrices.length !== 0 ? (
              <TabPanel value={value} index={value}>
                <ReactEcharts
                  option={{
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'cross',
                        label: {
                          backgroundColor: '#BB36FF',
                        },
                      },
                    },
                    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                    grid: {
                      left: '0%',
                      right: '0%',
                      bottom: '0%',
                      top: 0,
                      containLabel: false,
                    },
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: false,
                        show: false,
                        data: xAxisData,
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        show: false,
                      },
                    ],
                    series: [
                      {
                        name: `${fromToken?.name}`,
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                          width: 2,
                          color: '#BB36FF',
                          shadowBlur: 15,
                          shadowOffsetX: 7,
                        },
                        showSymbol: false,
                        symbolSize: 0,
                        areaStyle: {
                          opacity: 0.8,
                          color: new echarts.graphic.LinearGradient(0, 0, 2, 1, [
                            {
                              offset: 0,
                              color: 'rgba(93, 95, 239, 0.05)',
                            },
                            {
                              offset: 1,
                              color: 'rgba(93, 95, 239, 0)',
                            },
                          ]),
                        },
                        emphasis: {
                          focus: 'series',
                        },
                        data: comparativePrices,
                      },
                    ],
                  }}
                />
              </TabPanel>
            ) : (
              <TabPanel value={value} index={value}>
                <ReactEcharts
                  option={{
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'cross',
                        label: {
                          backgroundColor: '#BB36FF',
                        },
                      },
                    },
                    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                    grid: {
                      left: '0%',
                      right: '0%',
                      bottom: '0%',
                      top: 0,
                      containLabel: false,
                    },
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: false,
                        show: false,
                        data: xAxisData,
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        show: false,
                      },
                    ],
                    series: [
                      {
                        name: `${fromToken?.name}`,
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                          width: 2,
                          color: '#BB36FF',
                          shadowBlur: 15,
                          shadowOffsetX: 7,
                        },
                        showSymbol: false,
                        symbolSize: 0,
                        areaStyle: {
                          opacity: 0.8,
                          color: new echarts.graphic.LinearGradient(0, 0, 2, 1, [
                            {
                              offset: 0,
                              color: 'rgba(93, 95, 239, 0.05)',
                            },
                            {
                              offset: 1,
                              color: 'rgba(93, 95, 239, 0)',
                            },
                          ]),
                        },
                        emphasis: {
                          focus: 'series',
                        },
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      },
                    ],
                  }}
                />
              </TabPanel>
            )}

            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <TabBar
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
                value={value}
                onChange={handleChange}
              >
                <TabButton isactive={value === 0} label="24H" {...a11yProps(0)} />
                <TabButton isactive={value === 1} label="1W" {...a11yProps(1)} />

                <TabButton isactive={value === 2} label="1M" {...a11yProps(2)} />
              </TabBar>
            </Box>
            {/* Use below skeleton for graph */}
            {/* <Skeleton variant="rectangular" width={671} height={274} /> */}
          </Box>
        </PairLineChartData>
      </>
    </PairLineChartMain>
  );
};

export default PairLineChart;
