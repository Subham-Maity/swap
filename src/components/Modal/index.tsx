import React from 'react';
import { styled } from '@mui/system';
import { Box, Modal as MuiModal } from '@mui/material';
import { ThemeProps } from 'theme';

const ModalCustom = styled(MuiModal)({
  border: 'none',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});

const ModalHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 15,
  marginBottom: 15,
});

const HeaderTitle = styled('h2')({
  fontWeight: '600',
  marginLeft: '5%',
});
const Img = styled('img')({
 cursor:'pointer',
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'white',
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 4,
  paddingTop: 0,
  // height: '80%',
  borderRadius: 5,
};
const ModalWrapper = styled(Box)((props: { theme?: ThemeProps }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  backgroundColor: 'white',
  paddingLeft: 32,
  paddingRight: 32,
  paddingBottom: 32,
  paddingTop: 0,
  // height: '80%',
  borderRadius: 40,
  [props.theme.breakpoints.down('md')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
}));

export type ModalProps = {
  isOpen: boolean;
  modalTitle: string;
  children: React.ReactNode;
  close: () => void;
  showCloseButton?: boolean;
};

const Modal = ({ isOpen, modalTitle, children, close }: ModalProps): JSX.Element => {
  return (
    <ModalCustom open={isOpen} onClose={() => close()}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderTitle>{modalTitle}</HeaderTitle>
          <Img src="/images/icons/cros.png" onClick={() => close()} alt="x" />
        </ModalHeader>
        {children}
      </ModalWrapper>
    </ModalCustom>
  );
};

export default Modal;
