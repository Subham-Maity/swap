import React, { useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import WalletDetails from '../WalletDetails';
import Settings from '../Settings';
import AppFooter from '../AppFooter';
import SwitchNetwork from '../SwitchNetwork';
import { StyledButton } from '../../theme/GlobalComponent/globalStyleComponent';
import { useRouter } from 'next/router';
import { useOpenWalletModal } from 'store/app/hooks';
import { useWeb3React } from '@web3-react/core';
import { useActiveTokens } from 'store/tokens/hooks';
import { isEmpty } from 'lodash';
import settings from './settings';
import useNetworth from '../../hooks/useNetworth';
import useTokenBalances from 'hooks/useTokenBalances';
import { NATIVE_TOKEN_ADDRESS } from 'config';
import { currencyFormatter } from 'utils';
import { Tokens } from 'components/WalletDetails/UserAssets';
import { useAppChainId } from 'store/user/hooks';
import useUpdateSwapTransactionStatus from '../../hooks/useUpdateTransactionStatus';

const NavMainComponent = styled('div')({
  display: 'flex',
  paddingTop: 32,
  alignItems: 'center',
});

const Imgs = styled('img')({
  width: '90px',
  height: 43,
  marginTop: 5,
  cursor: 'pointer',
});

const ButtonGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'right',
  gap: 10,
});

const NavGrids = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px 45px',
});

const LogoGrid = styled(Grid)({
  marginRight: 0,
});

const ConnectWalletOverLay = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 2,
  cursor: 'pointer',
  paddingTop: 10,
});

const ConnectWalletMain = styled('div')({
  paddingLeft: 10,
  paddingRight: 5,
  paddingTop: '5%',
  paddingBottom: '10%',
  backgroundColor: 'white',
  margin: 5,
  borderRadius: 16,
  position: 'fixed',
  width: '93%',
  marginLeft: 13,
});

const TitleView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 0,
  marginBottom: 15,
  marginRight: '3%',
});

const ConnectWalletTitle = styled('span')({
  fontSize: '24px',
  fontWeight: '600',
  marginLeft: '3%',
});

const NavBar = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 76,
});

const NavImg = styled('img')({
  height: '36px',
  width: '36px',
  marginLeft: 10,
  marginRight: 10,
});

const DivFlex = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const BtnGroup = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  position: 'fixed',
  zIndex: 999,
  bottom: 0,
  paddingBottom: '4%',
  paddingTop: '5%',
});

const Logo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const AppBar = () => {
  const isDesktop = useMediaQuery('(min-width:660px)');
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const openWalletModal = useOpenWalletModal();
  useUpdateSwapTransactionStatus();
  let { active, account } = useWeb3React();
  let appChainId = useAppChainId();

  let tokenList = useActiveTokens(appChainId);
  const netWorth = useNetworth();
  const balance = useTokenBalances(appChainId);

  const tokenListWithPrice = React.useMemo(() => {
    if (isEmpty(tokenList)) return null;
    let newTokenList = [] as Tokens[];

    for (let k = 0; k < tokenList.length; k++) {
      let token = tokenList[k];
      let tokenBalanceInUSD = netWorth?.tokenWithUsdBalances[token.address.toLowerCase()];
      if (tokenBalanceInUSD > 0) {
        newTokenList.push({
          ...token,
          usdBalance: currencyFormatter(tokenBalanceInUSD),
        });
      }
    }

    return newTokenList;
  }, [tokenList, netWorth?.tokenWithUsdBalances]);

  return (
    <>
      {/* mobile Navbar  */}
      {!isDesktop && (
        <NavBar>
          <Logo>
            <NavImg src="/images/icons/mlogo.png" />
          </Logo>
          <DivFlex>
            <Settings settings={settings} />
            <NavImg
              src="/images/icons/mMenu.png"
              onClick={() => {
                setMenu(true);
              }}
            />
          </DivFlex>
        </NavBar>
      )}

      {isDesktop ? (
        <>
          <NavMainComponent>
            <NavGrids container>
              <LogoGrid item sm={1}>
                <Imgs src="/logo.png" alt="logo" onClick={() => router.push('/swap')} />
              </LogoGrid>
              <ButtonGrid item sm={11} md={8} lg={8} pr={1}>
                <StyledButton isactive={router.pathname === '/swap'} onClick={() => router.push('/swap')}>
                  Swap
                </StyledButton>
                <StyledButton isactive={router.pathname === '/crosschain'} onClick={() => router.push('/crosschain')}>
                  {/* <Img src="/images/icons/chain.png" /> */}
                  XSWAP
                </StyledButton>
                <SwitchNetwork />

                {!active && (
                  <StyledButton isactive={true} onClick={() => openWalletModal()}>
                    Connect Wallet
                  </StyledButton>
                )}

                {active && account !== undefined && (
                  <>
                    <WalletDetails
                      account={account as string}
                      tokensWithNonZeroUSDBalance={tokenListWithPrice}
                      netWorth={String(netWorth?.totalNetworth)}
                      ethBalance={balance?.[NATIVE_TOKEN_ADDRESS.toLowerCase()]}
                    />
                  </>
                )}

                <Settings settings={settings} />
              </ButtonGrid>
            </NavGrids>
          </NavMainComponent>
        </>
      ) : (
        // Mobile Main Content
        <>
          {menu && (
            <ConnectWalletOverLay>
              <ConnectWalletMain>
                <TitleView>
                  <ConnectWalletTitle onClick={() => openWalletModal()}>Connect Wallet</ConnectWalletTitle>
                  <img
                    src="/images/icons/cros.png"
                    onClick={() => {
                      setMenu(false);
                    }}
                    alt="Image"
                  />
                </TitleView>
                <AppFooter type="Mobile" />
              </ConnectWalletMain>
            </ConnectWalletOverLay>
          )}
        </>
      )}

      {isDesktop ? null : active && account !== undefined ? (
        <BtnGroup>
          <SwitchNetwork />
          <WalletDetails
            account={account as string}
            tokensWithNonZeroUSDBalance={tokenListWithPrice}
            netWorth={String(netWorth?.totalNetworth)}
            ethBalance={balance?.[NATIVE_TOKEN_ADDRESS.toLowerCase()]}
          />
        </BtnGroup>
      ) : (
        <BtnGroup>
          <StyledButton onClick={() => openWalletModal()} isactive={true}>
            Connect Wallet
          </StyledButton>
        </BtnGroup>
      )}
    </>
  );
};

export default AppBar;
