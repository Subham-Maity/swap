import { styled } from '@mui/system';
import { Button } from '@mui/material';
import React from 'react';
import { ThemeProps } from 'theme';

const OrderBtn = styled(Button, { shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'width' })(
  (props: { width: string; isactive: boolean ,theme:ThemeProps}) => ({
    margin: 15,
    width: props.width,
    background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
    color: 'white',
    borderRadius: '12px',
    marginBottom: '6%',
    marginTop: '5%',
    marginLeft: '5%',
    textTransform: 'initial',
    opacity: props.isactive ? 1 : 0.4,
    fontWeight: '800',
    height: '52px',
    [props.theme.breakpoints.down('md')]: {
     padding:'10px 24px'
    },
  }),
);

const Buttons = (props: {
  onClick: () => void;
  width: string;
  isactive: boolean;
  title:
    | string
    | number
    | boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <OrderBtn
      onClick={() => {
        props.onClick();
      }}
      width={props.width}
      isactive={props.isactive}
    >
      {props.title}
    </OrderBtn>
  );
};

export default Buttons;
