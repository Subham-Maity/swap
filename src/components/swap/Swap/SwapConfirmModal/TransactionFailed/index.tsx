import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
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
  maxWidth: '300px',
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

const TransactionFailedModal = styled('div')({
  marginTop: 25,
   minWidth:300,
  textAlign:'center'
});

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '30%',
//   bgcolor: 'white',
//   boxShadow: 24,
//   paddingLeft: 4,
//   paddingRight: 4,
//   paddingBottom: 6,
//   paddingTop: 0,
//   height: '42%',
//   borderRadius: 5,
// };

const TransactionFailed = ({ close }: { close: () => void }) => {
  return (
    <TransactionFailedModal>
      <CompletedIcon src="/images/icons/faild.png" alt="Image" />
      <Title>Transaction Failed</Title>
      <SubTitle>
        This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage
        tolerance.
      </SubTitle>
      <Buttons onClick={close}>Close</Buttons>
    </TransactionFailedModal>
  );
};

export default TransactionFailed;
