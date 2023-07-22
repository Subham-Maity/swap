import { styled } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React from 'react'


const FooterDiv = styled('div')({
    marginTop: '10%',
    padding: '1%',
    backgroundColor: '#edebf0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 660px)': {
        width:'100%',
        paddingTop:'10%',
        paddingBottom:'10%'
    }
});
const H2 = styled('h2')({
    color: '#200440'
});


const Div = styled('div')({
    display: 'flex',
    alignItems: 'end',
    justifyContent:'end',
    '@media (max-width: 660px)': {
        marginTop:20,
        marginBottom:20
    }
});

const Title = styled('p')({
    fontWeight: 'bold',
    color: '#666666',
    marginLeft: 10,
    marginRight: 10
});

const Imgs = styled('img')({
    height: '52px',
    width: '52px',
    marginLeft: 10,
    marginRight: 10
});


const Grid1 = styled(Grid)({
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
});


const Footer = () => {
    return (
        <FooterDiv>
            <Grid1 container>
                <Grid item sm={4}>
                    <H2>Cryptoverse</H2>
                </Grid>
                <Grid item sm={4}>
                    <Div>
                        <Title>Buy Crypto</Title>
                        <Title>Blog</Title>
                        <Title>Help</Title>
                        <Title>Terms</Title>
                        <Title>Privacy</Title>
                    </Div>
                </Grid>
                <Grid item sm={4}>
                    <Div>
                        <Imgs src="/images/icons/TelegramW.png" />
                        <Imgs src="/images/icons/TwitterW.png" />
                        <Imgs src="/images/icons/DisW.png" />
                    </Div>
                </Grid>
            </Grid1>
        </FooterDiv>
    )
}


export default Footer
