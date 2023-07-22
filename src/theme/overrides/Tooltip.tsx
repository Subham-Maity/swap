// ----------------------------------------------------------------------

export default function Tooltip(theme: { palette: { grey: any[] } }) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#fff',
          color: '#595959',
          boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.1)',
          borderRadius: 16,
          fontSize: '14px',
          fontWeight: '500',
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  };
}
