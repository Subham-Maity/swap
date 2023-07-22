import { Button, styled } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ThemeProps } from 'theme';
import { sliceString } from 'utils';

const ReferralModalMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ShareImage = styled(Button)({
  backgroundColor: '#f2f2f2',
  paddingLeft: 7,
  paddingRight: 7,
  paddingBottom: 14,
  paddingTop: 14,
  borderRadius: 16,
});

const PreText = styled('p')({
  marginLeft: 10,
  fontWeight: '500',
});

const ReadMore = styled('span')((props: { theme?: ThemeProps }) => ({
  background: props.theme && props.theme.palette.color.active,
  color: 'transparent',
  backgroundClip: 'text',
  marginLeft: 2,
  cursor: 'pointer',
}));

const ReferralModal = () => {
  let { active, account } = useWeb3React();

  return (
    <ReferralModalMain>
      <ShareImage>
        <img src="/images/icons/shereLogo.png" alt="Share" />
      </ShareImage>
      {active && account ? (
        <PreText>Your referral url is {sliceString(`https://staging.plug.exchange?referer=${account}`, 40)}</PreText>
      ) : (
        <PreText>
          Connect wallet to generate referral link.How it works?
          <ReadMore>Read More</ReadMore>
        </PreText>
      )}
    </ReferralModalMain>
  );
};

export default ReferralModal;
