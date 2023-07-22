import React, { useState } from 'react';
import { styled } from '@mui/system';
import ConnectButton from './ConnectButton';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
const Nav = styled('div')({
  padding: 15,
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Text = styled('h2')({
  marginLeft: 10,
});

const Logo = styled('span')({
  display: 'flex',
  alignItems: 'center',
});

const Explore = styled('p')({
  color: '#666666',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#666666',
  borderRadius: '100%',
  padding: 7,
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const Input = styled('input')({
  border: 'none',
  padding: 10,
  backgroundColor: 'transparent',
  width: '350px',
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const Inputtype = styled('div')({
  backgroundColor: '#eeebf0',
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  paddingLeft: '2%',
  borderRadius: '12px',
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const Img = styled('img')({
  height: '20px',
  width: '20px',
});

const Dark = styled('img')({
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const Serchdiv = styled('div')({
  display: 'flex',
  width: '50%',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Menu = styled('div')((props: { isactive: boolean }) => ({
  position: 'absolute',
  backgroundColor: 'white',
  height: '100%',
  width: '100vw',
  padding: '20px',
  display: 'none',
  '@media (max-width: 1199px)': {
    display: props.isactive ? 'block' : 'none',
  },
}));

const MenuItem = styled('a')({
  textDecoration: 'none',
  color: '#666666',
  fontWeight: '600',
  fontSize: 18,
});

const List = styled('li')({
  listStyle: 'none',
  marginTop: 5,
  padding: 10,
});

const BtnNone = styled('div')({
  display: 'block',
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const ToggleButton = styled('div')({
  display: 'none',
  '@media (max-width: 1199px)': {
    display: 'block',
  },
});

const LogoImg = styled('img')({
  display: 'block',
  '@media (max-width: 1199px)': {
    display: 'none',
  },
});

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <Nav>
        <Logo>
          <LogoImg src="/images/icons/Navlogo.png" />
          <Text>Cryptoverse</Text>
        </Logo>
        <Explore>Explore</Explore>
        <Serchdiv>
          <Inputtype>
            <Img src="/images/icons/search.png" />
            <Input type="text" placeholder="Search by Token Name, Symbol or Address" />
          </Inputtype>
          <BtnNone>
            <ConnectButton />
          </BtnNone>
          <Dark src="/images/icons/Switch.png" />
        </Serchdiv>
        <ToggleButton>
          <IconGlobalStyleComponent
            onClick={() => {
              setNavbar(!navbar);
            }}
            ml={0}
            mr={navbar ? 10 : 0}
            height={navbar ? 20 : 40}
            width={navbar ? 20 : 40}
            img={navbar ? '/images/icons/cros.png' : '/images/icons/mMenu.png'}
            opecity={1}
          />
        </ToggleButton>
      </Nav>
      <Menu isactive={navbar}>
        <ul>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Home
            </MenuItem>
          </List>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Explore
            </MenuItem>
          </List>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Request New Features
            </MenuItem>
          </List>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Buy Crypto with Fiat
            </MenuItem>
          </List>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Blog
            </MenuItem>
          </List>
          <List>
            <MenuItem
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Help Center
            </MenuItem>
          </List>
        </ul>
        <ConnectButton />
      </Menu>
    </>
  );
};

export default Navbar;
