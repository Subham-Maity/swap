import { styled } from '@mui/system';
import { Slider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import Buttons from 'theme/Buttons';
const Warning = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Text = styled('h4')({
  fontWeight: '600',
  color: '#FF0000',
  marginLeft: 10,
});
const TextDes = styled('p')({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.01em',
  color: 'rgba(0, 0, 0, 0.65)',
});
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled('h2')({
  fontWeight: '600',
});

const Current = styled('p')({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.01em',
  color: 'rgba(0, 0, 0, 0.65)',
});
const Card = styled('div')({
  width: 320,
  height: 320,
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  borderRadius: 24,
  padding: 20,
});

const CardCenter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
});

const Div = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Coin = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const CoinTitle = styled('p')({
  marginLeft: 10,
});
const PinkRound = styled('p')({
  background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  height: 36,
  width: 36,
  borderRadius: '100px',
  marginLeft: 10,
});
const PinkLoder = styled('p')({
  background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  height: 36,
  width: 36,
  borderRadius: '100px',
  marginRight: 35,
  marginBottom: 5,
});

const Click = styled('p')({
  color: '#BB36FF',
  textAlign: 'center',
});

const LoderDiv = styled('p')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const Loder = styled('div')({
  marginTop: '15%',
});
const Pr = styled('h2')({
  textAlign: 'center',
  fontWeight: '600',
});
const Discription = styled('p')({
  textAlign: 'center',
  fontWeight: '500',
  color: 'rgba(0, 0, 0, 0.65)',
});

const SliderUi = styled(Slider)({
  color: '#BB36FF',
  marginLeft: '5%',
  width: '90%',
});
const Confirmations = styled('p')({
  textAlign: 'center',
});

const Success = styled('h2')({
  fontWeight: '600',
  textAlign: 'center',
  marginTop: '20%',
});
interface ConvertingProps {
  close: () => void;
}
const Converting = (props: ConvertingProps) => {
  const [click, setClick] = useState(false);
  const [completed, setCompleted] = useState(false);
  return (
    <>
      <Header>
        <Title>Converting</Title>
        <IconGlobalStyleComponent
          onClick={props.close}
          ml={10}
          mr={10}
          height={20}
          width={20}
          img="/images/icons/cros.png"
          opecity={0.3}
        />
      </Header>
      {completed ? null : (
        <>
          <Warning>
            {/* <img src="/images/icons/info.png" /> */}
            <IconGlobalStyleComponent
              onClick={() => {
                props.close();
              }}
              ml={0}
              mr={0}
              height={25}
              width={25}
              img="/images/icons/info.png"
              opecity={1}
            />
            <Text>Warning</Text>
          </Warning>
          <TextDes>
            When Solana transactions per second (TPS) drop below 2000 due to network congestion, it may cause delays or
            cancellations.
          </TextDes>
          <br />
          <Current>Current TPS: 1470</Current>
        </>
      )}

      <CardCenter>
        <Card>
          <Div>
            <Coin>
              <img src="/images/icons/coin3.png" />
              <CoinTitle>SOL</CoinTitle>
            </Coin>
            <IconGlobalStyleComponent
              onClick={() => {
                props.close();
              }}
              ml={0}
              mr={0}
              height={18}
              width={20}
              img="/images/icons/LeftPink.png"
              opecity={1}
            />
            <Coin>
              <img src="/images/icons/coin3.png" />
              <CoinTitle>SOL</CoinTitle>
            </Coin>
          </Div>
          <Loder>
            {completed ? (
              <LoderDiv>
                <img src="./images/image/completed.svg" />
              </LoderDiv>
            ) : (
              <>
                <LoderDiv>
                  <PinkLoder></PinkLoder>
                </LoderDiv>
                <LoderDiv>
                  <PinkRound></PinkRound>
                  <PinkRound></PinkRound>
                  <PinkRound></PinkRound>
                  <PinkRound></PinkRound>
                </LoderDiv>
              </>
            )}
          </Loder>
          <br />
          <br />
          {click ? (
            completed ? (
              <Click>View on Etherscan</Click>
            ) : (
              <>
                {' '}
                <Confirmations
                  onClick={() => {
                    setCompleted(true);
                  }}
                >
                  8/32 Confirmations
                </Confirmations>
                <SliderUi defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
              </>
            )
          ) : (
            <Click
              onClick={() => {
                setClick(true);
              }}
            >
              View on Solscan
            </Click>
          )}
        </Card>
      </CardCenter>
      {completed ? (
        <>
          <Success>Swapped Successfully</Success>
          <Buttons width="85%" isactive={true} onClick={() => null} title="Done" />
        </>
      ) : (
        <>
          <Pr>43%</Pr>
          <Discription>Please wait while converting SOL to ETH</Discription>
          <Box>
            <SliderUi defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </Box>
        </>
      )}
    </>
  );
};

export default Converting;
