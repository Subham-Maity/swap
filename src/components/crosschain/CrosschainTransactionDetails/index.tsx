import { styled } from '@mui/system';
import React from 'react';
import { SWAP_VIEWS } from '../../../hooks/useSwapState';
import { Quote } from 'hooks/useXswapQuotes';
import { useUserTransactionSetting } from 'store/user/hooks';
import { isEmpty } from 'lodash';
import { useXSwapState } from 'store/xswap/hook';
import { unitFormatter } from 'utils';

const DetailView = styled('div')({
  backgroundColor: '#F7F7F7',
  width: '70%',
  maxWidth: 430,
  margin: 'auto',
  display: 'block',
  padding: 10,
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
  '@media (max-width: 660px)': {
    width: '100%',
  },
});
const Expected = styled('div')({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
});
const ItemText = styled('p')({
  padding: 10,
  fontWeight: '500',
  color: '#595959',
});
const ItemText2 = styled('p')({
  padding: 10,
  fontWeight: '500',
  color: '#595959',
});

const Routs = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RoutImg = styled('img')({
  height: 24,
  width: 24,
});
const EditOption = styled('span')({
  background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  cursor: 'pointer',
});
type CrosschainTransactionDetailsProps = {
  resetView: (view: SWAP_VIEWS) => void;
  selectedQuoteDeatails: Quote;
};
const CrosschainTransactionDetails = ({ selectedQuoteDeatails, resetView }: CrosschainTransactionDetailsProps) => {
  const { slippage } = useUserTransactionSetting();
  const { fromToken, toToken } = useXSwapState();
  return (
    <>
      {!isEmpty(selectedQuoteDeatails) && (
        <DetailView>
          <Expected>
            <ItemText>Bridge</ItemText>
            <ItemText2>{selectedQuoteDeatails?.bridgeName}</ItemText2>
          </Expected>
          <Expected>
            <ItemText>Bridge Fee</ItemText>
            <ItemText2>
              {selectedQuoteDeatails?.bridgeFee} {fromToken?.symbol}
            </ItemText2>
          </Expected>
          <Expected>
            <ItemText>Gas Fee</ItemText>
            <ItemText2>{selectedQuoteDeatails?.gasEstimate} MATIC</ItemText2>
          </Expected>
          <Expected>
            <ItemText>Estimated Received</ItemText>
            <ItemText2>
              {selectedQuoteDeatails?.toAmount} {toToken?.symbol}
            </ItemText2>
          </Expected>
          <Expected>
            <ItemText>Slippage</ItemText>
            <ItemText2>
              {slippage}% <EditOption onClick={() => resetView(SWAP_VIEWS.SWAP_SETTINGS)}>Edit</EditOption>
            </ItemText2>
          </Expected>
        </DetailView>
      )}
    </>
  );
};
export default CrosschainTransactionDetails;
