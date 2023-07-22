import React from 'react';
import Navbar from '../../components/LandingPageComponent/Navbar';
import About from '../../components/LandingPageComponent/About';
import Token from '../../components/LandingPageComponent/Token';
import Exchange from '../../components/LandingPageComponent/Exchange';
import YourTrading from '../../components/LandingPageComponent/YourTrading';
import Trade from '../../components/LandingPageComponent/Trade';
import Footer from '../../components/LandingPageComponent/Footer';
import { styled } from '@material-ui/core';
import { Container } from '@mui/material';

const Div = styled(Container)({
  overflowX: 'hidden',
  padding: '0px!important',
});

const LandingPage = () => {
  return (
    <Div maxWidth="xl">
      <Navbar />
      <About />
      <Token />
      <Exchange />
      <YourTrading />
      <Trade />
      <Footer />
    </Div>
  );
};

export default LandingPage;
