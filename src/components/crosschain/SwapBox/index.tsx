import { styled } from '@mui/system';
import React from 'react';
import { SWAP_VIEWS } from '../../../hooks/useSwapState';
import { ThemeProps } from '../../../theme';
import Buttons from '../../../theme/Buttons';
import IconGlobalStyleComponent from '../../../theme/GlobalComponent/iconGlobalStyleComponent';
import SelectChain from '../SelectChain';
import { useSwitchXSwapChain, useXSwapState } from '../../../store/xswap/hook';
import { CHAINS } from 'config/chains';
import { useSetXSwapInputValue } from '../../../store/xswap/hook';
import useTokenBalances from 'hooks/useTokenBalances';
import { roundValue } from 'utils';
import { CURRENCY_MODAL_CALLS } from 'hooks/useCurrencyModalState';
import { Token } from 'store/tokens';
import { Quote } from 'hooks/useXswapQuotes';

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled('h2')({
  fontWeight: '600',
  marginLeft: '20px',
  marginTop: 20,
  marginBottom: 10,
});

const From = styled('div')({
  padding: 20,
});

const To = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 10,
});

const ToMain = styled('div')({
  padding: 20,
  backgroundColor: '#f7f7f7',
});

const FromText = styled('p')({
  fontWeight: 500,
  color: '#000000',
  opacity: 0.65,
});

const Drop = styled('div')({
  backgroundColor: '#f7f7f7',
  borderRadius: 16,
  height: 52,
  width: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: 20,
  cursor: 'pointer',
});

const Drop2 = styled('div')({
  backgroundColor: 'white',
  borderRadius: 100,
  height: 36,
  width: 111,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  cursor: 'pointer',
});

const DropImg = styled('img')({
  borderRadius: 100,
  height: '36px',
  width: '36px',
});

const DropImg3 = styled('img')({
  borderRadius: 100,
  height: '37px',
  width: '37px',
  position: 'absolute',
  left: -3,
});

const Text = styled('h3')({
  fontWeight: 600,
  color: '#000000',
  opacity: 0.65,
});

const Text2 = styled('p')({
  fontWeight: 600,
  color: '#000000',
  opacity: 0.65,
});

const Text3 = styled('p')({
  fontWeight: 500,
  color: '#000000',
  opacity: 0.65,
});

const Max = styled('button')((props: { theme?: ThemeProps }) => ({
  fontWeight: 500,
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  border: 0,
}));

const Balance = styled('span')({
  fontWeight: 500,
  color: '#000000',
  opacity: 0.65,
  marginTop: 20,
});

const InputMain = styled('div')({
  borderRadius: 10,
  marginTop: 20,
  backgroundColor: '#f7f7f7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: 52,
  marginBottom: 20,
  paddingRight: 8,
});

const InputMain2 = styled('div')({
  borderRadius: 16,
  marginTop: 20,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: 52,
  marginBottom: 20,
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
});

const Input = styled('input')({
  height: 44,
  width: '50%',
  border: 'none',
  borderRadius: 5,
  fontSize: '24px',
  fontWeight: '500',
  color: 'black',
  paddingLeft: 18,
  background: 'transparent',
  '&:focus-visible': {
    border: 'none',
    outline: 'none',
  },
});

const CoinDrop = styled('div')({
  backgroundColor: 'white',
  height: 52,
  width: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
});

const Drop3 = styled('div')({
  backgroundColor: 'white',
  borderRadius: 50,
  height: 36,
  width: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  position: 'relative',
  marginLeft: 10,
  cursor: 'pointer',
});

const Drop4 = styled('div')({
  backgroundColor: '#f7f7f7',
  borderRadius: 50,
  height: 36,
  width: 111,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  position: 'relative',
  cursor: 'pointer',
});

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '70%',
  marginLeft: 42,
});

const CoinChangeIcon = styled('img')({
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 100,
  boxShadow: 'drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.1))',
  margin: 'auto',
  marginTop: '-44px',
  cursor: 'pointer',
});

type SwapBoxProps = {
  resetView: (view: SWAP_VIEWS) => void;
  coinTarget: (target: CURRENCY_MODAL_CALLS) => void;
  fromToken: Token;
  toToken: Token;
  selectedQuote: Quote;
  moveScreenHandler: () => void;
};

const SwapBox = ({ coinTarget, resetView, fromToken, toToken, selectedQuote, moveScreenHandler }: SwapBoxProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);

  const openmenu = Boolean(anchorEl);
  const openmenu1 = Boolean(anchorEl1);
  const setXSwapInput = useSetXSwapInputValue();
  const switchXSwapChain = useSwitchXSwapChain();

  const { fromChainId, toChainId, xSwapInputValue } = useXSwapState() || {};
  const tokenBalance = useTokenBalances(fromChainId);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <div>
      <Header>
        <Title>Swap</Title>
        {/* <Img src="/images/icons/menu.png" /> */}
        <IconGlobalStyleComponent
          ml={10}
          mr={30}
          height={20}
          width={20}
          img="/images/icons/menu.png"
          opecity={0.5}
          onClick={() => resetView(SWAP_VIEWS.SWAP_SETTINGS)}
        />
      </Header>
      <From>
        <FromText>From Chain</FromText>
        <Header>
          <Drop
            id="demo-positioned-button"
            aria-controls={openmenu ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openmenu ? 'true' : undefined}
            onClick={handleClick}
          >
            <DropImg src={CHAINS?.[fromChainId]?.icon} />
            <Text>{CHAINS[fromChainId].nativeCurrency}</Text>
            <IconGlobalStyleComponent
              ml={0}
              mr={0}
              height={8}
              width={12}
              img="/images/icons/downArrow.png"
              opecity={0.5}
              onClick={() => null}
            />
          </Drop>
          <SelectChain handleClose={handleClose} anchorEl={anchorEl} openmenu={openmenu} isFromChain={true} />
          {tokenBalance?.[fromToken?.address?.toLowerCase()] > 0 && (
            <Balance>Balance: {roundValue(tokenBalance?.[fromToken?.address?.toLowerCase()], 4)}</Balance>
          )}
        </Header>
        <InputMain>
          <Input
            type="number"
            value={xSwapInputValue ?? ''}
            placeholder="0"
            onChange={(e) => setXSwapInput(parseFloat(e.target.value))}
          />
          <Max onClick={() => setXSwapInput(parseFloat(tokenBalance?.[fromToken?.address?.toLowerCase()]?.toString()))}>
            Max
          </Max>
          <Drop2
            onClick={() => {
              return coinTarget(CURRENCY_MODAL_CALLS.SEND_COIN), resetView(SWAP_VIEWS.TOKENLIST_VIEW);
            }}
          >
            <DropImg src={fromToken?.logoURI ?? '/images/icons/Dollar.png'} />
            <Text2>{fromToken?.symbol ?? 'Select'}</Text2>
            <IconGlobalStyleComponent
              ml={0}
              mr={0}
              height={8}
              width={12}
              img="/images/icons/downArrow.png"
              opecity={0.5}
              onClick={() => null}
            />
          </Drop2>
        </InputMain>
      </From>
      <ToMain>
        <CoinChangeIcon src="/images/icons/upDown.png" onClick={() => switchXSwapChain()} alt="Icon" />
        <To>
          <Text3>You Receive</Text3>
        </To>
        <Header>
          <CoinDrop>
            <Drop3
              id="demo-positioned-button1"
              aria-controls={openmenu1 ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openmenu1 ? 'true' : undefined}
              onClick={handleClick1}
            >
              <DropImg3 src={CHAINS[toChainId].icon} />
              <Content>
                <Text>{CHAINS[toChainId].nativeCurrency}</Text>
                <IconGlobalStyleComponent
                  ml={0}
                  mr={0}
                  height={8}
                  width={12}
                  img="/images/icons/downArrow.png"
                  opecity={0.5}
                  onClick={() => null}
                />
              </Content>
            </Drop3>
            <SelectChain handleClose={handleClose1} anchorEl={anchorEl1} openmenu={openmenu1} isFromChain={false} />
          </CoinDrop>
          {/* <Text3>Balance: 3.017</Text3> */}
        </Header>
        <InputMain2>
          <Input type="number" placeholder="0" value={selectedQuote?.toAmount} disabled />
          <Drop4
            onClick={() => {
              return coinTarget(CURRENCY_MODAL_CALLS.RECEIVE_COIN), resetView(SWAP_VIEWS.TOKENLIST_VIEW);
            }}
          >
            <DropImg3 src={toToken?.logoURI ?? '/images/icons/Dollar.png'} />
            <Content>
              <Text2>{toToken?.symbol ?? 'Select'}</Text2>
              <IconGlobalStyleComponent
                ml={0}
                mr={0}
                height={8}
                width={12}
                img="/images/icons/downArrow.png"
                opecity={0.5}
                onClick={() => null}
              />
            </Content>
          </Drop4>
        </InputMain2>
      </ToMain>
      <Buttons
        width="87%"
        isactive={true}
        onClick={() => {
          // setHighSlippageModalOpen(true);
          // setContinueModalOpen(true);
          moveScreenHandler();
        }}
        title="Swap"
      />
    </div>
  );
};
export default SwapBox;
