import * as React from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Grid,
  Slider,
  StepConnector,
  stepConnectorClasses,
  Typography,
  useMediaQuery,
} from '@mui/material';
import IconGlobalStyleComponent from '../../../theme/GlobalComponent/iconGlobalStyleComponent';
import Modal from '../../Modal';
import Buttons from 'theme/Buttons';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Loader from 'components/CurrencyModal/Loader';
import { ThemeProps } from 'theme';
import { Quote } from 'hooks/useXswapQuotes';
import { useXSwapState } from 'store/xswap/hook';
import { CHAINS } from 'config/chains';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingBottom: 6,
  paddingTop: 0,
  height: 'auto',
  borderRadius: 5,
};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '82%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 6,
  paddingTop: 0,
  height: '95%',
  borderRadius: 5,
  overFlow: 'auto',
};

const MoveTokenModal = styled('div')((props: { theme?: ThemeProps }) => ({
  marginTop: 25,
  minWidth: '330px',
  [props.theme.breakpoints.up('md')]: {
    minWidth: '565px',
  },
}));
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
  paddingLeft: 25,
  paddingRight: 25,
});

const Title = styled('h2')({
  fontWeight: '600',
});
const TokenWrapper = styled('div')({
  backgroundColor: '#f7f7f7',
  minHeight: 98,
});
const Img = styled('img')((props: { theme?: ThemeProps }) => ({
  height: '36px',
  width: '36px',
  [props.theme.breakpoints.down('md')]: {
    height: '28px',
    width: '28px',
  },
}));
const SacnImg = styled('img')({
  height: 12,
  display: 'inline',
  width: 12,
  marginLeft: 5,
});
const Img2 = styled('img')({
  width: 20,
  height: 20,
  marginTop: 15,
  marginLeft: -17,
});
const TokenTitle = styled('span')((props: { theme?: ThemeProps }) => ({
  fontWeight: '600',
  opacity: 0.65,
  [props.theme.breakpoints.down('md')]: {
    fontWeight: '500',
    fontSize: '14px',
  },
}));
const TokenSubTitle = styled('p')({
  fontWeight: '500',
  opacity: 0.65,
  fontSize: 14,
});
const DottedBorder = styled(Box)((props: { theme?: ThemeProps }) => ({
  minWidth: 27,
  width: '100%',
  borderTop: '1px dotted #c669d2',
  // margin: 'auto',
  marginTop: '30%',
  [props.theme.breakpoints.down('md')]: {
    // marginTop: '50%',
    minWidth: 55,
  },
}));
const BridgeImg = styled('img')((props: { theme?: ThemeProps }) => ({
  height: '28px',
  width: '28px',
  marginRight: '8px',
  [props.theme.breakpoints.down('md')]: {
    height: '20px',
    width: '20px',
    marginRight: '0px',
  },
}));
const BridgeImg2 = styled('img')({
  height: '28px',
  width: '28px',
  marginLeft: '2px',
});
const BridgeImg3 = styled('img')({
  height: '12px',
  width: '12px',
  marginLeft: '2px',
  margin: 'auto',
});
const LoaderImg = styled('img')({
  height: '12px',
  width: '12px',
  marginRight: '5px',
  animation: 'rotation 2s linear infinite',
  verticalAlign: 'middle',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  },
});
const BridgeText = styled('span')((props: { theme?: ThemeProps }) => ({
  [props.theme.breakpoints.down('md')]: {
    fontSize: '12px',
    display: 'none',
  },
}));
const BridgeBox = styled(Box)((props: { theme?: ThemeProps }) => ({
  display: 'inline-flex',
  marginTop: '-25px',
  background: '#f7f7f7',
  padding: '8px 12px',
  borderRadius: 16,
  [props.theme.breakpoints.down('md')]: {
    padding: '4px 8px',
  },
}));
const SliderUi = styled(Slider)({
  color: '#BB36FF',
  marginLeft: '5%',
  width: '90%',
});
const BridgingBox = styled(Box)({
  background: '#F7F7F7',
  border: '1px solid #E5E5E5',
  borderRadius: 100,
  maxWidth: 128,
  minWidth: 100,
  fontSize: '14px',
  color: '#999999',
  padding: 2,
  paddingLeft: 12,
  alignItems: 'center',
  width: 'fit-content',
  height: 28,
  margin: 'auto',
});
const TokenBox = styled(Box)((props: { theme?: ThemeProps }) => ({
  padding: '32px 8px 32px 32px',
  display: 'flex',
  [props.theme.breakpoints.down('md')]: {
    padding: '16px 4px 16px 4px',
  },
}));
const Connector = styled(StepConnector)({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: '1px dashed #BB36FF',
      borderTopWidth: 0,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: '1px dashed #BB36FF',
      borderTopWidth: 0,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    border: '1px dashed #BB36FF',
    borderRadius: 1,
    borderTopWidth: 0,
  },
});
const StepIconRoot = styled('div')((props: { ownerState: boolean }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(props.ownerState && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));
// const steps = ['Swap & Deposit', 'Switch Chain', 'Swap'];

const steps: { [key in string]: string[] } = {
  ['2OA67HS611']: ['Swap & Deposit', 'Switch Chain', 'Swap'], // when token not available on both chain
  ['CFEE4UL9UX']: ['Switch Chain'], // when token available on both chain
  ['AR25AOPQZ7']: ['Swap & Deposit', 'Switch Chain'], // when token not available on source chain, but available on destination chain
  ['V3WGIZ5Y91']: ['Switch Chain', 'Swap'], // when token availble on source chain, but not availble on destination chain
};

interface MoveTokenProps {
  isMoveOpen: boolean;
  moveOpenHandler: () => void;
  selectedQuote: Quote;
}

const MoveToken = ({ isMoveOpen, moveOpenHandler, selectedQuote }: MoveTokenProps) => {
  const [isSwap, setSwap] = React.useState<boolean>(false);
  const [isSwapping, setSwapping] = React.useState<boolean>(false);
  const [approveState, setApprove] = React.useState<string>('Approve');
  const [bridgingState, setBridging] = React.useState<string>('Bridge');
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { fromToken, toToken, fromChainId } = useXSwapState();
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const isDesktop = useMediaQuery('(min-width:660px)');
  const handleApproveState = () => {
    if (approveState === 'Approve') {
      setApprove('Approving');
    } else if (approveState === 'Approving') {
      setApprove('Approved');
      setActiveStep(1);
    } else {
      setApprove('Approve');
    }
  };
  const handleBridgeState = () => {
    if (bridgingState === 'Bridge') {
      setBridging('Bridging');
    } else if (bridgingState === 'Bridging') {
      setBridging('Bridged');
    } else {
      setBridging('Bridge');
    }
  };
  const handleSwitchchain = () => {
    setSwap(true);
    setActiveStep(2);
  };
  const handleSwapchain = () => {
    setSwapping(true);
  };
  function StepIcon(props: { active: boolean; completed: boolean; className: string }) {
    const { active, completed, className } = props;
    return (
      <StepIconRoot ownerState={active} className={className}>
        {completed ? (
          <>
            <Img src={'/images/icons/completed.png'} alt="Coin" />
          </>
        ) : (
          <Img src={'/images/icons/remaining.png'} alt="Coin" />
        )}
      </StepIconRoot>
    );
  }
  return (
    <>
      <Modal isOpen={isMoveOpen} close={moveOpenHandler} modalTitle="Move Token">
        <MoveTokenModal>
          <div>
            <TokenWrapper>
              <Grid container>
                <Box sx={{ width: '100%' }} mt={3}>
                  <Stepper activeStep={activeStep} alternativeLabel connector={<Connector />}>
                    {steps?.[selectedQuote?.bridgeCase]?.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Grid>
            </TokenWrapper>
            <Grid container>
              <Grid item margin="auto" md={4}>
                <TokenBox>
                  <Img src={'/images/icons/eth.png'} alt="Coin" />
                  <Img2 src={'/images/icons/coin3.png'} alt="Coin" />
                  <Box ml={1}>
                    <TokenTitle>
                      {selectedQuote?.fromAmount} {fromToken?.symbol}
                    </TokenTitle>
                    <TokenSubTitle>
                      on {CHAINS?.[fromChainId]?.nativeCurrency}
                      {bridgingState === 'Bridged' && <SacnImg src={'/images/icons/scan.png'} alt="Coin" />}
                    </TokenSubTitle>
                  </Box>
                </TokenBox>
              </Grid>
              <Grid item margin="auto" md={4}>
                <DottedBorder />
                <Box textAlign={'center'} marginTop={'-5px'}>
                  <BridgeBox display={'flex'} margin="auto">
                    <BridgeImg src={'/images/icons/bridge.png'} alt="Coin" />
                    <BridgeText>Bridge</BridgeText>
                  </BridgeBox>
                </Box>
              </Grid>
              <Grid item margin="auto" md={4}>
                <TokenBox>
                  <Box mr={1}>
                    <TokenTitle>
                      {selectedQuote?.toAmount} {toToken?.symbol}
                    </TokenTitle>
                    <TokenSubTitle>
                      on Polygon&nbsp;
                      {isSwapping && <Loader width={12} />}
                    </TokenSubTitle>
                  </Box>
                  <Img src={'/images/icons/coin3.png'} alt="Coin" />
                  <Img2 src={'/images/icons/eth.png'} alt="Coin" />
                </TokenBox>
              </Grid>
            </Grid>
            <Grid container mt={0}>
              {/* <Grid item md={12} mb={1}>
                    <Box p={2} textAlign="center">
                      <h3>43%</h3>
                      <Typography ml={2}>Please approve</Typography>
                    </Box>
                    <Box pl={4} pr={4}>
                      <SliderUi defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                    </Box>
                    <Box pl={5} pr={5}>
                      <Grid container spacing={2}>
                        <Grid item md={4} textAlign="center">
                          <BridgingBox display="flex">
                            Bridging via
                            <BridgeImg2 src={'/images/icons/bridge.png'} alt="Coin" />
                          </BridgingBox>
                        </Grid>
                        <Grid item md={4} textAlign="center">
                          <BridgingBox display="flex">
                            From tx
                            <BridgeImg3 src={'/images/icons/tx.png'} alt="Coin" />
                          </BridgingBox>
                        </Grid>
                        <Grid item md={4} textAlign="center">
                          <BridgingBox display="flex">
                            Dest tx
                            <BridgeImg3 src={'/images/icons/loading.png'} alt="Coin" />
                          </BridgingBox>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid> */}
              <>
                {/* <Grid item md={12} mb={1}>
                      <Box p={2} display="flex">
                        <img height={'52px'} width={'52px'} src={'/images/icons/mToken.png'} alt="Coin" />
                        <Typography ml={2}> 0.45 ETH on Solana to 82.7 USDT on Polygon via Polygon bridge</Typography>
                      </Box>
                    </Grid> */}
                {bridgingState !== 'Bridged' ? (
                  <>
                    <Grid item margin="auto" md={6}>
                      <Buttons
                        width="100%"
                        isactive={approveState !== 'Approved'}
                        onClick={handleApproveState}
                        title={
                          <>
                            {approveState === 'Approving' && (
                              <LoaderImg src={'/images/icons/loaderImg.png'} alt="Coin" />
                            )}
                            {approveState}
                          </>
                        }
                      />
                    </Grid>
                    <Grid item margin="auto" md={6}>
                      <Buttons
                        width="100%"
                        isactive={bridgingState !== 'Bridge'}
                        onClick={handleBridgeState}
                        title={
                          <>
                            {bridgingState === 'Bridging' && (
                              <LoaderImg src={'/images/icons/loaderImg.png'} alt="Coin" />
                            )}
                            {bridgingState}
                          </>
                        }
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item md={6} margin="auto">
                    {isSwap ? (
                      <Buttons width="90%" isactive={!isSwapping} onClick={handleSwapchain} title={'Swap'} />
                    ) : (
                      <Buttons width="90%" isactive={true} onClick={handleSwitchchain} title={'Switch Chain'} />
                    )}
                  </Grid>
                )}
              </>
            </Grid>
          </div>
        </MoveTokenModal>
        {/* </Box> */}
      </Modal>
    </>
  );
};
export default MoveToken;
