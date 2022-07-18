import { Box, Container, Flex, Heading, Stack, Divider, Grid } from '@chakra-ui/react';
import Image from 'next/future/image';
import partnersLogos from '../../public/partners';
import hostsLogos from '../../public/hosts';
import supportLogos from '../../public/support';

export default function Partners({ text }) {
  return (
    <Box as='section' bg='white'>
      <Container py='20' maxW='container.xl'>
        <Heading color='brand.main' textAlign='center' mb='10'>
          {text.h2}
        </Heading>
        <Stack spacing='16'>
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
            <Grid placeItems='center' p='2' fontWeight='bold' color='black'>
              한국가톨릭커뮤니케이션협회
            </Grid>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
