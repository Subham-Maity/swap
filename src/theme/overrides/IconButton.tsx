// ----------------------------------------------------------------------

export default function IconButton(theme: { palette: { color: { active: any; }; }; }) {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: 'default' },
          style: {
            '&:hover': { background: theme.palette.color.active }
          }
        },
        {
          props: { color: 'inherit' },
          style: {
            '&:hover': { background: theme.palette.color.active }
          }
        }
      ],

      styleOverrides: {
        root: {}
      }
    }
  };
}
