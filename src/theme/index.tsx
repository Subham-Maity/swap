import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider, Breakpoints } from '@mui/material/styles';
//
import shape, { ThemeShapeProps } from './shape';
import palette, { ThemePaletteProps } from './palette';
import typography, { ThemeTypographyProps } from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows, ThemeCustomShadowsProps } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};
export interface ThemeProps {
  palette: ThemePaletteProps;
  shape: ThemeShapeProps;
  typography: ThemeTypographyProps;
  shadows: string[];
  customShadows: ThemeCustomShadowsProps;
  breakpoints: Breakpoints;
}
export default function ThemeConfig({ children }: any) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
      breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      },
    }),
    [],
  );

  const theme = createTheme(themeOptions, []);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
