import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    main: '#3C4882',
    secondary: '#E31F23',
  },
};

const styles = {
  global: {
    body: { wordBreak: 'keep-all', bg: 'brand.main', color: 'white' },
  },
};

const components = {
  Heading: {
    baseStyle: {
      color: 'yellow',
    },
  },
};

const theme = extendTheme({ config, colors, styles });

export default theme;
