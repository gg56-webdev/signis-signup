import { ChakraProvider } from '@chakra-ui/react';
import UserContextProvide from '../context/user';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvide>
        <Component {...pageProps} />
      </UserContextProvide>
    </ChakraProvider>
  );
}

export default MyApp;
