import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';
import { Box } from '@mui/material';

const AlertNotification = styled('div')({
  width: '100%',
  backgroundColor: '#F7F7F7',
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  padding: 10,
  minWidth: '90%',
});

const AlertTitle = styled('p')({
  marginLeft: 5,
  fontWeight: '500',
  color: 'rgba(0, 0, 0, 0.65)',
  paddingTop: 20,
  paddingLeft: 10,
  paddingBottom: 20,
});

const Img = styled('img')({
  margin: 'auto',
  marginTop: 20,
});

const Notificationdiv = styled('div')({
  display: 'flex',
  justifyContent: 'end',
});

const CrossButton = styled('div')({
  marginTop: -50,
});

const AlertImg = styled(Box)({
  borderRadius: 16,
  background: '#FFFFFF',
  boxShadow: '0px 15px 25px rgb(0 0 0 / 10%)',
  height: 72,
  width: 72,
});

const SnackbarWrapper = styled(Snackbar)({
  top: '90px!important',
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

const AppChainIdError = () => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  type ReduxState = {
    Alert: {
      type: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Alert: any = useSelector((state: ReduxState) => state.Alert);
  React.useEffect(() => {
    setState(Alert);
  }, [Alert]);
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Notificationdiv>
      <SnackbarWrapper
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={state ? state.open : false}
        autoHideDuration={60000}
        onClose={handleClose}
        key={1}
      >
        <AlertNotification>
          <AlertImg>
            <Img height={30} width={30} src="/images/icons/unsupported.png" />{' '}
          </AlertImg>
          <AlertTitle>
            Unsupported chain ID: 1
            <br />
            Supported chain IDs are: 56
          </AlertTitle>
          <CrossButton>
            <IconGlobalStyleComponent
              ml={0}
              mr={10}
              height={12}
              width={12}
              img="/images/icons/cros.png"
              opecity={1}
              onClick={() => handleClose()}
            />
          </CrossButton>
        </AlertNotification>
      </SnackbarWrapper>
    </Notificationdiv>
  );
};

export default AppChainIdError;
