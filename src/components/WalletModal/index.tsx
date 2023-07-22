import React, { useState } from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import Modal from '../Modal';
import { useIsModalOpen, useToggleModal } from '../../store/app/hooks';
import { styled } from '@mui/system';
import Buttons from '../../theme/Buttons';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from '../../theme/GlobalComponent/iconGlobalStyleComponent';
import { CHAINS } from 'config/chains';
import wallets from 'config/wallets';
import { ModalType } from 'store/app';
import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';

const Title = styled('p')({
  // fontWeight: '600',
  marginLeft: '5%',
});

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginLeft: '3%',
});

const StyledButtons = styled('button')((props: { theme?: ThemeProps; isactive: boolean; isWallet: boolean }) => ({
  position: 'relative',
  borderWidth: '1.5px',
  borderStyle: 'solid',
  border: props.isactive && 'none',
  borderColor: props.isactive && props.theme ? props.theme.palette.color.active : '#e0e0e0',
  background:
    props.isactive && props.theme
      ? props.theme.palette.color.active
      : props.isWallet && props.theme
      ? props.theme.palette.color.white
      : !props.isWallet && props.theme
      ? props.theme.palette.color.buttonBackground
      : '#e0e0e0',
  display: 'flex',
  color: props.isactive && props.theme && props.theme.palette.color.white,
  alignItems: 'center',
  borderRadius: 10,
  justifyContent: 'center',
  margin: 5,
  padding: '2%',
  // marginLeft: 15,
  // padding: '12px, 18px, 12px, 16px',
  cursor: 'pointer',
  fontSize: '14px',
}));

const Checkbox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5%',
  marginTop: '2%',
  marginBottom: '0%',
});

const TermsAndConditionText = styled('p')({
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const TermsAndConditionPinkText = styled('p')((props: { theme?: ThemeProps }) => ({
  fontWeight: '600',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  marginRight: 5,
  marginLeft: 5,
}));

const SelectImg = styled('img')(() => ({
  position: 'absolute',
  left: '45px',
  top: '70%',
  transform: 'translate(-50%, -50%)',
  height: 15,
  width: 15,
}));

const StyledButtonTitle = styled('p')((props: { theme?: ThemeProps; isactive: boolean }) => ({
  fontWeight: '600',
  color: props.isactive && props.theme ? props.theme.palette.color.white : '#000000',
  opacity: props.isactive ? 1 : 0.65,
}));

const ImageIcon = styled('img')({
  height: 35,
  width: 35,
  marginRight: 10,
});

const ButtonGroup = styled('div')({
  marginTop: '3%',
});

const Main = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingTop: '3%',
  paddingBottom: '3%',
  marginBottom: '5%',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Heading = styled('h2')({
  fontWeight: '600',
  marginLeft: 27,
  marginBottom: 10,
  fontSize: '20px',
});

const WalletModalDiv = styled('div')({
  backgroundColor: 'white',
  // paddingBottom: 10,
  paddingTop: 10,
  width: '585px',
  height: 'auto',
  borderRadius: 10,
  // marginTop: 200,
  overflow: 'auto',
  '@media (max-width: 660px)': {
    borderRadius: 0,
    marginTop: 100,
  },
  '&:hover': {
    // overflowY: 'auto',
  },
  // '&::-webkit-scrollbar': {
  //   display: 'none',
  // },
});
const FormControlRadioLabel = styled(FormControlLabel)({
  marginRight: 0,
});
const WalletModal = () => {
  const [parmition, setParmition] = useState(false);

  const close = useToggleModal(null);
  let isOpen = useIsModalOpen(ModalType.WALLET_MODAL);

  let { activate } = useWeb3React();
  let [selectedChainId, changeChainId] = useState<number>(null);
  let [connector, setConnector] = useState<AbstractConnector>(null);

  const activating = async () => {
    return connector && activate(connector);
  };

  return (
    <>
      <Modal isOpen={isOpen} modalTitle="Connect Wallet" close={close}>
        <WalletModalDiv>
          {/* <Header>
            <Heading>Connect Wallet</Heading>
            <IconGlobalStyleComponent
              ml={10}
              mr={30}
              height={20}
              width={20}
              img="/images/icons/cros.png"
              opecity={0.5}
              onClick={() => close()}
            />
          </Header> */}
          <>
            <Main>
              <Title>Choose Network</Title>
              <ButtonGroup>
                <Wrapper>
                  {Object.keys(CHAINS).map((chainId) => {
                    let network = CHAINS[parseInt(chainId)];
                    if (network.exclude) return null;
                    return (
                      <StyledButtons
                        key={chainId}
                        isactive={selectedChainId === parseInt(chainId)}
                        onClick={() => changeChainId(parseInt(chainId))}
                        isWallet={false}
                      >
                        {selectedChainId === parseInt(chainId) && (
                          <SelectImg src="/images/icons/select.png" alt="Select_Icon" />
                        )}
                        <ImageIcon src={network.icon} alt="Coin" />
                        <StyledButtonTitle isactive={selectedChainId === parseInt(chainId)}>
                          {network.name}
                        </StyledButtonTitle>
                      </StyledButtons>
                    );
                  })}
                </Wrapper>
                {/* <ViewMainView>
                  <ViewMainBtn>
                    <StyledButtonTitle
                      onClick={() => {
                        handleOpenError();
                      }}
                    >
                      Error Modal
                    </StyledButtonTitle>
                  </ViewMainBtn>
                  <ModalCustom
                    open={ErrorStatus}
                    onClose={() => {
                      handleCloseError();
                    }}
                  >
                    <Box sx={styleError}>
                      <TitleView2>
                        <Title3>Wrong Network</Title3>
                        <CloseBtn
                          src="/images/icons/cros.png"
                          onClick={() => {
                            handleCloseError();
                          }}
                          alt="Cros"
                        />
                      </TitleView2>
                      <MainDiv>
                        <ImageIcon src="/images/chains/ethereum.png" alt="Coin" />
                        <Span>Arbitrum</Span>
                      </MainDiv>
                      <br />
                      <Warning>You select wrong network please select anothor network</Warning>
                      <br />
                      <br />
                      <ConnectButton2 variant="text" onClick={() => { }}>
                        Ok
                      </ConnectButton2>
                    </Box>
                  </ModalCustom>
                </ViewMainView> */}
              </ButtonGroup>
            </Main>
            <Title>Choose Wallet</Title>
            <ButtonGroup>
              <Wrapper>
                {Object.keys(wallets).map((walletName) => {
                  let wallet = wallets[walletName];
                  if (wallet.walletName === 'Injected') return null;
                  return (
                    <StyledButtons
                      key={walletName}
                      isactive={connector === wallet.provider}
                      onClick={() => setConnector(wallet.provider)}
                      isWallet={true}
                    >
                      {connector === wallet.provider && <SelectImg src="/images/icons/select.png" alt="Select_Icon" />}
                      <ImageIcon src={wallet.walletIcon} alt="Coin" />
                      <StyledButtonTitle isactive={connector === wallet.provider}>
                        {wallet.walletName}
                      </StyledButtonTitle>
                    </StyledButtons>
                  );
                })}
              </Wrapper>
            </ButtonGroup>
          </>
          <Checkbox>
            <FormControlRadioLabel
              control={<Radio onClick={() => setParmition(!parmition)} checked={parmition} />}
              label=""
            />
            <TermsAndConditionText>
              I accept the <TermsAndConditionPinkText>Terms of Services</TermsAndConditionPinkText>&
              <TermsAndConditionPinkText>Privacy Policy</TermsAndConditionPinkText>
            </TermsAndConditionText>
          </Checkbox>
          <Buttons width="87%" isactive={parmition} onClick={() => activating()} title="Connect Wallet" />
        </WalletModalDiv>
      </Modal>
    </>
  );
};

export default WalletModal;
