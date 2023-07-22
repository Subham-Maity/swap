import React from 'react';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import Sell from '../../LandingPageComponent/Sell';

const Bg = styled('div')({
  backgroundImage: `url(${'/images/image/BG.png'})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover!important',
  paddingTop: '10%',
  paddingBottom: '10%',
});

const H2 = styled('h2')({
  textAlign: 'center',
  fontSize: '44px',
  color: '#200440',
  lineHeight: 1.2,
  '@media (max-width: 660px)': {
    fontSize: '25px',
  },
});

const Pre = styled('p')({
  fontWeight: '400',
  color: '#666666',
  textAlign: 'center',
  marginTop: 20,
});

const Img = styled('img')({
  marginTop: '25%',
});

const Div = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  marginTop: 20,
});

const Coin = styled('img')({
  height: 72,
  width: 72,
});

const Title = styled('p')({
  fontWeight: '600',
  color: '#04294F',
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
});

const Text = styled('p')({
  fontWeight: '400',
  color: '#666666',
  marginRight: '10px',
});

const DivBlock = styled('div')({
  marginTop: '40%',
});

const Priv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: 20,
});

const CoinPlus = styled('img')({
  width: '72px',
  height: '72px',
});

const TitlePlus = styled('p')({
  fontWeight: '600',
  color: '#04294F',
  marginLeft: '20px',
});

const TextPlus = styled('p')({
  fontWeight: '600',
  color: '#04294F',
  marginLeft: '20px',
});

const Grid1 = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Exchange = () => {
  return (
    <Bg>
      <H2>
        Why Use One Exchange,
        <br /> When You Can Use Them All?
      </H2>
      <Pre>Matcha aggregates all the offers from various liquidity sources</Pre>
      <Grid1 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={4}>
          <DivBlock>
            <Div>
              <div>
                <Title>Ethereum</Title>
                <Text>Uniswap, SushiSwap, +20</Text>
              </div>
              <Coin src="/images/icons/coin3.png" />
            </Div>
            <Div>
              <div>
                <Title>Ethereum</Title>
                <Text>Uniswap, SushiSwap, +20</Text>
              </div>
              <Coin src="/images/icons/coin3.png" />
            </Div>
            <Div>
              <div>
                <Title>Ethereum</Title>
                <Text>Uniswap, SushiSwap, +20</Text>
              </div>
              <Coin src="/images/icons/coin3.png" />
            </Div>
          </DivBlock>
        </Grid>
        <Grid item sm={4}>
          <Img src="/images/image/Funnel.png" />
        </Grid>
        <Grid item sm={4}>
          <DivBlock>
            <Priv>
              <CoinPlus src="/images/icons/icons/plusIcon.png" />
              <div>
                <TitlePlus>Private Liquidity</TitlePlus>
                <TextPlus>Exclusive to Matcha</TextPlus>
              </div>
            </Priv>
            <Priv>
              <CoinPlus src="/images/icons/icons/plusIcon.png" />
              <div>
                <TitlePlus>Private Liquidity</TitlePlus>
                <TextPlus>Exclusive to Matcha</TextPlus>
              </div>
            </Priv>
            <Priv>
              <CoinPlus src="/images/icons/icons/plusIcon.png" />
              <div>
                <TitlePlus>Private Liquidity</TitlePlus>
                <TextPlus>Exclusive to Matcha</TextPlus>
              </div>
            </Priv>
          </DivBlock>
        </Grid>
      </Grid1>
      <br />
      <br />
      <hr />
      <Sell />
    </Bg>
  );
};

export default Exchange;
