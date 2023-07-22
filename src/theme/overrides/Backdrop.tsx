import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme: { palette: { grey: string[] } }) {
  const varLow = alpha(theme.palette.grey[900], 0.48);
  const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // position: 'absolute',
          // height: 850,
          // overflow: 'auto',
          background: [
            `rgb(22,28,36)`,
            `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
    MuiModal:{
       styleOverrides: {
        root:{
          position: 'absolute',
          overflow:'auto'
        }
       }
    }
  };
}
