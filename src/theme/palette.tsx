import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}
interface PaletteColorProps {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}
interface PaletteGreyColorProps {
  0: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  500_8: string;
  500_12: string;
  500_16: string;
  500_24: string;
  500_32: string;
  500_48: string;
  500_56: string;
  500_80: string;
}
interface PaletteGradientsProps {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  active: string;
}
interface PaletteChartProps {
  violet: string[];
  blue: string[];
  green: string[];
  yellow: string[];
  red: string[];
}
interface PaletteColorsProps {
  white: string;
  dark: string;
  active: string;
  subTitle: string;
  title: string;
  lightText: string;
  text: string;
  border: string;
  hover: string;
  buttonBackground: string;
}
export interface ThemePaletteProps {
  common: { black: string; white: string };
  color: PaletteColorsProps;
  primary: PaletteColorProps;
  secondary: PaletteColorProps;
  info: PaletteColorProps;
  success: PaletteColorProps;
  warning: PaletteColorProps;
  error: PaletteColorProps;
  grey: PaletteGreyColorProps;
  gradients: PaletteGradientsProps;
  chart: PaletteChartProps;
  divider: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
    hoverOpacity: number;
    disabledOpacity: number;
  };
}
// SETUP COLORS
const GREY: PaletteGreyColorProps = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#000',
  900: '#161C24',
  500_8: '#F2F2F2',
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY: PaletteColorProps = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#b950ee',
  dark: '#FAD759',
  darker: '#eda900',
  contrastText: '#fff',
};
const SECONDARY: PaletteColorProps = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};
const INFO: PaletteColorProps = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};
const SUCCESS: PaletteColorProps = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};
const WARNING: PaletteColorProps = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};
const ERROR: PaletteColorProps = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const GRADIENTS: PaletteGradientsProps = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  active: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%);',
};

const CHART_COLORS: PaletteChartProps = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COLOR: PaletteColorsProps = {
  white: '#FFFFFF',
  dark: '#000000',
  active: GRADIENTS.active,
  subTitle: '#999999',
  title: '#565656',
  lightText: 'rgb(0 0 0 / 3%)',
  text: '#00000099',
  border: 'rgba(0, 0, 0, 0.1)',
  hover: '#F2F2F2',
  buttonBackground: '#f7f7f7',
};

const palette: ThemePaletteProps = {
  common: { black: '#000', white: '#fff' },
  color: { ...COLOR },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: COLOR.hover,
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
