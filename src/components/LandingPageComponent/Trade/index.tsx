import { styled } from '@mui/system';

import { Grid } from '@material-ui/core';
import React from 'react';

const Main = styled('div')({
  backgroundColor: '#5D5FEF',
  marginTop: '5%',
  borderRadius: '14px',
  marginLeft: '5%',
  marginRight: '7%',
  padding: '3%',
  '@media (max-width: 660px)': {
    width: '93vw',
    marginLeft: 15,
  },
});

const H1 = styled('h1')({
  backgroundColor: '#5D5FEF',
  marginTop: '5%',
  borderRadius: '14px',
  marginLeft: '60px',
  marginRight: '70px',
  color: '#FFFFFF',
  '@media (max-width: 660px)': {
    marginLeft: '20px',
    marginRight: '20px',
  },
});

const Checked = styled('h2')({
  display: 'flex',
  alignItems: 'center',
});

const Div = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginLeft: '5%',
  marginTop: '20px',
});

const Title = styled('p')({
  color: '#FFFFFF',
  fontWeight: '600',
  marginLeft: 10,
});

const Btn = styled('button')({
  backgroundColor: '#FFBF3D',
  marginLeft: '12%',
  marginTop: '10%',
  padding: '2%',
  paddingLeft: '5%',
  paddingRight: '5%',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  '@media (max-width: 660px)': {
    marginBottom: '10%',
  },
});

const Img = styled('img')({
  marginLeft: '4%',
});

const Trade = () => {
  return (
    <Main>
      <Grid container>
        <Grid item sm={6}>
          <H1>Trade Directly from Your Own Wallet</H1>
          <Div>
            <Checked>
              <img src="/images/icons/Check.png" />
              <Title>No account required</Title>
            </Checked>
            <Checked>
              <img src="/images/icons/Check.png" />
              <Title>No trading limits</Title>
            </Checked>
          </Div>
          <Div>
            <Checked>
              &nbsp;&nbsp;&nbsp;
              <img src="/images/icons/Check.png" />
              <Title>No deposit or withdrawal fees</Title>
            </Checked>
            <Checked>
              <img src="/images/icons/Check.png" />
              <Title>Fiat on-ramp</Title>
            </Checked>
          </Div>
          <Btn>Connect Wallet</Btn>
        </Grid>
        <Grid item sm={6}>
          <Img src="/images/image/Beg.png" />
        </Grid>
      </Grid>
    </Main>
  );
};

export default Trade;
