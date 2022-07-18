import { ChakraProvider } from '@chakra-ui/react';
import TranslationContextProvider from '../context/translation';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <TranslationContextProvider>
        <Component {...pageProps} />
      </TranslationContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
