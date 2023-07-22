import { styled } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import { aggregatorsInfo } from '../../../../config/aggregatorInfo';
import { currencyFormatter, roundValue } from 'utils';
import { SwapQuotesResponseWithTxCost } from 'hooks/useSwapQuotes';

const ETH = styled('p')((props: { theme?: ThemeProps }) => ({
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  fontWeight: 500,
}));

const ShortView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '7%',
});

const SwapRouterButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '5%',
});

const UsdtList = styled('div', { shouldForwardProp: (prop) => prop !== 'isSelected' })(
  (props: { isSelected: boolean }) => ({
    borderRadius: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: '1px',
    borderColor: props?.isSelected ? '#BB36FF' : 'rgba(0, 0, 0, 0.1)',
    borderStyle: 'solid',
    margin: 10,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '20px',
    padding: '16px 20px',
    height: '92px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ededed',
      borderColor: '#BB36FF',
    },
  }),
);

const Title = styled('h3')((props: { theme?: ThemeProps; isDisabled: boolean }) => ({
  color: props.isDisabled ? '#949494' : 'black',
  fontSize: props.theme && props.theme.typography.routeTitle.fontSize,
  fontWeight: 600,
}));

const CustomButtonActive = styled('button')((props: { iscoin: boolean; theme?: ThemeProps }) => ({
  borderRadius: '100px',
  background:
    props.iscoin && props.theme
      ? props.theme.palette.color.buttonBackground
      : props.theme && props.theme.palette.color.active,
  padding: '3px 10px',
  fontSize: '14px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  color: props.iscoin ? '#555555' : '#FFFFFF',
  marginLeft: 15,
  marginRight: 5,
  height: '28px',
}));

const UsdtListItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3%',
});

const Amount = styled('h3')((props: { theme?: ThemeProps; isDisabled: boolean }) => ({
  fontSize: props.theme && props.theme.typography.routeTitle.fontSize,
  fontWeight: '600',
  color: props.isDisabled && '#949494',
}));

const ListTile = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const RoutButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5%',
});

const Span = styled('span')({
  fontWeight: '500',
  fontSize: '14px',
  color: '#999999',
});

const AutoRoute = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 15,
  paddingRight: 15,
});

const AutoText = styled('p')((props: { theme?: ThemeProps }) => ({
  fontSize: '16px',
  fontWeight: '600',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
}));

const Route = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: '5%',
  marginLeft: '5%',
  marginTop: '16px',
});

const CoinImg = styled('img')({
  height: '24px',
  width: '24px',
  marginRight: 15,
});

const CViewImg = styled('img')({
  height: '24px',
  width: '24px',
});

const CViewImgThree = styled('img')({
  height: '24px',
  width: '24px',
  marginRight: 20,
});

const CView = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const RouterImg = styled('img')({
  height: '24px',
  width: '24px',
  marginRight: 5,
});

const ShowMore = styled('p')((props: { theme?: ThemeProps }) => ({
  textAlign: 'center',
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  fontWeight: '500',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
}));

const DownArrowImgTop = styled('img')({
  height: 11,
  paddingLeft: 10,
});

const DashedBorder = styled('div')({
  width: 'auto',
  minWidth: 367,
  position: 'absolute',
  borderTop: '1px dashed #000000',
});

// eslint-disable-next-line @typescript-eslint/ban-types
type RouteWithValidQuotes = {};

type BestRoute = {
  route: RouteWithValidQuotes[];
  protocol: string;
  proportion: string;
};

export type SwapRouterProps = {
  liquiditySources: SwapQuotesResponseWithTxCost[];
  router: BestRoute[];
  fromTokenTicker: string;
  toTokenTicker: string;
  fromTokenAmount: number;
  toTokenAmount: number;
  selectedAggregatorId: string;
  changeSwitch: () => void;
  setSelectedAggregatorId: (selectedAggregatorId: string) => void;
};

// eslint-disable-next-line no-empty-pattern
const SwapRouter = ({
  liquiditySources,
  fromTokenTicker,
  toTokenTicker,
  fromTokenAmount,
  toTokenAmount,
  changeSwitch,
  setSelectedAggregatorId,
  selectedAggregatorId,
  router,
}: SwapRouterProps) => {
  const [showMore, setShowMore] = useState<boolean>(true);
  const [showRouteDetails, setShowRouteDetails] = useState<boolean>(false);
  const [loardData, setLoardData] = useState<number>(1);
  useEffect(() => {
    setLoardData(2);
  }, []);

  return (
    <Fragment>
      <SwapRouterButton>
        <ShortView>
          {fromTokenAmount && toTokenAmount && (
            <>
              <ETH>
                {fromTokenAmount} {fromTokenTicker} = {toTokenAmount} {toTokenTicker}
              </ETH>
              <IconGlobalStyleComponent
                onClick={() => changeSwitch()}
                ml={10}
                mr={0}
                height={15}
                width={15}
                img="/images/icons/shortVartical.png"
                opecity={1}
              />
            </>
          )}

          {/* <Skeleton varihant="rounded" width={139} height={28} /> */}
        </ShortView>
        <IconGlobalStyleComponent
          onClick={() => {
            setShowMore(!showMore);
          }}
          ml={0}
          mr={30}
          height={8}
          width={11}
          img={showMore ? '/images/icons/topArrow.png' : '/images/icons/downArrow.png'}
          opecity={1}
        />
      </SwapRouterButton>
      {showMore && liquiditySources?.length > 0 && (
        <>
          {liquiditySources &&
            liquiditySources?.length > 0 &&
            liquiditySources.map((swapQuote: SwapQuotesResponseWithTxCost, _i) => {
              return (
                loardData > _i && (
                  <UsdtList
                    key={swapQuote?.aggregatorId}
                    onClick={() => setSelectedAggregatorId(swapQuote?.aggregatorId)}
                    isSelected={
                      selectedAggregatorId !== undefined
                        ? selectedAggregatorId?.toLowerCase() === swapQuote?.aggregatorId?.toLowerCase()
                        : _i === 0
                    }
                  >
                    <UsdtListItem>
                      <ListTile>
                        <RouterImg src={swapQuote?.aggregatorLogo} alt="image" />
                        <Title isDisabled={_i !== 0}>{aggregatorsInfo?.[swapQuote?.aggregatorId]}</Title>
                        {swapQuote?.save > 0 && (
                          <CustomButtonActive iscoin={showMore && !showMore}>
                            Save {currencyFormatter(swapQuote?.save)}
                          </CustomButtonActive>
                        )}
                      </ListTile>
                      <Amount isDisabled={_i !== 0}>{swapQuote?.formattedRecievedAmount}</Amount>
                    </UsdtListItem>
                    <UsdtListItem>
                      <Span>
                        TXN Cost {roundValue(swapQuote?.txCost, 5)} = (
                        {currencyFormatter(Number(swapQuote?.txCostInUsd))})
                      </Span>
                      <Span>{currencyFormatter(swapQuote?.toAmountInUsd)}</Span>
                    </UsdtListItem>
                  </UsdtList>
                )
              );
            })}

          <ShowMore
            onClick={
              liquiditySources?.length === loardData || liquiditySources?.length + 1 === loardData
                ? () => {
                    setLoardData(2);
                  }
                : () => {
                    setLoardData(liquiditySources?.length > loardData ? loardData + 2 : loardData);
                  }
            }
          >
            {liquiditySources?.length === loardData || liquiditySources?.length + 1 === loardData
              ? 'Hide Details'
              : 'Show More Details'}
            <DownArrowImgTop
              src={
                liquiditySources?.length === loardData || liquiditySources?.length + 1 === loardData
                  ? '/images/icons/hideDetail.png'
                  : '/images/icons/showMore.png'
              }
              alt="Hide"
            />
          </ShowMore>
          {router?.length > 0 && (
            <AutoRoute>
              <RoutButton>
                <IconGlobalStyleComponent
                  onClick={() => null}
                  ml={0}
                  mr={10}
                  height={20}
                  width={20}
                  img="/images/icons/trans.png"
                  opecity={1}
                />
                <AutoText>Routers</AutoText>
                {/* <QusetionIcon src="/images/image/puestion.svg" alt="image" /> */}
                <IconGlobalStyleComponent
                  onClick={() => null}
                  ml={10}
                  mr={0}
                  height={20}
                  width={20}
                  img="/images/image/puestion.svg"
                  opecity={0.3}
                />
              </RoutButton>
              <IconGlobalStyleComponent
                onClick={() => {
                  setShowRouteDetails(!showRouteDetails);
                }}
                ml={0}
                mr={20}
                height={showRouteDetails ? 3 : 14}
                width={showRouteDetails ? 15 : 14}
                img={showRouteDetails ? '/images/icons/hr.png' : '/images/icons/plusIcon.png'}
                opecity={0.3}
              />
            </AutoRoute>
          )}

          {showRouteDetails === true && (
            <Route>
              <CView>
                <CoinImg src="/images/chains/ethereum.png" alt="image" />
                <DashedBorder></DashedBorder>
                <CoinImg src="/images/chains/ethereum.png" alt="image" />
                <CustomButtonActive iscoin={showRouteDetails}>v3 - 100%</CustomButtonActive>
              </CView>
              <CView>
                <CViewImg src="/images/chains/ethereum.png" alt="image" />
                {/* <CViewImgTow src="/images/icons/coin3.png" alt="image" /> */}
                <CustomButtonActive iscoin={showRouteDetails}>0.05%</CustomButtonActive>
              </CView>
              <CView>
                <CViewImgThree src="/images/icons/coin3.png" alt="image" />
              </CView>
            </Route>
          )}
          {/* <Box p={3}>
            <Skeleton variant="rounded" height={28} />
          </Box> */}
        </>
      )}
    </Fragment>
  );
};

export default SwapRouter;
