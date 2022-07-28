import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

export default function EventPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
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
        transform='translate(-50%, 50%)'
        boxShadow='0 0 17px #fff, inset 0 0 17px #fff'
        sx={{ '&:is(:hover, :active)': { color: 'brand.main', borderColor: 'white', bg: 'white' } }}
      >
        참여하기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='xl'>
        <ModalOverlay bg='blackAlpha.400' />
        <ModalContent mx='2' color='initial' overflow='hidden'>
          <ModalCloseButton />
          <ModalHeader>Event</ModalHeader>

          <ModalBody pb='6'></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
