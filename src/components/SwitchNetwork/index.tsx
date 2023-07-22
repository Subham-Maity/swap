import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { Menu, MenuItem } from '@mui/material';
import { CHAINS } from 'config/chains';
import { StyledButton } from 'theme/GlobalComponent/globalStyleComponent';
import { useAppChainId, useSwitchChainId } from '../../store/user/hooks';
import { useWeb3React } from '@web3-react/core';

const ImageIcon = styled('img')({
  height: 35,
  width: 35,
  marginRight: 10,
  '@media (max-width: 660px)': {
    height: '20px',
    width: '20px',
  },
});
const Title = styled('p')({
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: `url('/images/icons/downArrow.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right',
  textAlign: 'start',
  minWidth: 47,
  paddingRight: 28,
  '&:hover': {
    backgroundImage: `url('/images/icons/downIconWhite.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  },
});
const DropDownTitleIcon = styled('p')({
  fontWeight: '600',
  opacity: 0.65,
});
const SelectNetwork = styled('p')({
  fontWeight: '500',
  opacity: 0.4,
});
const CoinDropIcon = styled('div')({
  height: '5.19px',
  width: '8.49px',
  marginLeft: 10,
});
const CustomMenu = styled('div')({
  borderRadius: 20,
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  paddingBottom: 0,
  '@media (max-width: 660px)': {},
});
const OverLay = styled(Menu)({
  width: '100%',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  paddingLeft: '6%',
  '@media (max-width: 660px)': {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  '.MuiMenu-paper': {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    borderRadius: 20,
    // top:'75px!important'
  },
  '.MuiMenu-list': {
    paddingBottom: 0,
  },
});
const CustomMenuItem = styled(MenuItem)({
  paddingTop: 7,
  paddingBottom: 7,
  paddingRight: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const CustomMenuItem3 = styled(MenuItem)({
  paddingTop: 7,
  paddingBottom: 7,
  paddingRight: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: 'white',
  },
});

const CustomMenuItem2 = styled('div')({
  paddingRight: '70px',
  display: 'flex',
  alignItems: 'center',
});

const ImageIconDropDown = styled('img')({
  height: '36px',
  width: '45px',
  paddingRight: '10px',
});

const SwitchNetwork = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openmenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let appChainId = useAppChainId();

  const { active, account } = useWeb3React();

  const changeChainId = useSwitchChainId();

  let memorizedSelectedChainInfo = useMemo(() => {
    return CHAINS[appChainId];
  }, [appChainId]);

  return (
    <div>
      <StyledButton
        id="demo-positioned-button"
        aria-controls={openmenu ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openmenu ? 'true' : undefined}
        onClick={handleClick}
      >
        <Title>
          <ImageIcon src={memorizedSelectedChainInfo?.icon} alt="Icon" />

          {memorizedSelectedChainInfo?.name}
        </Title>
        {/* <CoinDropIcon /> */}
      </StyledButton>
      {/* {openmenu && ( */}
      <OverLay
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <CustomMenu>
          <CustomMenuItem3>
            <SelectNetwork>Select a Network</SelectNetwork>
          </CustomMenuItem3>
          {Object.keys(CHAINS).map((chainIdKey) => {
            let chainInfo = CHAINS[parseInt(chainIdKey)];
            if (chainInfo?.exclude) return null;
            return (
              <CustomMenuItem key={chainIdKey} disabled={parseInt(chainIdKey) === appChainId}>
                <CustomMenuItem2
                  onClick={() => {
                    changeChainId(parseInt(chainIdKey), !(active && account)), handleClose();
                  }}
                >
                  <ImageIconDropDown src={chainInfo.icon} alt="Icon" />
                  <DropDownTitleIcon>{chainInfo.name}</DropDownTitleIcon>
                </CustomMenuItem2>
                {/* {chainId === parseInt(chainIdKey) ? <Right src="/images/icons/right.png" /> : null} */}
              </CustomMenuItem>
            );
          })}
        </CustomMenu>
      </OverLay>
      {/* )} */}
    </div>
  );
};

export default SwitchNetwork;
