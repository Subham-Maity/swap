/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import CrosschainComponent from '../../components/crosschain';

const Crosschain = () => {
  const isDesktop = useMediaQuery('(min-width:660px)');

  return (
    <>
      {/* <MainDiv> */}
      <Grid container spacing={isDesktop ? 3 : 0}>
        <CrosschainComponent />
      </Grid>
      {/* </MainDiv> */}
    </>
  );
};

export default Crosschain;
