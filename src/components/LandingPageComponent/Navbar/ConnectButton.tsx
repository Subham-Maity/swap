import React from 'react'
import { styled } from '@mui/system';

const ConnectBtn = styled('button')({
    backgroundColor: '#5D5FEF',
    color: 'white',
    borderRadius: '12px',
    border: 'none',
    padding: 15,
    width:'150px',
    '@media (max-width: 1199px)': {
        width:'100%',
        marginTop:'100%'
    }
});

const ConnectButton = () => {
    return (
        <ConnectBtn>Connect Wallet</ConnectBtn>
    )
}


export default ConnectButton
