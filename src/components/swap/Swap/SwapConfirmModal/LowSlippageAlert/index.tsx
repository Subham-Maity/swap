import React from 'react';
import { styled } from '@mui/system';
import { Button, Box, Grid } from '@mui/material';
import { ThemeProps } from '../../../../../theme';

const Title = styled('h2')({
  fontWeight: '600',
  color: '#FF0000',
  textAlign: 'center',
  margin: 'auto',
  display: 'block',
  marginTop: 20,
});

const SubTitle = styled('p')({
  fontWeight: '500',
  textAlign: 'center',
  color: 'black',
  margin: 'auto',
  display: 'block',
  marginTop: 10,
  opacity: 0.65,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
});

const CompletedIcon = styled('img')({
  height: '70px',
  width: '70px',
  margin: 'auto',
  display: 'block',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 6,
  paddingTop: 0,
  height: '48%',
  borderRadius: 5,
};

const ButtonsActive = styled(Button)((props: { theme?: ThemeProps }) => ({
  borderRadius: 12,
  background: props.theme && props.theme.palette.color.active,
  color: 'white',
  textTransform: 'initial',
  display: 'block',
  margin: 'auto',
}));

const HighSlippageModal = styled('div')({
  marginTop: 25,
});

const ContinueButton = styled(Button)({
  background: ' linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  'background-clip': 'text',
  'text-fill-color': 'transparent',
  border: '1px solid',
  ':hover': {
    '-webkit-background-clip': 'text',
    background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
    '-webkit-text-fill-color': 'transparent',
    'background-clip': 'text',
    'text-fill-color': 'transparent',
  },
});

export type TransactionFailedProps = {
  handleClose: () => void;
  transactionUrl: string | null;
  watchAssetHandler: () => void | null;
};

const LowSlippageAlert = () => {
  return (
      <HighSlippageModal>
        <CompletedIcon src="/images/icons/highSlippage.png" alt="Image" />
        <Title>Low Slippage Alert</Title>
        <SubTitle>
          Transaction with extremely low slippage tolerance might be reverted because of very small market movement.
        </SubTitle>
        <Grid container mt={4} spacing={2}>
          <Grid item md={6} pl={10} textAlign="center">
            <ButtonsActive>Update Slippage</ButtonsActive>
          </Grid>
          <Grid item md={6} pr={10} textAlign="center">
            <ContinueButton>Continue</ContinueButton>
          </Grid>
        </Grid>
      </HighSlippageModal>
  );
};

export default LowSlippageAlert;
