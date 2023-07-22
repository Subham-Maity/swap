import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, FormControl, Grid, NativeSelect, useMediaQuery } from '@mui/material';
import { TransactionHistory, TxType } from '../../hooks/useTransactions';
import { CHAINS } from '../../config/chains';
import { getDateFromUnixTime, sliceString } from 'utils';

const Footer = styled('div')({
  '@media (min-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  height: '72px',
  paddingLeft: '4%',
  paddingRight: '4%',
  '@media (max-width: 660px)': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    height: '130px',
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
});

const Count = styled('div')({
  '@media (min-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingLeft: 10,
  paddingRight: 10,
  '@media (max-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Item = styled('p')({
  fontWeight: 500,
  color: '#918f92',
  marginRight: 10,
});

const ImageIcon = styled('img')({
  height: 25,
  width: 21,
  backgroundColor: '#ededed',
  padding: 6,
  borderRadius: 100,
  margin: 3,
  marginLeft: 15,
  opacity: 0.7,
});

const Body = styled('div')({
  overflow: 'hidden',
  '&:hover': {
    overflowY: 'auto',
  },
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  height: '69%',
  width: '100%',
});

const Table2 = styled(Grid)({
  '@media (min-width: 660px)': {
    alignItems: 'center',
  },
  marginBottom: '12px',
  '@media (max-width: 660px)': {
    marginTop: '10%',
  },
});

const TranjectionType = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const TranjectionDetail = styled('div')({
  marginLeft: 10,
});

const StatusText = styled('p')({
  fontWeight: 500,
  color: '#999999',
  marginRight: 5,
});

const TimeText = styled('p')({
  fontWeight: 500,
  color: '#999999',
  display: 'flex',
});

const TimeImage = styled('img')({
  height: 15,
  width: 15,
  marginTop: 4,
  marginRight: 4,
});

const CrossImage = styled('img')({
  height: 12,
  width: 12,
  marginTop: 4,
  marginRight: 4,
  marginLeft: 18,
  cursor: 'pointer',
});

const TransactionEntry = styled('p')({
  fontWeight: 600,
  color: '#595959',
  alignItems: 'center',
  display: 'flex',
  '@media (max-width: 660px)': {
    marginTop: 10,
  },
});

const Img = styled('img')({
  height: 36,
  width: 36,
  '@media (max-width: 660px)': {
    marginTop: 15,
  },
});

const CoinImg = styled('img')({
  marginRight: 10,
});

const Status = styled('div')({
  height: 62,
  display: 'flex',
  alignItems: 'center',
});

const StatusBox = styled(Box)({
  borderLeft: '1px solid #999999',
  paddingLeft: 16,
  marginLeft: 16,
  fontSize: 14,
  color: '#999999',
});

const Share = styled('div')({
  '@media (min-width: 660px)': {
    display: 'flex',
    alignItems: 'center',
  },
  '@media (max-width: 660px)': {
    marginLeft: '15%',
  },
});

const NativeSelects = styled(NativeSelect)({
  width: '65px',
  backgroundColor: '#e8e5e7',
  paddingLeft: 10,
  borderRadius: '100px',
  ':before': {
    borderBottom: 'none',
  },
});

const TokenTitle = styled('span')({
  fontWeight: '600',
  opacity: 0.65,
});

const TokenSubTitle = styled('p')({
  fontWeight: '500',
  opacity: 0.65,
  fontSize: 14,
  display: 'flex',
});

const Img2 = styled('img')({
  width: 20,
  height: 20,
  marginTop: 15,
  marginLeft: -21,
});

const CopyFile = styled('img')({
  width: 12,
  height: 13,
  display: 'inline',
  marginLeft: 5,
});

type TransactionHistoryPaginationTableProps = {
  type: TxType;
  data: TransactionHistory[];
};

const TransactionHistoryPaginationTable = ({ type, data }: TransactionHistoryPaginationTableProps) => {
  const [page, setPage] = React.useState<number[]>([]);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [count, setCount] = React.useState('10');
  const a = parseInt(count);
  const isDesktop = useMediaQuery('(min-width:660px)');

  useEffect(() => {
    const range = [] as number[];
    const num = Math.ceil(data?.length / a);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    setPage(range);
  }, [count, start, end, a, data?.length]);

  const NextPage = () => {
    if (page.length > currentPage) {
      setStart(a * currentPage);
      setCurrentPage(currentPage + 1);
      setEnd(end + a);
    }
  };

  const PriviousPage = () => {
    if (currentPage > 1) {
      setStart(start - a);
      setEnd(end - a);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Body>
        <Box>
          {data?.map(({ transactions }, i) => {
            return start <= i && i + 1 <= a * currentPage ? (
              <div key={i}>
                {transactions.map((transaction, _i) => {
                  return (
                    <Table2 container key={_i}>
                      {type === TxType.XSWAP ? (
                        <>
                          {' '}
                          <Grid pl={2} item lg={3} xs={isDesktop ? 0 : 12}>
                            <Status>
                              <TranjectionType>
                                <TranjectionDetail>
                                  <b>{transaction?.hash}</b>
                                  <CopyFile src="/images/icons/filecopy.png" />
                                  <TimeText>{transaction.time}</TimeText>
                                </TranjectionDetail>
                                <StatusBox>{transaction.status}</StatusBox>
                              </TranjectionType>
                            </Status>
                          </Grid>
                          <Grid pl={2} item lg={3} xs={isDesktop ? 0 : 12}>
                            <Box display="flex">
                              <Img src={transaction.fromToken?.logoURI} alt="Coin" />
                              <Img2 src={'/images/icons/coin3.png'} alt="Coin" />
                              <Box ml={1}>
                                <TokenTitle>{transaction.fromToken?.symbol}</TokenTitle>
                                <TokenSubTitle>on Solana</TokenSubTitle>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid pl={2} item lg={3} xs={isDesktop ? 0 : 12}>
                            <Box display="flex">
                              <Img src={transaction.toToken?.logoURI} alt="Coin" />
                              <Img2 src={'/images/icons/coin3.png'} alt="Coin" />
                              <Box ml={1}>
                                <TokenTitle>{transaction.toToken?.symbol}</TokenTitle>
                                <TokenSubTitle>on Solana</TokenSubTitle>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid pl={2} item lg={3} xs={isDesktop ? 0 : 12}>
                            <Box display="flex">
                              <Img src={transaction.toToken?.logoURI} alt="Coin" />
                              <Box ml={1}>
                                <TokenTitle>{transaction.fromChainId}</TokenTitle>
                                <TokenSubTitle>
                                  From Tx&nbsp;
                                  <TimeImage src="/images/icons/scan.png" /> &nbsp;Dest tx&nbsp;
                                  <TimeImage src="/images/icons/scan.png" />
                                </TokenSubTitle>
                              </Box>
                            </Box>
                          </Grid>
                        </>
                      ) : type === TxType.SWAP ? (
                        <>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Status>
                              <TranjectionType>
                                <TranjectionDetail>
                                  <b>{sliceString(transaction?.hash, 8)}</b>
                                  <TimeText>{getDateFromUnixTime(transaction?.time)}</TimeText>
                                </TranjectionDetail>
                              </TranjectionType>
                            </Status>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Box display={'flex'}>
                              <StatusText>{transaction.status}</StatusText>
                              {transaction.status === 'Failed' && <TimeImage src="/images/icons/failed.png" />}
                              <a
                                href={`${CHAINS[transaction?.fromChainId]?.exploler}/tx/${transaction?.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <TimeImage src="/images/icons/scan.png" />
                              </a>
                            </Box>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg src={transaction.fromToken?.logoURI} width={24} height={24} />
                                {transaction?.fromAmount}
                              </TransactionEntry>
                            </Share>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg src={transaction.toToken?.logoURI} width={24} height={24} />
                                {transaction?.toAmount}
                              </TransactionEntry>
                            </Share>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg height="28" width="28" src={CHAINS[transaction?.fromChainId]?.icon} />
                                {CHAINS[transaction?.fromChainId]?.name}
                              </TransactionEntry>
                            </Share>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Status>
                              <TranjectionType>
                                <TranjectionDetail>
                                  <b>{transaction?.hash}</b>
                                  <TimeText>{transaction?.time}</TimeText>
                                </TranjectionDetail>
                              </TranjectionType>
                            </Status>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Box display={'flex'}>
                              <StatusText>{transaction?.status}</StatusText>
                            </Box>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg src={transaction?.fromToken?.logoURI} />
                                {transaction?.fromAmount}
                              </TransactionEntry>
                            </Share>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg src={transaction?.toToken?.logoURI} />
                                {transaction?.toAmount}
                              </TransactionEntry>
                            </Share>
                          </Grid>
                          <Grid pl={2} item lg={2.4} xs={isDesktop ? 0 : 12}>
                            <Share>
                              <TransactionEntry>
                                <CoinImg height="28" width="28" src={CHAINS[transaction?.fromChainId]?.icon} />
                                {CHAINS[transaction?.fromChainId]?.name}
                                <CrossImage src="/images/icons/cros.png" />
                              </TransactionEntry>
                            </Share>
                          </Grid>
                        </>
                      )}
                    </Table2>
                  );
                })}
              </div>
            ) : null;
          })}
        </Box>
      </Body>
      <Footer>
        <Count>
          <Item>Items Per Page</Item>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <NativeSelects
                onChange={(e) => {
                  setCount(e.target.value);
                }}
                value={count}
                inputProps={{
                  name: 'Page',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </NativeSelects>
            </FormControl>
          </Box>
        </Count>
        <Count>
          <Item>
            {currentPage}-{count} of {page.length}
          </Item>
          <ImageIcon
            src="/images/icons/left.png"
            onClick={() => {
              PriviousPage();
            }}
          />
          <ImageIcon
            src="/images/icons/right.png"
            onClick={() => {
              NextPage();
            }}
          />
        </Count>
      </Footer>
    </>
  );
};

export default TransactionHistoryPaginationTable;
