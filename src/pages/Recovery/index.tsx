/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { styled } from '@mui/system';
import { Menu, MenuItem } from '@mui/material';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import Buttons from 'theme/Buttons';

const RecoveryMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const RecoveryModal = styled('div')({
  borderRadius: 24,
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  width: '586px',
  // height: '462px',
  marginBottom: '5%',
  marginTop: '5%',
  padding: '2%',
});

const Pre = styled('div')({
  width: '68%',
  marginBottom: '5%',
  '@media (max-width: 700px)': {
    width: '90%',
  },
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled('h2')({
  fontWeight: '600',
});

const Subtitle = styled('p')({
  opacity: 0.65,
});

const Btn = styled('div')((props: { advBtn: boolean }) => ({
  width: '100%',
  paddingTop: '2%',
  paddingBottom: '2%',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: props?.advBtn ? '#f7f7f7' : 'white',
  boxShadow: !props?.advBtn ? '0px 20px 40px rgba(0, 0, 0, 0.1)' : 'none',
  paddingLeft: '5%',
  paddingRight: '5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: props?.advBtn ? '#8d8d8d' : '#8d8d8d',
  fontWeight: '600',
}));

const Menu1 = styled(Menu)({
  width: '100%',
});

const Dropimg = styled('img')({
  height: '36px',
  width: '36px',
  borderRadius: '100%',
  marginRight: '20px',
});

const Btncontent = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Dropdown = styled('img')({
  opacity: '0.5',
});

const MenuItem1 = styled(MenuItem)({
  width: '41vw',
});

const Source = styled('p')({
  fontWeight: '600',
  color: '#949494',
});

const SourceDiv = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingTop: '2%',
  paddingBottom: '2%',
  paddingLeft: '2%',
  borderRadius: '12px',
});

const Btndiv = styled('p')({
  marginLeft: '-40px',
});

const Recovery = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <RecoveryMain>
        <RecoveryModal>
          <Header>
            <Title>Token Recovery</Title>
            <IconGlobalStyleComponent
              ml={10}
              mr={10}
              height={20}
              width={20}
              img="/images/image/About.svg"
              opecity={0.3}
              onClick={() => null}
            />
          </Header>
          <br />
          <Subtitle>Source Chain</Subtitle>
          <br />
          <div>
            <Btn
              advBtn={false}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e: any) => handleClick(e)}
            >
              <Btncontent>
                <Dropimg src="/images/chains/bsc.png" />
                Solana
              </Btncontent>
              <Dropdown src="/images/icons/downArrow.png" />
            </Btn>
            <Menu1
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
            </Menu1>
          </div>
          <br />
          <br />
          <SourceDiv>
            <Source>Source Tx (paste here)</Source>
          </SourceDiv>
          <Btndiv>
            <Buttons width="93%" isactive={false} onClick={() => null} title="Recover" />
          </Btndiv>
          <div>
            <Btn
              advBtn={true}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e: any) => handleClick(e)}
            >
              <Btncontent>
                <Dropimg src="/images/chains/bsc.png" />
                Advanced
              </Btncontent>
              <Dropdown src="/images/icons/downArrow.png" />
            </Btn>
            <Menu1
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
              <MenuItem1 onClick={handleClose}>Sol</MenuItem1>
            </Menu1>
          </div>
        </RecoveryModal>
      </RecoveryMain>
      <RecoveryMain>
        <Pre>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa at nisl libero nisi, arcu fusce fusce. Diam
          aliquet nunc, neque sit sed mauris. Nulla fringilla sit odio odio convallis nulla dolor tristique in.
          Ullamcorper justo quam a vestibulum, sodales elementum volutpat. Quisque viverra risus fames dignissim odio
          rhoncus aenean purus id. Libero vel dapibus pharetra enim consectetur sit. Metus nisi, convallis condimentum
          tincidunt mauris. Vestibulum, suscipit phasellus sapien augue convallis odio. Sed et vitae, faucibus massa
          massa id in ullamcorper congue. Interdum risus sit enim vestibulum elementum rhoncus nisl pharetra blandit.
          Orci sit massa vitae fames et. Elit molestie odio arcu vestibulum, sed proin. Euismod ipsum nam diam nibh
          viverra aenean aliquam. Ut lacus cras nunc ac nulla amet amet.
        </Pre>
      </RecoveryMain>
    </>
  );
};

export default Recovery;
