import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProps } from '..';

interface StyledButtonProps {
  isactive?: boolean;
  theme?: ThemeProps;
  href?: string;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'theme' && prop !== 'href',
})((props: StyledButtonProps) => ({
  background:
    props.theme && props.isactive
      ? props?.theme.palette.color.active
      : props.theme && props?.theme.palette.color.lightText,
  color:
    props.isactive && props.theme ? props?.theme.palette.color.white : props.theme && props?.theme.palette.color.text,
  height: 52,
  border: !props.isactive && props.theme ? '1px solid ' + props?.theme.palette.color.border : 'none',
  padding: '0px 18px',
  fontSize: '16px',
  ' &:hover': {
    color: '#fff',
  },
}));
