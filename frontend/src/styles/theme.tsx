import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const colorsConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config: colorsConfig,
  fonts: {
    body: `Inter, -apple-system,BlinkMacSystemFont,"Segoe UI", Helvetica, Arial, sans-serif,"Apple Color Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});
