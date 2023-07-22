// ----------------------------------------------------------------------

export default function Button(theme: {
  palette: { action: { hover: any; }, color:{active:string} ,grey: any[] };
  customShadows: { z8: any; primary: any; secondary: any };
}) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          lineHeight: 24 / 14,
          textTransform: 'capitalize',
          padding: '6px 10px',
          borderRadius: 16,
          '&:hover': {
            boxShadow: 'none',
            background: theme.palette.color.active,
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedDark: {
          color: 'white',
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'black',
          },
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            background: theme.palette.color.active,
          },
        },
        textInherit: {
          '&:hover': {
            background: theme.palette.color.active,
          },
        },
      },
    },
  };
}
