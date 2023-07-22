import React from 'react';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

const AboutMain = styled('div')({
  marginTop: '5%',
});

const Title = styled('h1')({
  fontSize: '72px',
  marginLeft: '10%',
  lineHeight: 1.1,
  marginBottom: '5%',
  '@media (max-width: 660px)': {
    fontSize: '40px',
  },
});

const Text = styled('h1')({
  color: '#666666',
  marginLeft: '10%',
});

const Trading = styled('button')({
  backgroundColor: '#FFBF3D',
  fontWeight: '600',
  border: 'none',
  padding: 15,
  borderRadius: '10px',
  marginLeft: '10%',
  marginTop: '5%',
});

const Links = styled('a')({
  color: '#5D5FEF',
  marginLeft: '10%',
});

const Bg = styled('div')({
  backgroundImage: `url(${'/images/image/BG.png'})`,
  height: '100%',
  borderBottomLeftRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '10%',
  paddingBottom: '10%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const About = () => {
  return (
    <AboutMain>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Title>The Most Secure Place to Trade in DeFi</Title>
          <Text>
            Powered by 0x protocol - a professional grade <br /> liquidity aggregator
          </Text>
          <Trading>Start Trading</Trading>
          <br />
          <br />
          <Links href="/#">Buy Crypto with Credit or Debit Card</Links>
        </Grid>
        <Grid item sm={6}>
          <Bg>
            <img src="/images/image/Coins.png" width="80%" height="100%" />
          </Bg>
        </Grid>
      </Grid>
    </AboutMain>
  );
};

export default About;
