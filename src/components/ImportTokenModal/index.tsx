import { styled } from '@mui/system';
import { Button, FormControlLabel, Radio, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ThemeProps } from '../../theme';
import { Token } from '../../store/tokens';
import Modal from '../Modal';
import { sliceString } from 'utils';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 6,
  paddingTop: 0,
  height: '85%',
  borderRadius: 5,
  overFlow: 'auto',
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '82%',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 6,
  paddingTop: 0,
  height: '70%',
  borderRadius: 5,
  overFlow: 'auto',
};

const ImportTokenHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop:24
});

const ImportTokenTitle = styled('p')({
  fontSize: '24px',
  fontWeight: 600,
});

const Token = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '5%',
  marginBottom: '4%',
});

const TokenImg = styled('img')({
  height: 36,
  width: 36,
  marginRight: 10,
});
const RadioButtonLabel = styled(FormControlLabel)({
  marginRight: 5,
});
const TokenName = styled('span')({
  fontWeight: 600,
});

const TokenCode = styled('span')({
  fontWeight: 600,
  color: '#dbdbdb',
});

const TokenKey = styled('span')({
  fontWeight: 500,
  color: '#dbdbdb',
  '@media (max-width: 660px)': {
    fontSize: 14,
    color: '#dbdbdb',
  },
});

const WarningContent = styled('div')({
  backgroundColor: '#f0f0f0',
  padding: 20,
  borderRadius: 20,
  marginTop: 24,
  marginBottom: 15,
  paddingTop: 30,
  paddingBottom: 30,
  maxWidth:310
});

const Info = styled('img')({
  height: 24,
  width: 24,
  marginRight: 10,
});

const WarningText = styled('span')({
  fontSize: 18,
  fontWeight: 600,
  color: 'red',
});

const Red = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 15,
});

const Pre = styled('span')({
  fontSize: 14,
  fontWeight: 500,
  color: '#565656',
  lineHeight: 1.5,
});

const ParmitionText = styled('span')({
  fontWeight: 500,
  color: '#565656',
});

const ParmitionMain = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  marginBottom: 20,
});

const ImportTokenButton = styled(Button)((props: { theme?: ThemeProps; isDisabled: boolean }) => ({
  width: '100%',
  background: props.theme && props.theme.palette.color.active,
  borderRadius: 16,
  padding: 7,
  color: 'white!important',
  fontWeight: 600,
  textTransform: 'initial',
  height: '52px',
  opacity: props.isDisabled ? 0.3 : 1,
}));

export type ImportTokenProps = {
  isOpen: boolean;
  handleClose: () => void;
  importedToken: Token;
  triggeredImport: () => void;
};

const ImportTokenModal = ({ isOpen, handleClose, importedToken, triggeredImport }: ImportTokenProps) => {
  const [Check, setCheck] = React.useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width:660px)');

  return (
    <Modal isOpen={isOpen} close={handleClose} modalTitle="Import Token">
      {/* <Box sx={isDesktop ? style : style2}> */}
        {/* <ImportTokenHeader>
          <ImportTokenTitle>Import a Token</ImportTokenTitle>
          <IconGlobalStyleComponent
            ml={10}
            mr={0}
            height={15}
            width={15}
            img="/images/icons/cros.png"
            opecity={1}
            onClick={() => handleClose()}
          />
        </ImportTokenHeader> */}
        <Token>
          <TokenImg
            src={importedToken?.logoURI === undefined ? 'images/icons/defaultTokenIcon.png' : importedToken?.logoURI}
            alt="coin"
          />
          <TokenName>
            {importedToken?.name} <TokenCode>({importedToken?.symbol})</TokenCode>
          </TokenName>
        </Token>
        <TokenKey>{sliceString(importedToken?.address, 10)}</TokenKey>
        <WarningContent>
          <Red>
            <Info src="/images/icons/info.png" />
            <WarningText>Trade at your own risk!</WarningText>
          </Red>
          <Pre>
            Anyone can create a token, including creating fake versions of existing tokens that claim to represent
            proects.
          </Pre>
          <br />
          <br />
          <Pre>If you purchase this token, you may not be able to sell it back.</Pre>
        </WarningContent>
        <ParmitionMain>
          <RadioButtonLabel
            control={
              <Radio
                onClick={() => {
                  setCheck(!Check);
                }}
                checked={Check ? true : false}
              />
            }
            label=""
          />
          <ParmitionText>I understand and want to proceed.</ParmitionText>
        </ParmitionMain>
        <ImportTokenButton isDisabled={!Check} disabled={!Check} variant="text" onClick={() => triggeredImport()}>
          Import Token
        </ImportTokenButton>
      {/* </Box> */}
    </Modal>
  );
};

export default ImportTokenModal;
