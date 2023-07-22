import React from 'react';
import { styled } from '@mui/system';
import { Menu, MenuItem } from '@mui/material';
import { CHAINS } from '../../../config/chains';
import { useSetXSwapChain, useXSwapState } from 'store/xswap/hook';

const DropDownTitleIcon = styled('p')({
  fontWeight: '600',
  opacity: 0.65,
});
const SelectNetwork = styled('p')({
  fontWeight: '500',
  opacity: 0.4,
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

type ISelectChain = {
  isFromChain: boolean;
  anchorEl: HTMLElement;
  openmenu: boolean;
  handleClose: () => void | null;
};

const SelectChain = ({ anchorEl, openmenu, handleClose, isFromChain }: ISelectChain) => {
  const { fromChainId, toChainId } = useXSwapState();
  const setXswapChainId = useSetXSwapChain();

  const selectHandler = (chainId: number) => {
    setXswapChainId(isFromChain ? 'fromChainId' : 'toChainId', chainId);
    handleClose();
  };

  const selectedChainId = isFromChain ? toChainId : fromChainId;
  const selected = isFromChain ? fromChainId : toChainId;
  return (
    <div>
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
            <SelectNetwork>Select a Chain</SelectNetwork>
          </CustomMenuItem3>
          {Object.keys(CHAINS).map((chainIdKey) => {
            let chainInfo = CHAINS[parseInt(chainIdKey)];
            if (chainInfo?.exclude) return null;
            return (
              selectedChainId !== parseInt(chainIdKey) && (
                <CustomMenuItem key={chainIdKey} disabled={parseInt(chainIdKey) === selected}>
                  <CustomMenuItem2
                    onClick={() => {
                      selectHandler(parseInt(chainIdKey));
                    }}
                  >
                    <ImageIconDropDown src={chainInfo.icon} alt="Icon" />
                    <DropDownTitleIcon>{chainInfo.name}</DropDownTitleIcon>
                  </CustomMenuItem2>
                  {/* {chainId === parseInt(chainIdKey) ? <Right src="/images/icons/right.png" /> : null} */}
                </CustomMenuItem>
              )
            );
          })}
        </CustomMenu>
      </OverLay>
      {/* )} */}
    </div>
  );
};

export default SelectChain;
