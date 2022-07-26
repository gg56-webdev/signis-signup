import { Box, Container, Flex, Heading, Stack, Divider, Grid, Link } from '@chakra-ui/react';
import Image from 'next/future/image';
import partnersLogos from '../../public/partners';
import hostsLogos from '../../public/hosts';
import supportLogos from '../../public/support';
import sponsorsLogos from '../../public/sponsors';

export default function Partners({ text }) {
  return (
    <Box as='section' bg='white'>
      <Container py='20' maxW='container.xl'>
        <Heading color='brand.main' textAlign='center' mb='10'>
          {text.partners}
        </Heading>
        <Stack spacing='16' mb='20'>
          <Flex
            as='ul'
            listStyleType='none'
            alignItems='center'
            justify='center'
            columnGap='10'
            rowGap='5'
            flexWrap='wrap'
          >
            {Object.entries(hostsLogos).map(([key, val]) => (
              <Box as='li' key={key} maxW='175px'>
                <Image src={val} alt={`${key} logo`} placeholder='blur' />
              </Box>
            ))}
          </Flex>
          <Flex
            as='ul'
            listStyleType='none'
            alignItems='center'
            justify='center'
            columnGap='10'
            rowGap='5'
            flexWrap='wrap'
          >
            {Object.entries(partnersLogos).map(([key, val]) => (
              <Box as='li' key={key} maxW='150px'>
                <Image src={val} alt={`${key} logo`} placeholder='blur' />
              </Box>
            ))}
          </Flex>
          <Flex
            as='ul'
            listStyleType='none'
            alignItems='center'
            justify='center'
            columnGap='10'
            rowGap='5'
            flexWrap='wrap'
          >
            {Object.entries(supportLogos).map(([key, val]) => (
              <Box as='li' key={key}>
                <Image src={val} alt={`${key} logo`} placeholder='blur' />
              </Box>
            ))}
            <Grid as='li' placeItems='center' p='2' fontWeight='bold' color='black'>
              한국가톨릭커뮤니케이션협회
            </Grid>
          </Flex>
        </Stack>
        <Heading color='brand.main' textAlign='center' mb='10'>
          {text.sponsors}
        </Heading>
        <Flex
          as='ul'
          listStyleType='none'
          alignItems='center'
          justify='center'
          columnGap='20'
          rowGap='5'
          flexWrap='wrap'
        >
          {Object.entries(sponsorsLogos).map(([key, [src, link]]) => (
            <Box
              as='li'
              key={key}
              maxW='175px'
              sx={{ '&:is(:hover, :focus-within)': { outline: '2px solid blue', outlineOffset: '2px' } }}
              borderRadius='md'
            >
              <Link isExternal href={link}>
                <Image src={src} alt={`${key} logo`} placeholder='blur' />
              </Link>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
