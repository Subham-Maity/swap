// ----------------------------------------------------------------------

export default function Card(theme: {
  customShadows: { z16: any };
  shape: { borderRadiusMd: any };
  spacing: (arg0: number, arg1: number | undefined, arg2: number | undefined) => any;
}) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z16,
          borderRadius: theme.shape.borderRadiusMd,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 3),
        },
      },
    },
  };
}
