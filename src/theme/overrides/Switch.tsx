// ----------------------------------------------------------------------

export default function Switch(theme: {
  palette: {
    color: any;
    text: { disabled: any };
    grey: any[];
    action: { focus: any; disabledBackground: any };
  };
}) {
  return {
    MuiSwitch: {
        width:100,
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: '#ccc',
      },
      colorSecondary: {
        '&$checked': {
          // Controls checked color for the thumb
          color: '#f2ff00',
        },
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: '#fff',
        '$checked$checked + &': {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: '#fff',
        },
      },
    },
  };
}
