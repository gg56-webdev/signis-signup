import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Text,
  Grid,
  Stack,
  Divider,
  Box,
  ButtonGroup,
  keyframes,
  Tag,
  Heading,
  UnorderedList,
} from '@chakra-ui/react';
import NLink from 'next/link';
import { Fragment } from 'react';
import NftCard from '../../NftCard';

const glow = keyframes`
from {
  box-shadow: 0 0 8px hsl(230 50% 100% / 100%); 
  transform: scale(1) translate(-50%, 50%);
}
to {
  box-shadow: 0 0 24px hsl(230 50% 100% / 100%);
  transform: scale(1.0225) translate(-50%, 50%);
}`;

export default function EventPopup({ text, eventSignupOnOpen, btnText }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        animation={`${glow} 1s ease-in-out infinite alternate`}
        onClick={onOpen}
        fontSize='2xl'
        p='8'
        shadow='md'
        border='4px'
        bg='transparent'
        w='45%'
        pos='absolute'
        bottom='1'
        left='50%'
        boxShadow='0 0 17px #fff, inset 0 0 17px #fff'
        transformOrigin='0 100%'
        sx={{ '&:is(:hover, :active)': { color: 'brand.main', borderColor: 'white', bg: 'white' } }}
      >
        {btnText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='4xl'>
        <ModalOverlay bg='blackAlpha.400' />
        <ModalContent mx='2' color='initial' overflow='hidden'>
          <ModalCloseButton />
          <ModalHeader textAlign='center' color='brand.main' fontSize='2xl'>
            {text.heading}
          </ModalHeader>

          <ModalBody display='flex' flexDir='column' p='0'>
            <Text textAlign='center' color='brand.main' fontSize='lg' p='4' maxW='container.sm' mx='auto'>
              {text.description}
            </Text>
            <Grid gridTemplateColumns={{ base: '1fr', md: '1.75fr auto 1fr' }} gap='2' p='4'>
              <Stack bg='cyan.50' borderRadius='xl' shadow='lg' border='1px' borderColor='blue.100' p='4'>
                <Box as='dl' display='grid' gridTemplateColumns='auto 1fr' columnGap='2' rowGap='4' h='full'>
                  {text.col1.map(([key, val]) => (
                    <Fragment key={key}>
                      <Box
                        border='2px'
                        borderColor='brand.main'
                        borderRadius='md'
                        as='dt'
                        alignSelf='start'
                        textAlign='center'
                        p='0.5'
                        px='1'
                        fontWeight='bold'
                      >
                        {key}
                      </Box>
                      <Box as='dd'>
                        <Box as='ul' listStyleType='none'>
                          {val.map((string) => (
                            <Box as='li' key={string}>
                              {string}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Fragment>
                  ))}
                </Box>
              </Stack>
              <Divider orientation='vertical' border='2px' borderColor='blue.500' />
              <Stack>
                <NftCard text={text.col2.nftCard} direction='column' />
              </Stack>
            </Grid>
            <ButtonGroup alignSelf='center' justifyContent='center' size='lg' gap='4' flexWrap='wrap' p='4'>
              <Button colorScheme='linkedin' onClick={eventSignupOnOpen}>
                {text.btn1}
              </Button>
              <Button bg='brand.main' colorScheme='blue'>
                {text.btn2}
              </Button>
              <NLink href='/dashboard' passHref>
                <Button bg='brand.secondary' colorScheme='red' as='a'>
                  {text.btn3}
                </Button>
              </NLink>
            </ButtonGroup>
            <Box bg='yellow.50' p='4' shadow='inner'>
              <Box fontWeight='bold' mb='2'>
                {text.note.heading}
              </Box>
              <UnorderedList listStyleType='"- "' fontSize='sm'>
                {text.note.ul.map((string) => (
                  <li key={string}>{string}</li>
                ))}
              </UnorderedList>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
