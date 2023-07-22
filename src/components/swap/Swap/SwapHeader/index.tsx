import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { SWAP_VIEWS } from 'hooks/useSwapState';

const SwapCardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '5%',
  paddingRight: '5%',
  cursor: 'pointer',
  paddingTop: '5%',
});

const SwapTitle = styled('h2')({
  fontWeight: '600',
  color: 'black',
});
const IconButtonStyled = styled(IconButton)({
  '&:hover': {
    background: '#f7f7f7',
  },
});
export type SwapHeaderProps = {
  transactionSettingHandler: (view: SWAP_VIEWS) => void;
};

const SwapHeader = ({ transactionSettingHandler }: SwapHeaderProps) => {
  return (
    <SwapCardHeader>
      <SwapTitle>Swap</SwapTitle>
      <IconButtonStyled onClick={() => transactionSettingHandler(SWAP_VIEWS.SWAP_SETTINGS)}>
        <img src="/images/icons/menu.png" alt="Menu" height={20} width={20} />
      </IconButtonStyled>
    </SwapCardHeader>
  );
};

export default SwapHeader;
