import { Container, Grid } from '@mui/material';
import React from 'react';
import Buttons from 'theme/Buttons';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import styled from 'styled-components';

const ReferModel = styled('div')({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  padding: '8%',
  marginBottom: '20%',
});

const ReferModel2 = styled('div')({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  padding: '4%',
  marginBottom: '20%',
  '@media (max-width: 700px)': {
    width: '360px',
  },
});

const ContainerSpace = styled(Container)({
  marginTop: '10%',
});

const Title = styled('h2')({
  textAlign: 'center',
});

const Pre = styled('p')({
  fontWeight: '500',
  display: 'block',
  alignItems: 'center',
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  backgroundColor: '#f7f7f7',
  padding: '15px',
  borderRadius: '14px',
});

const Learn = styled('p')({
  textAlign: 'center',
});

const DetailView = styled('div')({
  margin: 'auto',
  display: 'block',
});

const Expected = styled('div')({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
});
const ItemText = styled('p')({
  paddingTop: '10px',
  fontWeight: '500',
  color: 'black',
});
const ItemText2 = styled('p')({
  fontWeight: '500',
  color: '#010101',
  paddingTop: '12px',
});

const Routs = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RoutImg = styled('img')({
  height: 24,
  width: 24,
});

const Referral = () => {
  return (
    <ContainerSpace>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <ReferModel>
            <Img src="/images/icons/shereLogo.png" />
            <br />
            <Title>Refer and Earn</Title>
            <Pre>
              Join the referral program and earn a portion of fees in ACX for transfers made from your unique referral
              link.
            </Pre>
            <br />
            <Buttons width="85%" isactive={true} onClick={() => null} title="Connect to Get Started" />
            <br />
            <Learn>Learn More</Learn>
          </ReferModel>
        </Grid>
        <Grid item sm={8}>
          <ReferModel2>
            <ItemText>Current referral tier</ItemText>
            <h2>Copper</h2>
            <DetailView>
              <Expected>
                <ItemText>Minimum Received</ItemText>
                <ItemText2>440.10045</ItemText2>
              </Expected>
              <Expected>
                <ItemText>Price Impact</ItemText>
                <ItemText2>0.05606%</ItemText2>
              </Expected>
              <Expected>
                <ItemText>Route</ItemText>
                <Routs>
                  <RoutImg src="/images/icons/coin3.png" />
                  <IconGlobalStyleComponent
                    onClick={() => null}
                    ml={10}
                    mr={10}
                    height={15}
                    width={18}
                    img="/images/icons/leftIcon.png"
                    opecity={0.4}
                  />
                  <RoutImg src="/images/wallets/coin6.png" />
                </Routs>
              </Expected>
              <Expected>
                <ItemText>SOL Price</ItemText>
                <ItemText2>0.000249 USDT</ItemText2>
              </Expected>
              <Expected>
                <ItemText>ETH Price</ItemText>
                <ItemText2>1.46 ETH</ItemText2>
              </Expected>
              <Expected>
                <ItemText>Slippage Tolerance</ItemText>
                <ItemText2>0.50%</ItemText2>
              </Expected>
              <Expected>
                <ItemText>Estimated Time</ItemText>
                <ItemText2>1 min</ItemText2>
              </Expected>
            </DetailView>
          </ReferModel2>
        </Grid>
      </Grid>
    </ContainerSpace>
  );
};

export default Referral;
