import * as React from 'react';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';
import { ThemeProps } from '../../../../../theme';

const Title = styled('span')({
  fontWeight: '600',
  fontSize: '24px',
  color: 'red',
  textAlign: 'center',
  margin: 'auto',
  display: 'block',
  marginTop: 20,
});

const SubTitle = styled('span')({
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'center',
  color: 'black',
  margin: 'auto',
  display: 'block',
  marginTop: 10,
  marginBottom: 20,
});

const CompletedIcon = styled('img')({
  height: '70px',
  width: '70px',
  margin: 'auto',
  display: 'block',
});

const Buttons = styled(Button)((props: { theme?: ThemeProps }) => ({
  borderRadius: 12,
  background: props.theme && props.theme.palette.color.active,
  color: 'white',
  textTransform: 'initial',
  display: 'block',
  margin: 'auto',
}));

const PriceUpdateAlertModal = styled('div')({
  marginTop: 25,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 6,
  paddingTop: 0,
  height: '42%',
  borderRadius: 5,
};

const PriceUpdateAlert = () => {
  return (
      <PriceUpdateAlertModal>
        <CompletedIcon src="/images/icons/faild.png" alt="Image" />
        <Title>Price Update Alert</Title>
        <SubTitle>Due to taking longer period of this transaction price updated. Please approve to go ahead.</SubTitle>
        <Buttons>Close</Buttons>
      </PriceUpdateAlertModal>
  );
};

export default PriceUpdateAlert;
