import { styled } from '@mui/system';
import { useSwitchTokens } from 'store/swap/hooks';

const CoinChangeIcon = styled('img')({
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 100,
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  top: -20,
  left: '45%',
  cursor: 'pointer',
});

// type AppDispatch = ThunkDispatch<ReduxState, string, AnyAction>;
const SwapArrow = ({ read }: { read: boolean }) => {
  const switchSwapTokens = useSwitchTokens();
  return (
    <CoinChangeIcon src="/images/icons/upDown.png" onClick={() => (!read ? null : switchSwapTokens())} alt="Icon" />
  );
};

export default SwapArrow;
