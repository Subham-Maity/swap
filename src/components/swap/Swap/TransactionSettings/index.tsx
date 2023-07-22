import { styled } from '@mui/system';
import { Button, FormControlLabel, Radio, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { ThemeProps } from 'theme';
import { SWAP_VIEWS } from 'hooks/useSwapState';
import { useUserTransactionSetting } from '../../../../store/user/hooks';
import { setTransactionSetting } from 'store/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import useGetGasPrice from '../../../../hooks/useGetGasPrice';

const TransactionSettingsModal = styled('div')((props: { isMount: boolean }) => ({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  width: '100%',
  paddingBottom: '8%',
  marginTop: '12%',
  paddingLeft: 15,
  paddingRight: 15,
  animation: props.isMount ? 'inAnimation 250ms ease-in' : 'outAnimation 270ms ease-out',
  animationFillMode: !props.isMount && 'forwards',
}));
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '5%',
  paddingRight: '5%',
});
const TransactionSettingTitle = styled('h2')({
  fontWeight: '600',
  color: 'black',
  marginTop: 24,
});
const Slippage = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5%',
  opacity: '0.65',
  marginBottom: 20,
  marginTop: 20,
});
const SlippageText = styled('p')({
  fontWeight: '600',
  color: 'black',
  // paddingTop: '3%',
});
const QuestionIcon = styled('img')({
  height: 20,
  width: 20,
  marginLeft: 5,
  opacity: '0.65',
});
const AutoButtonGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const CustomButtonDisebal = styled(Button)({
  borderRadius: '16px',
  background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  padding: '7px 24px',
  fontSize: '16px',
  fontWeight: '600',
  color: 'white',
  textTransform: 'initial',
  marginLeft: '5%',
  marginRight: '2.5%',
  height: '52px',
  width: '47%',
  borderColor: 'black',
  borderStyle: 'solid',
});
const MainInput = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingRight: 10,
  marginLeft: '5%',
  marginRight: '5%',
  borderRadius: '16px',
  height: '52px',
  marginBottom: 36,
});
const TextInput = styled('input')({
  width: '80%',
  height: '52px',
  paddingLeft: '5%',
  marginRight: '5%',
  backgroundColor: '#f7f7f7',
  borderBottom: 0,
  border: 'none',
  fontWeight: 500,
  borderRadius: 10,
  fontSize: '24px',
  '&:focus-visible': {
    outline: 'none',
  },
});
const FlexViewJustyfy = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: 26,
  marginBottom: 18,
});
const PriseText = styled('p')({
  fontWeight: '600',
  '@media (max-width: 660px)': {
    fontSize: '14px',
  },
});
const TimeText = styled('p')({
  fontWeight: '600',
  color: '#cccccc',
  display: 'flex',
  alignItems: 'center',
});
const TimeTextPink = styled('p')((props: { theme?: ThemeProps }) => ({
  fontWeight: '500',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 660px)': {
    // background: props.theme && props.theme.palette.color.active,
  },
}));
const DownArrowIcon = styled('img')({
  height: '7.78px',
  width: '12.73px',
  marginLeft: 10,
  cursor: 'pointer',
});
const Settings = styled('p')({
  fontWeight: '600',
  marginLeft: '5%',
  marginTop: 16,
  marginBottom: 12,
});
const FlexRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '5%',
  marginRight: '5%',
});
const AutoRout = styled('p')({
  fontWeight: '500',
  color: '#b3b3b3',
});
const MainRow = styled('div')({});
const MainDivs = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '5%',
  marginRight: '5%',
});
const DivForms = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '40%',
  justifyContent: 'space-between',
});
const GasPrice = styled('p')({
  fontWeight: '500',
  color: '#b3b3b3',
});
const Span = styled('p')({
  fontWeight: '500',
  color: '#b3b3b3',
});
const CloseImage = styled('img')({
  cursor: 'pointer',
  marginTop: 24,
});
const CheckedIcon = styled('div')({
  width: 24,
  height: 24,
  backgroundColor: '#FFFFFF',
  borderRadius: '50%',
  marginTop: 4,
  marginLeft: 5,
});
const CheckedSwitch = styled(Switch)((props: { theme?: ThemeProps }) => ({
  height: 51,
  width: 71,
  color: 'green',
  '.MuiSwitch-track': {
    borderRadius: 20,
    background: '#000000',
    opacity: 0.09,
  },
  '.Mui-checked + .MuiSwitch-track': {
    opacity: 1,
    background: props.theme.palette.color.active,
  },
}));
const RadioButton = styled(Radio)({
  padding: 5,
});
interface TransactionSettingsProps {
  resetView: (view: SWAP_VIEWS) => void;
  swapView: number;
}

const onUppercase = (label: string): string => {
  let firstLetter = label?.charAt(0);
  return firstLetter?.toUpperCase() + label?.slice(1);
};

const TransactionSettings = ({ resetView, swapView }: TransactionSettingsProps) => {
  let [showMore, setShowMore] = useState<boolean>(false);
  let dispatch = useDispatch<AppDispatch>();

  const gasPrices = useGetGasPrice();

  const { slippage, deadLine, gasSpeedSelect, autoRouterAPI } = useUserTransactionSetting();

  const transactionSettingHandler = (key: string, configDetail: string | number | boolean) => {
    dispatch(setTransactionSetting({ key, configDetail }));
  };

  return (
    <TransactionSettingsModal isMount={swapView === SWAP_VIEWS.SWAP_SETTINGS}>
      <div
        style={{
          transition: 'all 0.6s ease',
        }}
      >
        <Header>
          <TransactionSettingTitle>Transaction Settings</TransactionSettingTitle>
          <CloseImage src="/images/icons/cros.png" onClick={() => resetView(SWAP_VIEWS.SWAP)} alt="Close" />
        </Header>
        <Slippage>
          <SlippageText>Slippage Tolerance</SlippageText>
          <Tooltip title="Your transaction will revert if the price changes unfavorably by more than this percentage.">
            <QuestionIcon src="/images/image/puestion.svg" alt="QuestionIcon" />
          </Tooltip>
        </Slippage>
        <AutoButtonGroup>
          <CustomButtonDisebal>Auto</CustomButtonDisebal>
          {/* <CustomButtonActiveNumber>{slippage} %</CustomButtonActiveNumber> */}
          <TextInput
            placeholder="0%"
            value={slippage}
            type="number"
            onChange={(e) => transactionSettingHandler('slippage', parseFloat(e.target.value))}
          />
        </AutoButtonGroup>
        <Slippage>
          <SlippageText>Transaction Deadline</SlippageText>
          <Tooltip title="Your transaction will revert if it is pending for more than this period of time.">
            <QuestionIcon src="/images/image/puestion.svg" alt="QuestionIcon" />
          </Tooltip>
        </Slippage>
        <MainInput>
          <AutoButtonGroup>
            <TextInput
              placeholder="0"
              value={deadLine}
              onChange={(e) => transactionSettingHandler('deadLine', parseFloat(e.target.value))}
            />
            <Span>Minutes</Span>
          </AutoButtonGroup>
        </MainInput>
        <hr />
        <FlexViewJustyfy>
          <PriseText>Gas Price</PriseText>
          {showMore ? (
            <TimeText>
              <Span>
                {onUppercase(gasSpeedSelect)} {gasPrices?.speeds?.[gasSpeedSelect]?.gasPrice?.toFixed(3)} ( GWEI)
              </Span>
              <DownArrowIcon
                src="/images/icons/downArrow.png"
                onClick={() => {
                  setShowMore(!showMore);
                }}
                alt="DownArrow"
              />
            </TimeText>
          ) : (
            <TimeTextPink>
              {onUppercase(gasSpeedSelect)} {gasPrices?.speeds?.[gasSpeedSelect]?.gasPrice?.toFixed(3)} ( GWEI)
              <DownArrowIcon
                onClick={() => {
                  setShowMore(!showMore);
                }}
                src="/images/icons/topArrow.png"
                alt="TopArrow"
              />
            </TimeTextPink>
          )}
        </FlexViewJustyfy>
        {!showMore ? (
          <>
            {gasPrices &&
              Object.keys(gasPrices?.speeds).map((key, _i) => {
                let speed = gasPrices?.speeds[key];
                return (
                  <MainDivs key={_i}>
                    <DivForms>
                      <FormControlLabel
                        value={speed?.speed}
                        checked={gasSpeedSelect === speed?.speed}
                        control={<RadioButton />}
                        label={onUppercase(speed?.speed)}
                        onClick={() => transactionSettingHandler('gasSpeedSelect', speed?.speed)}
                      />
                      {/* <Comper>{'<10Sec'}</Comper> */}
                    </DivForms>
                    <GasPrice>{speed?.gasPrice.toFixed(3)} GWEI</GasPrice>
                  </MainDivs>
                );
              })}
          </>
        ) : (
          ''
        )}
        <Settings>Interface Settings</Settings>
        <FlexRow>
          <MainRow>
            <AutoButtonGroup>
              <AutoRout>Auto Route</AutoRout>
              <Tooltip title="Use the Plug Labs API to get faster quotes.">
                <QuestionIcon src="/images/image/puestion.svg" alt="Icon" />
              </Tooltip>
            </AutoButtonGroup>
            <CheckedSwitch
              checked={autoRouterAPI}
              color="secondary"
              icon={<CheckedIcon />}
              checkedIcon={<CheckedIcon />}
              onClick={() => transactionSettingHandler('autoRouterAPI', !autoRouterAPI)}
            />
          </MainRow>
          <MainRow>
            <AutoButtonGroup>
              <AutoRout>Expert Mode</AutoRout>
              <Tooltip title="Allow high price impact trades and skip the confirm screen. Use at your own risk.">
                <QuestionIcon src="/images/image/puestion.svg" alt="Icon" />
              </Tooltip>
            </AutoButtonGroup>
            <CheckedSwitch
              defaultChecked={false}
              color="secondary"
              icon={<CheckedIcon />}
              checkedIcon={<CheckedIcon />}
            />
          </MainRow>
        </FlexRow>
      </div>
    </TransactionSettingsModal>
  );
};

export default TransactionSettings;
