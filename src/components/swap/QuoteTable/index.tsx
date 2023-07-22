import { styled } from '@mui/system';
import { Button, Grid, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { data } from '../../../contexts/QuoteTableDATA';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import axios from 'axios';
import { COINS_LIST } from 'config';

const QuoteTableblur = styled('div')({
  borderRadius: 24,
  filter: 'blur(5px)',
});

const CardCustom = styled('div')({
  borderRadius: 24,
});

const PriceDetail = styled('div')({
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  justifyContent: 'space-between',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingTop: '8px',
  paddingBottom: '18px',
  marginTop: '2%',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: '#00000021',
});

const MaxPriceDetail = styled('p')({
  color: 'rgba(0, 0, 0, 0.4)',
  fontWeight: '600',
  marginTop: 20,
  display: 'flex',
});

const ImageSpan = styled('span')({
  color: 'black',
  paddingLeft: 5,
  marginTop: 10,
});

const MainSpan = styled('span')((props: { theme?: ThemeProps }) => ({
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  cursor: 'pointer',
  display: 'flex',
}));

const DataUpdat = styled('div')({
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingTop: '10px',
  paddingBottom: '12px',
  height: 70,
  // width:'96%'
});

const UpdateTitle = styled('p')({
  color: '#FF0000',
  fontWeight: '500',
});

const RefresBtn = styled(Button)({
  backgroundColor: 'white',
  boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
  color: '#595959',
  borderRadius: 100,
  fontWeight: '600',
  width: '93px',
  height: '36px',
  textTransform: 'inherit',
  '&:hover': {
    backgroundColor: 'white',
  },
});

const ListItem = styled('div')({
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#00000021',
  padding: 10,
  // width: '97%',
  '&:hover': {
    backgroundColor: '#f2f2f2',
  },
});

const CoinHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  paddingTop: '12px',
  paddingBottom: '12px',
});

const CoinIcon = styled('img')({
  paddingRight: 10,
  height: '50px',
});

const Text = styled('p')({
  textAlign: 'left',
  opacity: 0.4,
  fontWeight: '500',
  display: 'flex',
  paddingLeft: '20px',
  paddingBottom: '5px',
});

const TextDown = styled('p')({
  textAlign: 'left',
  fontWeight: '600',
  paddingLeft: '20px',
});

const ChangeText = styled('span')((props: { theme?: ThemeProps }) => ({
  textAlign: 'center',
  fontWeight: '600',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
}));

const ShowMore = styled('p')((props: { theme?: ThemeProps }) => ({
  textAlign: 'center',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CoinTitle = styled('p')({
  fontWeight: 600,
});

const DownArrowImgTop = styled('img')({
  height: 11,
  paddingLeft: 10,
});

const Btn = styled('div')({
  marginTop: 5,
});

const RouterList = styled(List)({
  paddingTop: 0,
});

const QuoteTablesMain = styled('div')({
  display: 'block',
  '@media (max-width: 660px)': {
    display: 'none',
  },
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Quotes = {};

type QuoteTableProps = {
  allowedSlippage: number | null;
  lastRefresh: number | null;
  userSelectedGasPrice: number | null;
  quotes: Quotes[] | null;
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuoteTables = (_props: QuoteTableProps) => {
  const [loardData, setLoardData] = useState<number>(1);
  const [blur, setBlur] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [coinsData, setCoinsData] = useState<any>();

  React.useEffect(() => {
    axios
      .get(COINS_LIST)
      .then((res) => {
        setCoinsData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setBlur(true);
  }, []);
  useEffect(() => {
    setLoardData(1);
  }, []);
  return (
    <QuoteTablesMain>
      <>
        {blur ? (
          <QuoteTableblur>
            <PriceDetail>
              <MaxPriceDetail>
                Max Price Slippage:{' '}
                <MainSpan>
                  &nbsp;1%
                  <ImageSpan>
                    <IconGlobalStyleComponent
                      onClick={() => null}
                      ml={5}
                      mr={0}
                      height={7}
                      width={11}
                      img="/images/icons/downArrow.png"
                      opecity={0.5}
                    />
                  </ImageSpan>
                </MainSpan>
              </MaxPriceDetail>
              {/*<MaxPriceDetail>
                Gas Price:{' '}
                <MainSpan>
                  &nbsp;206 GWEI
                  {/* <ImageSpan>
                    <IconGlobalStyleComponent
                      onClick={() => {}}
                      ml={5}
                      mr={0}
                      height={7}
                      width={11}
                      img="/images/icons/downArrow.png"
                      opecity={0.5}
                    />
                  </ImageSpan> 
                </MainSpan>
              </MaxPriceDetail>*/}
            </PriceDetail>
            <DataUpdat>
              <UpdateTitle>Data updated 18m ago. Please refresh:</UpdateTitle>
              <RefresBtn>Refresh</RefresBtn>
            </DataUpdat>
            <RouterList aria-label="main mailbox folders">
              {coinsData?.length > 0 &&
                coinsData.map((val, i) => {
                  return (
                    loardData > i && (
                      <ListItem key={i}>
                        <CoinHeader>
                          <CoinIcon src={val.image} alt="icon" />
                          <CoinTitle>{val.name}</CoinTitle>
                          <IconGlobalStyleComponent
                            onClick={() => null}
                            ml={10}
                            mr={10}
                            height={15}
                            width={15}
                            img="/images/icons/shere.png"
                            opecity={0.5}
                          />
                        </CoinHeader>
                        <Grid container spacing={0} pb={2}>
                          <Grid textAlign="left" item xs={5}>
                            <Text>You Can Get USDT</Text>
                            <TextDown>
                              {val.current_price} <ChangeText>{val.pr}</ChangeText>
                            </TextDown>
                          </Grid>
                          <Grid textAlign="left" item xs={5}>
                            <Text>
                              {val.symbol}
                              {/* <Btn>
                                  <IconGlobalStyleComponent
                                    onClick={() => {}}
                                    ml={10}
                                    mr={10}
                                    height={15}
                                    width={15}
                                    img="/images/icons/short.png"
                                    opecity={0.5}
                                  />
                                </Btn> */}
                            </Text>
                            <TextDown>{val.current_price}</TextDown>
                          </Grid>
                          <Grid textAlign="left" item xs={2}>
                            <Text>Market Cap</Text>
                            <TextDown>{numberWithCommas(val?.market_cap.toString().slice(0, -6))} M</TextDown>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )
                  );
                })}
            </RouterList>
          </QuoteTableblur>
        ) : (
          <CardCustom>
            <PriceDetail>
              <MaxPriceDetail>
                Max Price Slippage:{' '}
                <MainSpan>
                  &nbsp;1%
                  {/* <ImageSpan>
                    <IconGlobalStyleComponent
                      onClick={() => {}}
                      ml={5}
                      mr={0}
                      height={7}
                      width={11}
                      img="/images/icons/downArrow.png"
                      opecity={0.5}
                    />
                  </ImageSpan> */}
                </MainSpan>
              </MaxPriceDetail>
              {/*<MaxPriceDetail>
                Gas Price:{' '}
                <MainSpan>
                  &nbsp;206 GWEI
                  {/* <ImageSpan>
                    <IconGlobalStyleComponent
                      onClick={() => {}}
                      ml={5}
                      mr={0}
                      height={7}
                      width={11}
                      img="/images/icons/downArrow.png"
                      opecity={0.5}
                    />
                  </ImageSpan>
                </MainSpan>
              </MaxPriceDetail> */}
            </PriceDetail>
            <DataUpdat>
              <UpdateTitle>Data updated 18m ago. Please refresh:</UpdateTitle>
              <RefresBtn>Refresh</RefresBtn>
            </DataUpdat>
            <RouterList aria-label="main mailbox folders">
              {coinsData?.map((val, i) => {
                return (
                  loardData > i && (
                    <ListItem key={i}>
                      <CoinHeader>
                        <CoinIcon src={val.image} alt="icon" />
                        <CoinTitle>{val.name}</CoinTitle>
                        <IconGlobalStyleComponent
                          onClick={() => null}
                          ml={10}
                          mr={10}
                          height={15}
                          width={15}
                          img="/images/icons/shere.png"
                          opecity={0.5}
                        />
                      </CoinHeader>
                      <Grid container spacing={0} pb={2}>
                        <Grid textAlign="left" item xs={5}>
                          <Text>You Can Get USDT</Text>
                          <TextDown>{val.current_price}</TextDown>
                        </Grid>
                        <Grid textAlign="left" item xs={5}>
                          <Text>
                            USD
                            <Btn>
                              <IconGlobalStyleComponent
                                onClick={() => null}
                                ml={10}
                                mr={10}
                                height={15}
                                width={15}
                                img="/images/icons/short.png"
                                opecity={0.5}
                              />
                            </Btn>
                          </Text>
                          <TextDown>{val.symbol}</TextDown>
                        </Grid>
                        <Grid textAlign="left" item xs={2}>
                          <Text>Market Cap</Text>
                          <TextDown>{numberWithCommas(val?.market_cap.toString().slice(0, -6))} M</TextDown>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                );
              })}
            </RouterList>
          </CardCustom>
        )}
        <ShowMore
          onClick={
            data.length === loardData || data.length + 1 === loardData
              ? () => {
                  setLoardData(2);
                  setBlur(true);
                }
              : () => {
                  setLoardData(data.length > loardData ? loardData + 2 : loardData);
                  setBlur(false);
                }
          }
        >
          {data.length === loardData || data.length + 1 === loardData ? 'Hide Details' : 'Show More Details'}
          <DownArrowImgTop
            src={
              data.length === loardData || data.length + 1 === loardData
                ? '/images/icons/hideDetail.png'
                : '/images/icons/showMore.png'
            }
            alt="Hide"
          />
        </ShowMore>
      </>
    </QuoteTablesMain>
  );
};

export default QuoteTables;
