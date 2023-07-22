import React from 'react';
import { styled } from '@mui/system';
import { Token } from 'store/tokens';
import { round } from 'lodash';
import Loader from 'components/CurrencyModal/Loader';

const NetWorth = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingLeft: '10px',
  padding: '5px',
  paddingTop: '5%',
  paddingBottom: '5%',
  marginTop: 5,
});

const NetWorthTitle = styled('p')({
  fontWeight: '600',
  marginLeft: 10,
});

const TotalNetWorth = styled('h2')({
  fontWeight: '600',
  marginLeft: 10,
});

const DropMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 15,
  paddingTop: 5,
  paddingBottom: 5,
  justifyContent: 'space-between',
  '@media (max-width: 660px)': {
    width: '94%',
  },
});

const Detail = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginTop: 3,
  marginBottom: 3,
});

const CoinImage = styled('img')({
  height: '30px',
  width: '30px',
  marginRight: '20px',
});

const DropTitle = styled('p')({
  fontWeight: '600',
});

const DropPrice = styled('p')({
  fontWeight: '600',
  color: '#d4d4d4',
  marginLeft: 10,
});

export interface Tokens extends Token {
  usdBalance: string;
}

export type UserAssetsProps = {
  account: string;
  tokenList: Tokens[];
  netWorth: string;
};

const UserAssets = ({ tokenList, netWorth }: UserAssetsProps) => {
  return (
    <>
      <NetWorth>
        <NetWorthTitle>Net Worth</NetWorthTitle>
        <br />
        <TotalNetWorth>
          {netWorth && netWorth !== 'undefined' ? round(Number(netWorth), 2) : <Loader width={22} />} USD
        </TotalNetWorth>
      </NetWorth>
      {tokenList &&
        tokenList?.map((val, _i) => {
          return (
            <DropMain key={_i}>
              <Detail>
                <CoinImage src={val?.logoURI ? val?.logoURI : 'images/icons/defaultTokenIcon.png'} alt="Icon" />
                <DropTitle>{val?.symbol}</DropTitle>
              </Detail>
              <DropPrice>{val?.usdBalance}</DropPrice>
            </DropMain>
          );
        })}
    </>
  );
};

export default UserAssets;
