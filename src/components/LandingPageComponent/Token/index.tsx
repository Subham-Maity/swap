import React from 'react'
import { styled } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import Container from '@mui/material/Container';
import { Grid } from '@material-ui/core';

const Text = styled('p')({
    fontSize: '44px',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '5%',
    '@media (max-width: 660px)': {
        fontSize: '30px',
    }

});

const Pre = styled('p')({
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    marginTop: '1%',
    '@media (max-width: 660px)': {
        paddingLeft: 5
    }
});

const Card = styled('div')({
    borderRadius: '24px',
    marginTop: '20px',
    backgroundColor: '#edebf0',
    overflow: 'hidden',
    marginBottom: '15%',
    '@media (max-width: 660px)': {
        height: 'auto',
        width: '92vw',
        marginBottom: '3%',
    }
});


const MinesCard = styled('div')({
    borderRadius: '24px',
    marginTop: '20px',
    backgroundColor: 'rgb(250 225 227)',
    overflow: 'hidden',
    marginBottom: '15%',
    '@media (max-width: 660px)': {
        height: 'auto',
        width: '92vw',
        marginBottom: '3%',
    }
});

const Header = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const Plus = styled('p')({
    backgroundColor: '#F7931A',
    padding: '5px',
    borderRadius: '100px'
});

const Mines = styled('p')({
    backgroundColor: 'red',
    padding: '5px',
    borderRadius: '100px',
    color: 'white'
});


const Title = styled('p')({
    color: '#04294F',
    fontWeight: '600',
    marginTop: 10
});

const BTC = styled('p')({
    color: '#04294F',
    fontWeight: '500',
    marginTop: 10
});


const Price = styled('h2')({
    color: '#04294F',
    fontWeight: '600',
    marginTop: 10
});

const Chart = styled('div')({
    height: '100px',
    width: '100%',
    marginTop: '70px',
});


const Content = styled('div')({
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
});



const AddCard = styled('div')({
    borderRadius: '24px',
    marginTop: '20px',
    overflow: 'hidden',
    marginBottom: '15%',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 660px)': {
        height: 'auto',
        width: '92vw',
        marginBottom: '3%',
    }
});


const H2 = styled('h2')({
    textAlign: 'center',
});

const AddDiv = styled('div')({
    marginTop: '50%',
    marginBottom: '42%',
    '@media (max-width: 660px)': {
        height: '250px',
        width: '350px',
        marginBottom: '3%',
    }
});


const AddImg = styled('img')({
    margin: 'auto',
    display: 'block'
});


const Token = () => {
    const data = [10, 12, 15, 14, 12, 14, 13, 15, 12, 10, 8, 5, 9, 10, 12, 14, 11, 15, 12, 15, 13, 14, 12, 15, 12, 14, 12]
    return (
        <>
            <Text>Ethereum, Binance & <br /> Polygon Tokens</Text>
            <Pre>Pellentesque nunc ac interdum neque in purus in pharetra</Pre>
            <Container>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <MinesCard>
                            <Content>
                                <Header>
                                    <img src="/images/chains/binance.png" />
                                    <Mines>+1.38%</Mines>
                                </Header>
                                <Title>Bitcoin</Title>
                                <BTC>BTC</BTC>
                                <Price>$41,258.40</Price>
                            </Content>
                            <Chart>
                                <ReactEcharts
                                    option={{
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'cross',
                                                label: {
                                                    backgroundColor: '#F04E23',
                                                },
                                            },
                                        },
                                        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                                        grid: {
                                            left: '0%',
                                            right: '0%',
                                            bottom: '65%',
                                            top: '0%',
                                            containLabel: false,
                                        },
                                        xAxis: [
                                            {
                                                type: 'category',
                                                boundaryGap: false,
                                                show: false,
                                                data: data
                                            },
                                        ],
                                        yAxis: [
                                            {
                                                type: 'value',
                                                show: false,
                                            },
                                        ],
                                        series: [
                                            {
                                                name: 'Ethereum',
                                                type: 'line',
                                                stack: 'Total',
                                                lineStyle: {
                                                    width: 1.5,
                                                    color: '#F04E23',
                                                },
                                                showSymbol: false,
                                                symbolSize: 0,
                                                areaStyle: {
                                                    opacity: 0.8,
                                                    color: new echarts.graphic.LinearGradient(0, 0, 2, 1, [
                                                        {
                                                            offset: 0,
                                                            color: 'rgba(240, 78, 35, 0.15)',
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: 'rgba(240, 78, 35, 0)',
                                                        },
                                                    ]),
                                                },
                                                emphasis: {
                                                    focus: 'series',
                                                },
                                                data: data,
                                            },
                                        ],
                                    }}
                                />
                            </Chart>
                        </MinesCard>
                    </Grid>
                    <Grid item sm={3}>
                        <Card>
                            <Content>
                                <Header>
                                    <img src="/images/chains/binance.png" />
                                    <Plus>+1.38%</Plus>
                                </Header>
                                <Title>Bitcoin</Title>
                                <BTC>BTC</BTC>
                                <Price>$41,258.40</Price>
                            </Content>
                            <Chart>
                                <ReactEcharts
                                    option={{
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'cross',
                                                label: {
                                                    backgroundColor: '#5D5FEF',
                                                },
                                            },
                                        },
                                        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                                        grid: {
                                            left: '0%',
                                            right: '0%',
                                            bottom: '65%',
                                            top: '0%',
                                            containLabel: false,
                                        },
                                        xAxis: [
                                            {
                                                type: 'category',
                                                boundaryGap: false,
                                                show: false,
                                                data: data
                                            },
                                        ],
                                        yAxis: [
                                            {
                                                type: 'value',
                                                show: false,
                                            },
                                        ],
                                        series: [
                                            {
                                                name: 'Ethereum',
                                                type: 'line',
                                                stack: 'Total',
                                                lineStyle: {
                                                    width: 1.5,
                                                    color: '#5D5FEF',
                                                },
                                                showSymbol: false,
                                                symbolSize: 0,
                                                areaStyle: {
                                                    opacity: 0.8,
                                                    color: new echarts.graphic.LinearGradient(0, 0, 2, 1, [
                                                        {
                                                            offset: 0,
                                                            color: 'rgba(93, 95, 239, 0.5)',
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: 'rgba(93, 95, 239, 0)',
                                                        },
                                                    ]),
                                                },
                                                emphasis: {
                                                    focus: 'series',
                                                },
                                                data: data,
                                            },
                                        ],
                                    }}
                                />
                            </Chart>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                        <Card>
                            <Content>
                                <Header>
                                    <img src="/images/chains/binance.png" />
                                    <Plus>+1.38%</Plus>
                                </Header>
                                <Title>Bitcoin</Title>
                                <BTC>BTC</BTC>
                                <Price>$41,258.40</Price>
                            </Content>
                            <Chart>
                                <ReactEcharts
                                    option={{
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'cross',
                                                label: {
                                                    backgroundColor: '#5D5FEF',
                                                },
                                            },
                                        },
                                        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                                        grid: {
                                            left: '0%',
                                            right: '0%',
                                            bottom: '65%',
                                            top: '0%',
                                            containLabel: false,
                                        },
                                        xAxis: [
                                            {
                                                type: 'category',
                                                boundaryGap: false,
                                                show: false,
                                                data: data
                                            },
                                        ],
                                        yAxis: [
                                            {
                                                type: 'value',
                                                show: false,
                                            },
                                        ],
                                        series: [
                                            {
                                                name: 'Ethereum',
                                                type: 'line',
                                                stack: 'Total',
                                                lineStyle: {
                                                    width: 1.5,
                                                    color: '#5D5FEF',
                                                },
                                                showSymbol: false,
                                                symbolSize: 0,
                                                areaStyle: {
                                                    opacity: 0.8,
                                                    color: new echarts.graphic.LinearGradient(0, 0, 2, 1, [
                                                        {
                                                            offset: 0,
                                                            color: 'rgba(93, 95, 239, 0.5)',
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: 'rgba(93, 95, 239, 0)',
                                                        },
                                                    ]),
                                                },
                                                emphasis: {
                                                    focus: 'series',
                                                },
                                                data: data,
                                            },
                                        ],
                                    }}
                                />
                            </Chart>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                        <AddCard>
                            <AddDiv>
                                <H2>Add Token</H2>
                                <AddImg src="/images/icons/Add.png" />
                            </AddDiv>
                        </AddCard>  
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


export default Token
