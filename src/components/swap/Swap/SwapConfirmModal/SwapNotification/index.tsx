import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/system';

const AlertNotification = styled('div')({
  width: '100%',
  backgroundColor: '#F7F7F7',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 10,
  maxWidth: '70%',
});

const AlertTitle = styled('p')({
  marginLeft: 5,
  fontWeight: '500',
  color: 'rgba(0, 0, 0, 0.65)',
});

const AlertTitleSuccess = styled('span')({
  marginLeft: 5,
  fontWeight: '500',
  color: 'black',
});

const AlertTitleError = styled('span')({
  marginLeft: 5,
  fontWeight: '500',
  color: 'red',
});

const Btn = styled('span')({
  color: '#BB36FF',
});

const Img = styled('img')({
  marginTop: 15,
});

const Notificationdiv = styled('div')({
  display: 'flex',
  justifyContent: 'end',
});

interface SwapNotificationProps {
  serverity: 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS';
  swapCurrency: string;
  receivedCurrency: string;
}

const SwapNotification = ({ serverity, swapCurrency, receivedCurrency }: SwapNotificationProps) => {
  let [open, setOpen] = React.useState<boolean>(true);

  return (
    <Notificationdiv>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <AlertNotification>
          {serverity === 'ERROR' ? (
            <>
              <Img height={72} width={72} src="/images/icons/error.png" />
              <AlertTitle>
                Swap exactly
                <AlertTitleError>{swapCurrency}</AlertTitleError>
                for
                <AlertTitleError>{receivedCurrency}</AlertTitleError>
              </AlertTitle>
            </>
          ) : (
            <>
              <Img height={72} width={72} src="/images/icons/success.png" />
              Swap exactly
              <AlertTitleSuccess>{swapCurrency}</AlertTitleSuccess>
              for
              <AlertTitleSuccess>{receivedCurrency}</AlertTitleSuccess>
              <br />
              <Btn>View on Explorer</Btn>
            </>
          )}
        </AlertNotification>
      </Snackbar>
    </Notificationdiv>
  );
};

export default SwapNotification;
