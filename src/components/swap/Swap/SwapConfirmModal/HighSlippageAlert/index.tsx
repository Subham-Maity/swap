import { styled } from '@mui/system';
import React, { useState } from 'react';
import { Button, Box, FormControlLabel, Radio } from '@mui/material';
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
  height: '50%',
  borderRadius: 5,
};

const Buttons = styled(Button)((props: { theme?: ThemeProps }) => ({
  borderRadius: 12,
  background: props.theme && props.theme.palette.color.active,
  color: 'white',
  textTransform: 'initial',
  display: 'block',
  margin: 'auto',
  opacity: 0.4,
}));

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

const Parmition = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '2%',
  marginBottom: 20,
});

const ConditionPink = styled('span')((props: { theme?: ThemeProps }) => ({
  fontWeight: '600',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  marginRight: 5,
}));

const Condition = styled('p')({
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: 'rgba(0, 0, 0, 0.65)',
});

const HighSlippage = () => {
  const [Check, setCheck] = useState(false);

  return (
    <Box sx={style}>
      <HighSlippageModal>
        <CompletedIcon src="/images/icons/highSlippage.png" alt="Image" />
        <Title>High Slippage Alert</Title>
        <SubTitle>Slippage is higher than normal trades. Swap results can be different than usual.</SubTitle>
        <Parmition>
          <FormControlLabel
            control={
              <Radio
                onClick={() => {
                  setCheck(!Check);
                }}
                checked={Check}
              />
            }
            label=""
          />
          <Condition>
            I accept the &nbsp; <ConditionPink>Terms of Services</ConditionPink>&
            <ConditionPink>&nbsp;Privacy Policy</ConditionPink>
          </Condition>
        </Parmition>
        {Check ? <ButtonsActive onClick={() => null}>Close</ButtonsActive> : <Buttons>Close</Buttons>}
      </HighSlippageModal>
    </Box>
  );
};

export default HighSlippage;
