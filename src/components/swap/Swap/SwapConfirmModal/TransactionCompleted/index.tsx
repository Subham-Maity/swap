import React from 'react';
import { styled } from '@mui/system';
import Buttons from '../../../../../theme/Buttons';
import { Box, Grid } from '@mui/material';
import { useSwapTokens } from 'store/swap/hooks';
import { useAddTokenToMetaMask } from '../../../../../hooks/useAddTokenToMetamask';
import { useAppChainId } from 'store/user/hooks';
import { CHAINS } from 'config/chains';

const Title = styled('h2')({
  fontWeight: '600',
  color: 'black',
  textAlign: 'center',
  margin: 'auto',
  display: 'block',
  marginTop: 20,
});

const SubTitle = styled('p')({
  fontWeight: '500',
  textAlign: 'center',
  color: '#DC7FB6',
  margin: 'auto',
  display: 'block',
  marginTop: 10,
});

const CompletedIcon = styled('img')({
  height: '70px',
  width: '70px',
  margin: 'auto',
  display: 'block',
});

const BtnImg = styled('img')({
  display: 'flex',
  margin: '0px 5px',
});

const BtnTitle = styled('div')({
  display: 'contents',
});

const TransactionCompletedModal = styled('div')({
  marginTop: 25,
  minWidth: 300,
  textAlign: 'center',
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
//   height: 'auto',
//   borderRadius: 5,
// };

const Img = styled('img')({
  height: '36px',
  width: '36px',
});

const Img3 = styled('img')({
  height: '16px',
  width: '16px',
  marginTop: '10px',
});

const Img2 = styled('img')({
  width: 20,
  height: 20,
  marginTop: 15,
  marginLeft: -17,
});

const TransactionCompleted = ({ transactionHash }: { transactionHash: string }) => {
  const { fromToken, toToken } = useSwapTokens();
  const [addToMetamaskStatus, addToMetaMaskCallback] = useAddTokenToMetaMask();
  const appChainId = useAppChainId();
  return (
    <TransactionCompletedModal>
      <CompletedIcon src="/images/image/completed.svg" alt="Image" />
      <Title>Transaction Submitted</Title>
      <Grid container>
        <Grid item margin={'auto'} md={4}>
          <Box justifyContent={'end'} display={'flex'}>
            <Img src={fromToken?.logoURI} alt="Coin" />
            <Img2 src={CHAINS?.[appChainId]?.icon} alt="Coin" />
          </Box>
        </Grid>
        <Grid item margin={'auto'} md={4}>
          <Box justifyContent={'center'} display={'flex'}>
            <Img3 src={'/images/icons/LeftPink.png'} alt="Coin" />
          </Box>
        </Grid>
        <Grid item margin={'auto'} md={4}>
          <Box justifyContent={'start'} display={'flex'}>
            <Img src={toToken?.logoURI} alt="Coin" />
            <Img2 src={CHAINS?.[appChainId]?.icon} alt="Coin" />
          </Box>
        </Grid>
      </Grid>

      <a href={`${CHAINS[appChainId].exploler}tx/${transactionHash}`} target="_blank">
        <SubTitle>View on Explorer</SubTitle>
      </a>

      <Buttons
        width="86%"
        isactive={true}
        onClick={() => addToMetaMaskCallback(toToken)}
        title={
          <BtnTitle>
            Add {toToken?.symbol} to
            <BtnImg src="/images/image/mataMask.svg" alt="MataMask" />
            MetaMask
          </BtnTitle>
        }
      />
    </TransactionCompletedModal>
  );
};

export default TransactionCompleted;
