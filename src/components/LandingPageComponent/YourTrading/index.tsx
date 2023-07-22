import { Container, styled } from '@mui/system';
import React from 'react';
import { Grid } from '@mui/material';

const H1 = styled('h1')({
  marginTop: '5%',
  textAlign: 'center',
});

const Pre = styled('p')({
  fontWeight: '400',
  color: '#666666',
  textAlign: 'center',
});

const Div = styled('div')({
  backgroundColor: '#edebf0',
  height: '300px',
  marginTop: '10%',
  borderRadius: '24px',
  background: `url(${'/images/image/Coinsbg.png'})`,
  backgroundRepeat: 'no-repeat',
  marginRight: '20px',
  '@media (max-width: 660px)': {
    width: '93vw',
    marginLeft: 20,
  },
});

const Div2 = styled('div')({
  backgroundColor: '#edebf0',
  marginTop: '10%',
  borderRadius: '24px',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2%',
  paddingBottom: '8%',
  '@media (max-width: 660px)': {
    width: '93vw',
    marginLeft: 20,
  },
});

const Peregraph = styled('h3')({
  fontWeight: '600',
  marginLeft: '12%',
  paddingTop: '15%',
});

const Peregraph2 = styled('h3')({
  fontWeight: '600',
  marginLeft: '12%',
  paddingTop: '30%',
  '@media (max-width: 660px)': {
    paddingTop: '10%',
  },
});

const Btn = styled('button')({
  backgroundColor: '#FFBF3D',
  marginLeft: '20%',
  marginTop: '5%',
  padding: '2%',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
});

const Trading = styled('button')({
  backgroundColor: '#5D5FEF',
  marginLeft: '12%',
  marginTop: '5%',
  padding: '3%',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
});

const Img = styled('img')({
  height: '70%',
  width: '70%',
  marginTop: '15%',
  '@media (max-width: 660px)': {
    height: '100%',
    width: '200px',
    marginTop: '0%',
    marginLeft: '35%',
  },
});

const Grid1 = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const YourTrading = () => {
  return (
    <Container>
      <H1>Your Trading Home</H1>
      <Pre>Pellentesque nunc ac interdum neque in purus in pharetra</Pre>
      <Grid1 container spacing={0}>
        <Grid item sm={6}>
          <Div>
            <Peregraph>
              Track Your Tokens and <br /> Manage Your Positions
            </Peregraph>
            <Btn>See Your Portfolio</Btn>
          </Div>
        </Grid>
        <Grid item sm={6}>
          <Div2>
            <Grid container spacing={0} rowSpacing={2}>
              <Grid item sm={6}>
                <div>
                  <Peregraph2>Market, Limit or OTC for Any Sized Trades</Peregraph2>
                  <Trading>Start Trading</Trading>
                </div>
              </Grid>
              <Grid item sm={6}>
                <Img src="/images/image/Exchange.png" />
              </Grid>
            </Grid>
          </Div2>
        </Grid>
      </Grid1>
    </Container>
  );
};

export default YourTrading;
