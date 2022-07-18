import { Box, Button, Container, Grid, Heading, Text } from '@chakra-ui/react';
import { useTranslationContext } from '../../context/translation';
import Signup from './Signup';

export default function Hero() {
  const { hero } = useTranslationContext();
  return (
    <Grid
      placeItems='center'
      as='section'
      h='min(100vh - 45px, 1080px)'
      backgroundImage='linear-gradient(hsl(230 37% 37% / 0.65),hsl(230 37% 37% / 0.65)), url(main-bg.webp)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Container maxW='container.md' display='grid' gap='10' textAlign='center' py='10'>
        <Heading as='h1' fontSize={{ base: '4xl', md: '6xl' }}>
          {hero.h1}
        </Heading>
        <Text fontSize={{ base: 'xl' }} p='4' border='2px solid' borderRadius='lg' w='fit-content' justifySelf='center'>
          {hero.date}
        </Text>
        <Signup />
      </Container>
    </Grid>
  );
}
