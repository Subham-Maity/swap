import React from 'react';
import { styled } from '@mui/system';
import CurrencyInput from '../../CurrencyInput';
import CurrencyOutput from '../../CurrencyOutput';
import Buttons from '../../../../../theme/Buttons';
import { ThemeProps } from '../../../../../theme';
import { Box } from '@mui/material';
import { currencyFormatter } from 'utils';
import useGetGasPrice from 'hooks/useGetGasPrice';
import { useUserTransactionSetting } from 'store/user/hooks';

const ETH = styled('span')((props: { theme?: ThemeProps }) => ({
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  fontWeight: 500,
}));

const ImgVarticalShort = styled('img')({
  height: '15px',
  width: '15px',
  marginLeft: 10,
  cursor: 'pointer',
});

const ShortView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5%',
  marginTop: 5,
});

const ShortViewList = styled('div')({
  backgroundColor: '#F7F7F7',
  borderRadius: 24,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 15,
  padding: 10,
});

const ShortViewListItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 3,
  marginBottom: 3,
});

const Text = styled('span')({
  color: '#b0b0b0',
  fontWeight: 500,
});

const Price = styled('span')({
  color: 'black',
  fontWeight: 500,
});

interface SwapDefaultProps {
  minReceived: number;
  gasEstimateInUSD: number;
  priceImpact: number;
  toTokenTicker: string;
  fromTokenTicker: string;
  changeSwitch: () => void;
  fromTokenAmount: number;
  toTokenAmount: number;
  swap: () => Promise<void>;
}

const SwapDefault = ({
  minReceived,
  gasEstimateInUSD,
  priceImpact,
  fromTokenTicker,
  toTokenTicker,
  toTokenAmount,
  fromTokenAmount,
  changeSwitch,
  swap,
}: SwapDefaultProps) => {
  const { gasSpeedSelect, slippage } = useUserTransactionSetting();
  const gasPrices = useGetGasPrice();
  return (
    <Box minWidth={300}>
      <CurrencyInput toggleCurrencyModal={null} Read={false} />
      <CurrencyOutput toggleCurrencyModal={null} Read={false} receivedToken={minReceived} />
      <ShortView>
        <ETH>
          {fromTokenAmount} {fromTokenTicker} = {toTokenAmount} {toTokenTicker}
        </ETH>
        <ImgVarticalShort onClick={() => changeSwitch()} src="/images/icons/shortVartical.png" />
      </ShortView>
      <ShortViewList>
        <ShortViewListItem>
          <Text>Price Impact</Text>
          <Price>{priceImpact}%</Price>
        </ShortViewListItem>
        <ShortViewListItem>
          <Text>Minimum Received</Text>
          <Price>{minReceived} USDT</Price>
        </ShortViewListItem>
        <ShortViewListItem>
          <Text>Gas Price</Text>
          <Price>{gasPrices?.speeds?.[gasSpeedSelect]?.gasPrice?.toFixed(3)} GWEI</Price>
        </ShortViewListItem>
        <ShortViewListItem>
          <Text>Slippage Tolerance</Text>
          <Price>{slippage}%</Price>
        </ShortViewListItem>
        <ShortViewListItem>
          <Text>Transaction Cost</Text>
          <Price>~{currencyFormatter(gasEstimateInUSD)}</Price>
        </ShortViewListItem>
      </ShortViewList>
      <Buttons
        width="90%"
        onClick={() => (priceImpact > 10 ? null : swap())}
        isactive={!(priceImpact > 10)}
        title={priceImpact > 10 ? 'price impact too high' : 'Confirm Swap'}
      />
    </Box>
  );
};

export default SwapDefault;
