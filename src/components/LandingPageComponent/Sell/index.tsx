import { Grid } from '@material-ui/core';
import { styled } from '@mui/system';

import React from 'react';
import Card from '../../LandingPageComponent/Card';

const Pre = styled('h2')({
  fontSize: '44px',
  fontWeight: 'bold',
  marginLeft: '15%',
  marginTop: '-10%',
  '@media (max-width: 660px)': {
    fontSize: '25px',
    textAlign: 'center',
    marginLeft: '0%',
    marginTop: '20%',
  },
});

const Div = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const DivCard = styled('div')({
  backgroundColor: 'white',
  marginBottom: '20%',
  paddingBottom: '5%',
  borderRadius: '24px',
  marginTop: '10%',
  marginRight: '20%',
  width: '87%',
  '@media (max-width: 660px)': {
    width: '100%',
  },
});

const Images = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 30,
  paddingTop: 30,
});
const CoinImg = styled('img')({
  width: '72px',
  height: '72px',
});

const CoinImg2 = styled('img')({
  width: '72px',
  height: '72px',
  marginLeft: -20,
});

const H1 = styled('h1')({
  marginLeft: 30,
  marginTop: 20,
});

const Pr = styled('div')({
  marginLeft: 30,
  marginTop: 30,
  display: 'flex',
  alignItems: 'center',
});

const Prdiv = styled('div')({
  backgroundColor: '#edebf0',
  padding: 20,
  borderRadius: 15,
  marginRight: 20,
});

const Prtext = styled('h2')({
  color: '#5D5FEF',
  fontWeight: 'bold',
  textAlign: 'center',
});

const Type = styled('p')({
  color: '#200440',
  fontWeight: 'bold',
  textAlign: 'center',
});

const Grid1 = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Sell = () => {
  return (
    <>
      <Grid1 container spacing={1}>
        <Grid item sm={6}>
          <Div>
            <Pre>And Merges Them into One Trade, So You Save Time and Money</Pre>
          </Div>
        </Grid>
        <Grid item sm={6}>
          <DivCard>
            <Images>
              <CoinImg src="/images/chains/bsc.png" />
              <CoinImg2 src="/images/icons/coin3.png" />
            </Images>
            <H1>Sell 1,500 DAI for ETH</H1>
            <Pr>
              <Prdiv>
                <Prtext>22%</Prtext>
                <Type>Sushi</Type>
              </Prdiv>
              <Prdiv>
                <Prtext>22%</Prtext>
                <Type>Uniswap</Type>
              </Prdiv>
              <Prdiv>
                <Prtext>0x</Prtext>
                <Prtext>48%</Prtext>
              </Prdiv>
            </Pr>
          </DivCard>
        </Grid>
      </Grid1>
      <hr />
      <Card />
    </>
  );
};

export default Sell;
