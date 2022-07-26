import { Button, Container, Grid, Heading, Link, Text } from '@chakra-ui/react';
import Popup from './Popup/Popup';
import Signup from './Signup';

export default function Hero({ text }) {
  const { hero } = text;
  return (
    <Grid
      placeItems='center'
      as='section'
      h='clamp(500px, 100vh - 45px, 1080px)'
      backgroundImage='linear-gradient(hsl(230 37% 37% / 0.75),hsl(230 37% 37% / 0.75)), url(main-bg.webp)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Container maxW='container.md' display='grid' textAlign='center' py='10'>
        <Heading as='h1' fontSize={{ base: '4xl', md: '6xl' }}>
          {hero.h1}
        </Heading>
        <Text
          fontSize={{ base: 'xl' }}
          p='4'
          border='2px solid'
          borderRadius='lg'
          w='fit-content'
          justifySelf='center'
          mt='10'
        >
          {hero.date}
        </Text>
        <Signup text={text} />
        <Popup text={hero.disclaimer} />
      </Container>
    </Grid>
  );
}
