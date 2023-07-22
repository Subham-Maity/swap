import { styled } from '@mui/system';
import { FormControl } from '@mui/material';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import { SWAP_VIEWS } from 'hooks/useSwapState';
import { CURRENCY_MODAL_CALLS } from 'hooks/useCurrencyModalState';
import { useSetSwapInputValue, useSwapTokens } from 'store/swap/hooks';
import useTokenBalances from 'hooks/useTokenBalances';
import { isEmpty } from 'lodash';
import { roundValue } from 'utils';
import { useAppChainId } from 'store/user/hooks';

const SwapHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '5%',
  paddingRight: '5%',
  cursor: 'pointer',
  paddingTop: '5%',
});

const HeaderTitle = styled('p')({
  fontWeight: '500',
  color: 'black',
  opacity: 0.65,
});

const Max = styled('p')((props: { theme?: ThemeProps }) => ({
  fontWeight: '500',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
}));

const Input = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f7f7f7',
  marginLeft: '5%',
  marginRight: '5%',
  borderRadius: 16,
  paddingLeft: 10,
  height: 52,
  marginTop: 10,
});
const TextInput = styled('input')({
  width: '90%',
  borderBottom: 'none',
  border: 'none',
  height: '52px',
  fontWeight: 500,
  fontSize: '18px',
  backgroundColor: 'transparent',
  '&:focus-visible': {
    outline: 'none',
  },
});
const SelectToken = styled('div')({
  borderRadius: '100px',
  height: '36px',
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const SelectTokenImage = styled('img')({
  height: '36px',
  width: '36px',
});

const SelectTokenTitle = styled('p')({
  fontWeight: '600',
  color: '#595959',
  marginLeft: 10,
  marginRight: 10,
});

export type CurrencyInputProps = {
  toggleCurrencyModal?: (view: SWAP_VIEWS) => void;
  Read?: boolean;
  setCoinTarget?: (modalCall: CURRENCY_MODAL_CALLS) => void;
};

const CurrencyInput = ({ toggleCurrencyModal, Read, setCoinTarget }: CurrencyInputProps) => {
  const { fromToken: CoinDetail, swapInputValue } = useSwapTokens();
  const appChainId = useAppChainId();
  const balances = useTokenBalances(appChainId);
  const setFromTokenAmount = useSetSwapInputValue();

  return (
    <>
      <SwapHeader>
        <HeaderTitle>You Pay</HeaderTitle>
        {!isEmpty(CoinDetail) && Read && (
          <Max onClick={() => setFromTokenAmount(roundValue(balances[CoinDetail?.address?.toLowerCase()], 6))}>
            {!isEmpty(balances) ? roundValue(balances[CoinDetail?.address?.toLowerCase()], 3) : '--'}{' '}
            {CoinDetail?.symbol}
          </Max>
        )}
      </SwapHeader>
      <Input>
        <TextInput
          placeholder="Enter Amount"
          type="number"
          disabled={!Read ? true : false}
          value={swapInputValue ?? ''}
          onChange={(e) => setFromTokenAmount(Number(e.target.value))}
        />
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <SelectToken
            onClick={() => {
              if (toggleCurrencyModal && setCoinTarget) {
                toggleCurrencyModal(SWAP_VIEWS.TOKENLIST_VIEW);
                setCoinTarget(CURRENCY_MODAL_CALLS.SEND_COIN);
              }
            }}
          >
            <SelectTokenImage src={CoinDetail?.logoURI ? CoinDetail?.logoURI : '/images/icons/Dollar.png'} alt="Coin" />
            <SelectTokenTitle>
              {CoinDetail?.symbol?.length > 7 ? CoinDetail?.symbol.slice(0, 5) + '...' : CoinDetail?.symbol}
            </SelectTokenTitle>
            {!Read ? null : (
              <IconGlobalStyleComponent
                onClick={() => null}
                mr={10}
                height={7}
                width={10}
                img="/images/icons/downArrow.png"
                opecity={0.3}
              />
            )}
          </SelectToken>
        </FormControl>
      </Input>
    </>
  );
};

export default CurrencyInput;
