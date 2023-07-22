import { styled } from '@mui/system';
import { Menu, useMediaQuery } from '@mui/material';
import React from 'react';
import UserAssets, { Tokens } from './UserAssets';
import { ThemeProps } from '../../theme';
import { useWeb3React } from '@web3-react/core';
import { getWalletInfo, sortAccount } from '../../utils/walletsUtils';
import { CHAINS } from '../../config/chains';
import { useDisconnect } from 'hooks/useWallet';
import { round } from 'lodash';
import Loader from 'components/CurrencyModal/Loader';
import { useRouter } from 'next/router';
import { useAppChainId } from 'store/user/hooks';

const Copy = styled('div')({
  paddingLeft: '10px',
  alignItems: 'center',
  display: 'flex',
  opacity: '0.65',
  cursor: 'copy',
  '&:hover': {
    backgroundColor: '#f7f7f7',
  },
});

const Id = styled('p')({
  fontWeight: '600',
});

const Copied = styled('p')((props: { theme?: ThemeProps }) => ({
  fontWeight: '600',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
}));

const DropPrice = styled('p')({
  fontWeight: '500',
  color: '#d4d4d4',
  marginLeft: 10,
});

const FileCopy = styled('img')({
  height: '20px',
  width: '20px',
  marginRight: '10px',
  cursor: 'pointer',
});

const RightIcon = styled('img')({
  height: '10px',
  width: '15px',
  paddingRight: '10px',
  cursor: 'pointer',
});

const HistoryDiv = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingLeft: 15,
  paddingTop: 10,
  paddingBottom: 10,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
});

const HistoryTitle = styled('p')({
  fontWeight: '600',
  color: 'black',
  marginLeft: 10,
  marginBottom: 10,
  marginTop: 10,
});

const MainDiv = styled('div')({
  alignItems: 'center',
  display: 'flex',
  cursor: 'pointer',
});

const CoinPrice = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#fafafa',
  padding: '0px 10px',
  fontWeight: '600',
  color: 'black',
  textTransform: 'initial',
  marginRight: '3%',
  borderRadius: 16,
  border: 'none',
  height: 52,
  width: '100%',
  cursor: 'pointer',
  '@media (max-width: 660px)': {
    background: '#f7f7f7',
    height: 36,
    width: 130,
    borderRadius: '100px',
    fontWeight: '500',
  },
});

const Into = styled('p')({
  backgroundColor: 'white',
  padding: '7px 20px',
  borderRadius: 16,
  marginLeft: 15,
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
  fontWeight: 600,
  // marginBottom: '6%',
  color: '#565656',
});

const ImageIconDropDown = styled('img')({
  // height: '30px',
  // width: '30px',
  marginRight: '20px',
  '@media (max-width: 660px)': {
    height: '20px',
    width: '20px',
    marginRight: '0px',
  },
});

const CustomMenu = styled('div')({
  borderRadius: 20,
  zIndex: 2,
  backgroundColor: 'white',
  boxShadow: '0px 3px 14px 0px #9c9c9c',
  width: '300px',
  paddingTop: 20,
  '@media (max-width: 660px)': {
    position: 'fixed',
    top: '15%',
    left: 5,
    width: '95%',
    padding: 5,
  },
});

const OverLay = styled(Menu)({
  width: '100%',
  backgroundColor: 'transparent',
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
const CoinDropIcon = styled('img')({
  height: '5.19px',
  width: '8.49px',
  marginLeft: 10,
});

const Balance = styled('p')({
  fontWeight: 600,
  color: '#565656',
});

// const nullObj = {
//   name: '',
//   coin: '',
// };

interface WalletDetailsProps {
  account: string;
  tokensWithNonZeroUSDBalance: Tokens[];
  netWorth: string;
  ethBalance: number;
}

const WalletDetails = ({ tokensWithNonZeroUSDBalance, netWorth, ethBalance }: WalletDetailsProps) => {
  const isDesktop = useMediaQuery('(min-width:660px)');
  const [open, setOpen] = React.useState(false);
  const [CopyId, setCopy] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openmenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const disconnect = useDisconnect();
  const handleClosemenuPrice = () => {
    setAnchorEl(null);
  };

  const disconnectWallet = () => {
    handleClosemenuPrice();
    disconnect();
  };

  const appChainId = useAppChainId();

  let { account, connector } = useWeb3React();
  let [walletName, walletIcon] = getWalletInfo(connector);

  return (
    <div>
      <CoinPrice onClick={handleClick}>
        <ImageIconDropDown src={walletIcon} alt="Coin" />
        <Balance>
          {(ethBalance && ethBalance !== undefined) || ethBalance === 0 ? (
            round(ethBalance ? ethBalance : 0, 3)
          ) : (
            <Loader width={20} />
          )}
          &nbsp;{CHAINS?.[appChainId]?.nativeCurrencyInfo.symbol}
        </Balance>
        {isDesktop ? (
          <>
            <Into>{sortAccount(account)}</Into>
            <CoinDropIcon src="/images/icons/downArrow.png" alt="DownArrow" />
          </>
        ) : null}
      </CoinPrice>

      <OverLay
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleClosemenuPrice}
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
          <DropPrice>Connected with {walletName}</DropPrice>
          {!CopyId ? (
            <Copy
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(account);
              }}
            >
              <FileCopy src="/images/icons/filecopy.png" alt="Copy" />
              <Id>{sortAccount(account)}</Id>
            </Copy>
          ) : (
            <Copy
              onClick={() => {
                setCopy(false);
              }}
            >
              <RightIcon src="/images/icons/right.png" alt="Copy" />
              <Copied>Copied!</Copied>
            </Copy>
          )}
          <UserAssets account={account as string} tokenList={tokensWithNonZeroUSDBalance} netWorth={netWorth} />
          <HistoryDiv>
            <MainDiv
              onClick={() => {
                handleOpen();
              }}
            >
              <img src="/images/icons/history.png" alt="History" />
              <HistoryTitle onClick={() => router.push('/history')}>History</HistoryTitle>
            </MainDiv>
            <MainDiv onClick={disconnectWallet}>
              <img src="/images/icons/disConnect.png" alt="Disconnect" />
              <HistoryTitle>{'Disconnect Wallet'}</HistoryTitle>
            </MainDiv>
          </HistoryDiv>
          {/* <SwapTransactionHistory
            close={() => {
              handleClose();
            }}
            isOpen={open}
          /> */}
        </CustomMenu>
      </OverLay>
    </div>
  );
};

export default WalletDetails;
