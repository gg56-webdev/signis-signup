import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Radio,
  RadioGroup,
  OrderedList,
  ListItem,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AuthModal({ text }) {
  const { hero, modal } = text;
  const { locale } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenTerms, onToggle } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const formObj = {};
    for (const [k, v] of formData) {
      if (k === 'last_name' && v !== '') {
        setLoading(true);
        return;
      }
      formObj[k] = v.toString();
    }
    console.log(formObj);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formObj, locale }),
      });
      const data = await res.json();
      console.log(data);
      setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme='red' bg='brand.secondary' fontSize='2xl' p='8' shadow='md' mt='10'>
        {hero.btn}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='xl'>
        <ModalOverlay bg='blackAlpha.400' />
        <ModalContent mx='2' color='initial' overflow='hidden'>
          <ModalCloseButton />
          <ModalHeader>{modal.title}</ModalHeader>

          {done ? (
            <Alert
              status='success'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                {modal.submitSuccess.title}
              </AlertTitle>
              <AlertDescription maxWidth='sm'>{modal.submitSuccess.text}</AlertDescription>
            </Alert>
          ) : (
            <>
              <ModalBody pb='6'>
                <Flex as='form' gap='6' flexDir='column' onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='device_type'>{modal.form.device_type.label}</FormLabel>
                    <RadioGroup display='flex' gap='10' name='device_type'>
                      <Radio value='iOS' isRequired>
                        {modal.form.device_type.radios.ios}
                      </Radio>
                      <Radio value='Android' isRequired>
                        {modal.form.device_type.radios.android}
                      </Radio>
                    </RadioGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor='name'>{modal.form.name}</FormLabel>
                    <Input id='name' name='name' type='text' />
                  </FormControl>
                  {locale === 'ko' && (
                    <FormControl isRequired>
                      <FormLabel htmlFor='phone_number'>{modal.form.phone_number}</FormLabel>
                      <Input
                        id='phone_number'
                        name='phone_number'
                        type='tel'
                        placeholder='+82-10-XXXX-XXXX'
                        pattern='\+82[- ]?10[- ]?[0-9]{4}[- ]?[0-9]{4}'
                      />
                    </FormControl>
                  )}

                  <FormControl isRequired>
                    <FormLabel htmlFor='email'>{modal.form.email}</FormLabel>
                    <Input id='email' name='email' type='email' />
                  </FormControl>

                  <Flex gap='2'>
                    <FormControl display='inline-flex' gap='2' w='auto'>
                      <Checkbox isRequired size='lg' type='checkbox' name='agree_to_terms' id='agree_to_terms' />
                      <FormLabel
                        htmlFor='agree_to_terms'
                        m='0'
                        _after={{ content: "'*'", color: 'red.500', marginInlineStart: 1 }}
                      >
                        {modal.form.terms.label}
                      </FormLabel>
                    </FormControl>
                    <Button
                      color='blue.300'
                      variant='link'
                      onClick={onToggle}
                      _before={{ content: `'['` }}
                      _after={{ content: `']'` }}
                    >
                      {modal.form.terms.link}
                    </Button>
                  </Flex>
                  <Collapse in={isOpenTerms} animateOpacity>
                    <OrderedList p='2' bg='blue.50' rounded='md' m='0' listStylePos='inside' fontSize='sm'>
                      {modal.form.terms.ul.map((li, i) => (
                        <ListItem key={i} whiteSpace='pre-wrap' sx={{ '& + li': { mt: '4' } }}>
                          {li}
                        </ListItem>
                      ))}
                    </OrderedList>
                  </Collapse>
                  <FormControl display='inline-flex' gap='2' w='auto'>
                    <Checkbox
                      isRequired
                      size='lg'
                      type='checkbox'
                      value='yes'
                      name='agree_to_reservation'
                      id='agree_to_reservation'
                    />
                    <FormLabel
                      htmlFor='agree_to_reservation'
                      m='0'
                      _after={{ content: "'*'", color: 'red.500', marginInlineStart: 1 }}
                    >
                      {modal.form.reservation}
                    </FormLabel>
                  </FormControl>

                  <Button colorScheme='blue' bg='brand.main' type='submit' isLoading={loading}>
                    {modal.form.submit}
                  </Button>
                  <input style={{ display: 'none' }} type='text' name='last_name' />
                </Flex>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
