import { styled } from '@mui/system';
import { FormControl } from '@mui/material';
import SwapArrow from '../SwapArrow';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import { SWAP_VIEWS } from 'hooks/useSwapState';
import { CURRENCY_MODAL_CALLS } from 'hooks/useCurrencyModalState';
import { useSwapTokens } from 'store/swap/hooks';

const Receive = styled('div')({
  backgroundColor: '#F7F7F7',
  marginTop: '10%',
  position: 'relative',
  paddingBottom: '7%',
  paddingTop: '5%',
});

const InputTitle = styled('p')({
  paddingLeft: '5%',
  paddingTop: '2%',
  paddingBottom: '3%',
  fontWeight: '500',
  color: '#565656',
  lineHeight: 0,
});

const Input = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
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
  fontSize: '24px',
  backgroundColor: 'transparent',
  '&:focus-visible': {
    outline: 'none',
  },
});

const SelectToken = styled('div')({
  borderRadius: '100px',
  height: '36px',
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const CoinImage = styled('img')({
  height: '36px',
  width: '36px',
  borderRadius: '50%',
});

const CoinTitle = styled('p')({
  fontWeight: '600',
  color: '#565656',
  marginLeft: 10,
  marginRight: 10,
});

export type CurrencyOutputProps = {
  toggleCurrencyModal?: (view: SWAP_VIEWS) => void;
  Read?: boolean;
  setCoinTarget?: (modalCall: CURRENCY_MODAL_CALLS) => void;
  receivedToken?: number;
};

const CurrencyOutput = ({ Read, receivedToken, toggleCurrencyModal, setCoinTarget }: CurrencyOutputProps) => {
  const { toToken: ReceiveCoin } = useSwapTokens();

  return (
    <Receive>
      <SwapArrow read={Read} />
      <InputTitle>You Receive</InputTitle>
      <Input>
        <TextInput placeholder="0" disabled={true} value={receivedToken} />
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <SelectToken
            onClick={() => {
              if (toggleCurrencyModal && setCoinTarget) {
                toggleCurrencyModal(SWAP_VIEWS.TOKENLIST_VIEW);
                setCoinTarget(CURRENCY_MODAL_CALLS.SEND_COIN);
              }
            }}
          >
            <CoinImage src={ReceiveCoin?.logoURI ? ReceiveCoin?.logoURI : '/images/icons/Dollar.png'} alt="Icon" />
            <CoinTitle>
              {ReceiveCoin?.symbol.length > 7 ? ReceiveCoin?.symbol.slice(0, 5) + '...' : ReceiveCoin?.symbol}
            </CoinTitle>
            {!Read ? null : (
              <IconGlobalStyleComponent
                onClick={() => null}
                mr={15}
                height={7}
                width={10}
                img="/images/icons/downArrow.png"
                opecity={0.3}
              />
            )}
          </SelectToken>
        </FormControl>
      </Input>
    </Receive>
  );
};

export default CurrencyOutput;
