// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Lists(theme: { [x: string]: any; spacing: (arg0: number) => any }) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        /* root: {
          '&:hover': {
            background: theme.palette.color.active,
          },
        }, */
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}
