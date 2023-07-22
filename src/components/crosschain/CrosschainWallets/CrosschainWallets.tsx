import { styled } from '@mui/system';
import React, { useState } from 'react';
import Buttons from 'theme/Buttons';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled('h2')({
  fontWeight: '600',
});

const Wallate = styled('p')({
  fontWeight: '600',
});

const Coin = styled('div')({
  backgroundColor: '#f7f7f7',
  height: 84,
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '3%',
  paddingRight: '5%',
});

const CoinName = styled('p')({
  fontWeight: '600',
  opacity: 0.65,
  marginLeft: 10,
});

const From = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const CoinImg = styled('img')({
  height: 36,
  width: 36,
  marginLeft: 10,
  borderRadius: 100,
});

const Btn = styled('div')({
  marginLeft: '-30px',
});

const CopyText = styled('p')({
  fontWeight: '600',
  color: '#BB36FF',
});
interface ContinuewithWalletsProps {
  close: () => void;
}
const CrosschainWallets = (props: ContinuewithWalletsProps) => {
  const [copy, setCopy] = useState(false);
  const [copyto] = useState(false);
  return (
    <>
      <Header>
        <Title>Continue with Wallets</Title>
        <IconGlobalStyleComponent
          onClick={() => {
            props.close();
          }}
          ml={10}
          mr={10}
          height={20}
          width={20}
          img="/images/icons/cros.png"
          opecity={0.3}
        />
      </Header>
      <br />
      <div>
        <Wallate>From Wallet</Wallate>
        <Coin>
          <From>
            <CoinImg src="/images/wallets/coin6.png" />
            <CoinName>ETH</CoinName>
          </From>
          <From>
            <IconGlobalStyleComponent
              onClick={() => {
                setCopy(true);
              }}
              ml={0}
              mr={0}
              height={25}
              width={25}
              img="/images/icons/filecopy.png"
              opecity={1}
            />
            <CoinName>{copy ? <CopyText>copy</CopyText> : '0x37...0420'}</CoinName>
            <IconGlobalStyleComponent
              onClick={() => {
                setCopy(true);
              }}
              ml={10}
              mr={0}
              height={18}
              width={18}
              img="/images/icons/shere.png"
              opecity={0.3}
            />
          </From>
        </Coin>
      </div>
      <br />
      <div>
        <Wallate>To Wallet</Wallate>
        <Coin>
          <From>
            <CoinImg src="/images/icons/coin3.png" />
            <CoinName>ETH</CoinName>
          </From>
          <From>
            <IconGlobalStyleComponent
              onClick={() => {
                setCopy(true);
              }}
              ml={0}
              mr={0}
              height={25}
              width={25}
              img="/images/icons/filecopy.png"
              opecity={1}
            />
            <CoinName>{copyto ? <CopyText>copy</CopyText> : '0x37...0420'}</CoinName>
            <IconGlobalStyleComponent
              onClick={() => {
                setCopy(true);
              }}
              ml={10}
              mr={0}
              height={18}
              width={18}
              img="/images/icons/shere.png"
              opecity={0.3}
            />
          </From>
        </Coin>
      </div>
      <br />
      <Btn>
        <Buttons width="92%" isactive={true} onClick={() => null} title={'Continue'} />
      </Btn>
    </>
  );
};

export default CrosschainWallets;
