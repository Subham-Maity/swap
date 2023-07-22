import { styled } from '@mui/system';
import { Button, useMediaQuery } from '@mui/material';
import { ThemeProps } from 'theme';
import { url } from 'inspector';

const Footer = styled('div')({
  padding: '45px 32px',
  '@media (min-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const IconButton = styled("button")((props: { theme?: ThemeProps; icontype: string }) => ({
  borderRadius: 100,
  margin: 10,
  padding: '20px 0px',
  color: props.theme && props.theme.palette.color.dark,
  opacity: '0.65',
  height: 52,
  width: 52,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundImage: `url('/images/icons/${props.icontype}.png')`,
  border:'none',
  cursor: 'pointer',
  '&:hover': {
    background: props.theme && props.theme.palette.color.active,
    opacity: '1',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url('/images/icons/h${props.icontype}.png')`,
  },
}));

const MenuItem = styled(Button)((props: { theme?: ThemeProps }) => ({
  margin: 10,
  backgroundColor: 'transparent',
  padding: '20px 0px',
  color: props.theme && props.theme.palette.color.dark,
  opacity: '0.65',
  '&:hover': {
    backgroundColor: props.theme && props.theme.palette.color.lightText,
  },
}));

const IconSection = styled('div')({
  margin:'auto',
  marginTop:"75px",
  '@media (max-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '7%',
  },
});

const FooterMenu = styled('div')({
  '@media (max-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

type AppfooterProps = {
  type: string;
};

const AppFooter = (props: AppfooterProps) => {
  const isDesktop = useMediaQuery('(min-width:660px)');
  return (!isDesktop && props.type === 'Mobile') || (props.type === 'Window' && isDesktop) ? (
    <Footer>
      <IconSection>
        <IconButton icontype={"telegram"}></IconButton>
        <IconButton icontype={"github"}></IconButton>
        <IconButton icontype={"twitter"}></IconButton>
        <IconButton icontype={"discord"}></IconButton>
      </IconSection>
      <FooterMenu>
        {/* <MenuItem>FAQs</MenuItem>
        <MenuItem>Docs</MenuItem>
        <MenuItem>Careers</MenuItem> */}
      </FooterMenu>
    </Footer>
  ) : null;
};

export default AppFooter;
