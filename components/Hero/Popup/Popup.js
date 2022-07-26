import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Button,
  Link,
} from '@chakra-ui/react';
import rosary from '../../../public/rosary.jpg';
import Image from 'next/future/image';

export default function Popup({ text }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Text _before={{ content: `"* "` }} mt='5' fontSize='sm'>
        {text[1]}
        <Button onClick={onOpen} variant='link' fontSize='sm' color='blue.300' fontWeight='700'>
          {text.link}
        </Button>
        {text[2]}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='3xl'>
        <ModalOverlay bg='blackAlpha.400' />
        <ModalContent mx='2' color='initial' overflow='hidden'>
          <ModalCloseButton />

          <ModalBody py='6' sx={{ '& img': { borderRadius: 'md', shadow: 'md' } }}>
            <Link
              fontSize='lg'
              color='blue'
              display='block'
              mb='2'
              textAlign='center'
              isExternal
              href='https://youtu.be/UaoIgIgc9Bo'
            >
              {text.youtube}
            </Link>
            <Image src={rosary} alt='Photo of rosary blessed by Pope Francis' placeholder='blur' />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
