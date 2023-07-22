import { styled } from '@mui/system';
import { Button } from '@mui/material';
import React from 'react';
import { ThemeProps } from 'theme';

const BuyCryptoButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'theme' })(
  (props: { isactive: boolean; theme?: ThemeProps }) => ({
    background:
      props.isactive && props.theme
        ? props.theme.palette.color.active
        : props.theme && props.theme.palette.color.lightText,
    color:
      props.isactive && props.theme ? props.theme.palette.color.white : props.theme && props.theme.palette.color.text,
    border: !props.isactive && props.theme ? '1px solid ' + props.theme.palette.color.border : 'none',
    margin: '0px 7px',
    '@media (max-width: 660px)': {
      borderRadius: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      fontWeight: '600',
      opacity: '0.65',
      textTransform: 'initial',
      width: '80%',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      marginLeft: '10%',
      marginTop: '5%',
    },
    '&:hover': {
      color: '#fff',
    },
  }),
);

const BuyCrypto = () => {
  return <BuyCryptoButton isactive={false}>Buy Crypto</BuyCryptoButton>;
};

export default BuyCrypto;
