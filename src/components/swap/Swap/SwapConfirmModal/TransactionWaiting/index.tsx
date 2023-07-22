import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Title = styled('h2')({
  fontWeight: '600',
  color: 'black',
  textAlign: 'center',
  marginTop: 30,
});

const SubTitle = styled('p')({
  fontWeight: '500',
  color: 'black',
  textAlign: 'center',
  marginTop: 8,
});

const CircularProgressIcon = styled('img')({
  margin: 'auto',
  display: 'block',
  marginTop: 20,
  height: 70,
  width: 70,
});

const TransactionWaitingModal = styled('div')({
  marginTop: 25,
   minWidth:300,
  textAlign:'center'
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
  height: '35%',
  borderRadius: 5,
};

export type TransactionWaitingProps = {
  swapCurrency: string;
  receivedCurrency: string;
};

const TransactionWaiting = ({ swapCurrency, receivedCurrency }: TransactionWaitingProps) => {
  return (
    // <Box sx={style}>
      <TransactionWaitingModal>
        <CircularProgressIcon src="/images/icons/loader.png" />
        <Title>Waiting for Confirmation</Title>
        <SubTitle>
          Swapping {swapCurrency} for {receivedCurrency}
        </SubTitle>
        <br />
        <SubTitle>Please confirm this transaction in your wallet.</SubTitle>
      </TransactionWaitingModal>
    // </Box>
  );
};

export default TransactionWaiting;
