import { Box, Container, Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import swcLogo from '../../public/swc-logo.png';
import LanguageSelect from './LanguageSelect';

export default function Header() {
  return (
    <Box
      as='header'
      bgGradient='linear(to-r, whiteAlpha.200, whiteAlpha.400, whiteAlpha.200)'
      bg='white'
      color='initial'
      shadow='lg'
    >
      <Container display='flex' justifyContent='space-between' alignItems='center' maxW='container.lg' p='2'>
        <LinkBox
          pos='relative'
          flexBasis='150px'
          h='55px'
          sx={{ '&:is(:hover, :focus-within)': { outline: '2px solid blue', outlineOffset: '2px' } }}
          borderRadius='md'
        >
          <LinkOverlay isExternal href='http://swc2022.net/'>
            <Image src={swcLogo} alt='SWC2022 Logo' layout='fill' objectFit='contain' placeholder='blur' />
          </LinkOverlay>
        </LinkBox>
        <LanguageSelect />
      </Container>
    </Box>
  );
}
