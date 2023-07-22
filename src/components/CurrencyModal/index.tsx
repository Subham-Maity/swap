import { styled } from '@mui/system';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Skeleton, useMediaQuery } from '@mui/material';
import React, { useMemo, useState } from 'react';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import ImportTokenModal from '../ImportTokenModal';
import { SWAP_VIEWS } from 'hooks/useSwapState';
import { useSetSwapTokens } from 'store/swap/hooks';
import { CURRENCY_MODAL_CALLS } from 'hooks/useCurrencyModalState';
import { isEmpty } from 'lodash';
import { useSearchResults, useSearchTokens } from '../../hooks/useSearchTokens';
import useTokenBalances from 'hooks/useTokenBalances';
import { useImportToken } from 'store/tokens/hooks';
import { roundValue } from 'utils';
import Loader from './Loader';
import { useSetXSwapTokens } from 'store/xswap/hook';
import { useWeb3React } from '@web3-react/core';
import { supportedChainIds } from 'connectors';

const CurrencyCard = styled('div')((props: { isMount: boolean }) => ({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  width: '100%',
  animation: props.isMount ? 'inAnimation 100ms ease-in' : 'outAnimation 270ms ease-out',
  animationFillMode: !props.isMount && 'forwards',
  padding: '24px 0px',
  paddingBottom: '10px',
}));

const SelectTokenTitle = styled('p')({
  fontSize: '24px',
  fontWeight: 600,
});

const SelectTokenMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 10,
  marginBottom: 10,
});

const TextInputMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F7F7F7',
  borderRadius: '16px',
  paddingLeft: '4%',
  marginLeft: 25,
  marginRight: 25,
});

const TextInputActive = styled('input')({
  marginLeft: 10,
  width: '100%',
  border: 'none',
  height: 52,
  backgroundColor: 'transparent',
  '&:focus-visible': {
    border: 'none',
    outline: 'none',
  },
});

const Count = styled('p')({
  fontWeight: 600,
});

const ImportTokenButton = styled('button')({
  width: 'fit-content',
  padding: '2px 16px',
  backgroundColor: '#c245ef',
  borderRadius: '100px',
  fontSize: '16px',
  color: '#fff',
  border: 0,
  cursor: 'pointer',
  lineHeight: '32px',
  letterSpacing: '0.01em',
});

const ListItemTextStyle = styled(ListItemText)({
  fontWeight: 600,
});

const Type = styled('span')({
  opacity: 0.5,
  marginRight: 10,
  fontWeight: 600,
});

const ListRow = styled(ListItemButton)<{ hasimported: boolean }>(({ hasimported, theme }) => ({
  height: 53,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0px 25px',
  '&:hover': {
    background: hasimported ? 'transparent !important' : theme.palette.color.buttonBackground,
  },
}));

const TokenList = styled(List)({
  height: 450,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    // display: 'none',
    width: 10,
    background: '#c05ddf',
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#fff',
    borderRadius: 3,
  },
});

const TokenImage = styled('img')({
  height: 36,
  width: 36,
  borderRadius: 25,
});

const SearchIcon = styled('img')({
  opacity: 0.5,
});
const SkeletonWrapper = styled(Box)({
  display: 'flex',
  marginBottom: 12,
  padding: '0px 25px',
});
const CoinSkeleton = styled(Skeleton)({
  width: '100%',
  marginLeft: 12,
});

export type CurrencyModalProps = {
  swapView: number;
  currencyModalCall: number;
  resetView: (view: SWAP_VIEWS) => void;
  chainId: number;
  fromToken: string;
  toToken: string;
  isXswap?: boolean;
};

const CurrencyModal = ({
  swapView,
  currencyModalCall,
  resetView,
  chainId,
  fromToken,
  toToken,
  isXswap,
}: CurrencyModalProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  let [searchValue, setSearchValue] = useSearchTokens();

  let { tokenResults: tokens, hasImported } = useSearchResults(searchValue, chainId);

  const isDesktop = useMediaQuery('(min-width:660px)');
  const tokenBalances = useTokenBalances(chainId);
  const { account, chainId: connectedChainId } = useWeb3React();

  // set swap tokens
  const setSwapTokens = useSetSwapTokens();
  const setXswapTokens = useSetXSwapTokens();
  const setTokens = useMemo(
    () => (!isXswap ? setSwapTokens : setXswapTokens),
    [isXswap, setSwapTokens, setXswapTokens],
  );

  const importToken = useImportToken();

  return (
    <>
      {swapView === SWAP_VIEWS.TOKENLIST_VIEW ? (
        <CurrencyCard isMount={swapView === SWAP_VIEWS.TOKENLIST_VIEW} style={{ height: isDesktop ? '50%' : '560px' }}>
          <SelectTokenMain>
            <SelectTokenTitle>Select a Token</SelectTokenTitle>
            <IconGlobalStyleComponent
              onClick={() => resetView(SWAP_VIEWS.SWAP)}
              ml={0}
              mr={0}
              height={15}
              width={15}
              img="/images/icons/cros.png"
              opecity={0.3}
            />
          </SelectTokenMain>
          <TextInputMain>
            <SearchIcon src="/images/icons/search.png" alt="img" loading="lazy" />
            <TextInputActive
              placeholder="Search by Name or Paste Address"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </TextInputMain>

          <TokenList>
            {tokens?.map((token, _i) => {
              let isImported = hasImported?.[token.address.toLowerCase()];
              return (
                <ListRow
                  key={_i}
                  onClick={() => {
                    if (hasImported) return null;
                    resetView(SWAP_VIEWS.SWAP);
                    setTokens(currencyModalCall === CURRENCY_MODAL_CALLS.RECEIVE_COIN ? 'toToken' : 'fromToken', token);
                  }}
                  disabled={
                    token?.address.toLowerCase() === toToken?.toLowerCase() ||
                    token?.address.toLowerCase() === fromToken?.toLowerCase()
                  }
                  hasimported={isImported}
                >
                  <ListItemIcon>
                    <TokenImage
                      src={token?.logoURI ? token?.logoURI : 'images/icons/defaultTokenIcon.png'}
                      alt="icon"
                    />
                  </ListItemIcon>

                  <ListItemTextStyle>
                    {token?.name} <Type>({token?.symbol})</Type>
                  </ListItemTextStyle>
                  {hasImported && searchValue ? (
                    <ImportTokenButton onClick={() => setOpen(true)}>Import Token</ImportTokenButton>
                  ) : (
                    <Count>
                      {!isEmpty(tokenBalances)
                        ? roundValue(tokenBalances?.[token?.address?.toLowerCase()], 6)
                        : account && supportedChainIds.includes(connectedChainId) && <Loader width={20} />}
                    </Count>
                  )}
                </ListRow>
              );
            })}
          </TokenList>
        </CurrencyCard>
      ) : (
        <CurrencyCard isMount={true} style={{ height: isDesktop ? '50%' : '560px' }}>
          <SelectTokenMain>
            <SelectTokenTitle>Select a Token</SelectTokenTitle>
            <IconGlobalStyleComponent
              onClick={() => resetView(SWAP_VIEWS.SWAP)}
              ml={0}
              mr={15}
              height={15}
              width={15}
              img="/images/icons/cros.png"
              opecity={0.3}
            />
          </SelectTokenMain>
          <TextInputMain>
            <SearchIcon src="/images/icons/search.png" alt="img" loading="lazy" />
            <TextInputActive
              placeholder="Search by Name or Paste Address"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </TextInputMain>
          <TokenList>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Skeleton variant="circular" width={36} height={36} />
              <CoinSkeleton variant="rectangular" height={36} />
            </SkeletonWrapper>
          </TokenList>
        </CurrencyCard>
      )}
      {/* import token modal here */}
      <ImportTokenModal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        importedToken={tokens[0]}
        triggeredImport={() => {
          importToken(tokens[0]), setOpen(false), setSearchValue('');
          setTokens(currencyModalCall === CURRENCY_MODAL_CALLS.RECEIVE_COIN ? 'toToken' : 'fromToken', tokens[0]);
          resetView(SWAP_VIEWS.SWAP);
        }}
      />
    </>
  );
};

export default CurrencyModal;
