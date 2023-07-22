import { Grid } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system';



const Div = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});


const Pre = styled('h2')({
    fontWeight: '600',
    textAlign:'center'
});

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    marginTop: '10%'
});

const Grid1 = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});



const Card = () => {
    return (
        <Grid1 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sm={4}>
                <Div>
                    <div>
                        <Img src="/images/icons/fire.png" />
                        <Pre>Better gas than going <br /> directly to the source</Pre>
                    </div>
                </Div>
            </Grid>
            <Grid item sm={4}>
                <Div>
                    <div>
                        <Img src="/images/icons/pr.png" />
                        <Pre>We never collect any <br/> additional fees</Pre>
                    </div>
                </Div>
            </Grid>
            <Grid item sm={4}>
                <Div>
                    <div>
                        <Img src="/images/icons/Dollar.png" />
                        <Pre>We always display all <br/> the costs up front</Pre>
                    </div>
                </Div>
            </Grid>
        </Grid1>
    )
}


export default Card
