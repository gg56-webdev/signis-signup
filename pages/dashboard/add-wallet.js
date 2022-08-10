import {
  Box,
  Button,
  Flex,
  Container,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  OrderedList,
  ListItem,
  UnorderedList,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { getTranslation } from '../../utils/getTranslation';

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale, 'add-wallet');
  return { props: { text } };
}

export default function AddWallet({ text }) {
  const { form } = text;

  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { push, locale } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const [{ db, auth }, { updateDoc, doc }] = await Promise.all([
        import('../../lib/firebase'),
        import('firebase/firestore'),
      ]);
      await updateDoc(doc(db, 'users_signis', auth.currentUser.uid), {
        wallet_address: formData.get('wallet_address'),
      });

      const res = await fetch('/api/placeOrder', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          locale,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { orderNumber, error } = await res.json();

      redirect(orderNumber);
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      push('/enter', '/enter', { locale });
    }
  }, [user, push, locale]);

  if (!user) return null;
  return (
    <>
      <Head>
        <title>{text.title}</title>
      </Head>
      <Box
        as='form'
        maxW='container.sm'
        display='flex'
        flexDir='column'
        bg='white'
        color='initial'
        gap='4'
        my='10'
        borderRadius='md'
        shadow='md'
        mx='auto'
        py='4'
        px='6'
        onSubmit={handleSubmit}
      >
        <FormControl isRequired>
          <Flex alignItems='center'>
            <FormLabel htmlFor='wallet_address'>{form.wallet}</FormLabel>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  mb='2'
                  size='sm'
                  isRound
                  variant='ghost'
                  colorScheme='blue'
                  aria-label='Show information about adding crypto wallet'
                  icon={<QuestionIcon boxSize='4' />}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight='bold'>{form.wallet}</PopoverHeader>
                <PopoverBody fontSize='md' textAlign='left' bg='gray.50'>
                  <Text>{form.metamaskText}</Text>
                  <Link href='https://metamask.io/download/' isExternal color='blue' fontWeight='bold'>
                    {form.metamaskDownload}
                  </Link>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <Input
            id='wallet_address'
            name='wallet_address'
            type='text'
            placeholder='0x....'
            pattern='^0x\w{40}'
            maxLength='42'
          />
        </FormControl>
        <Box display='flex' gap='2'>
          <FormControl display='inline-flex' gap='2' w='auto'>
            <Checkbox isRequired size='lg' type='checkbox' name='agree_to_terms' id='agree_to_terms' />
            <FormLabel
              htmlFor='agree_to_terms'
              m='0'
              _after={{ content: "'*'", color: 'red.500', marginInlineStart: 1 }}
            >
              {form.agreeToTerms}
            </FormLabel>
          </FormControl>
        </Box>
        <Button type='submit' colorScheme='blue' bg='brand.main' isLoading={loading}>
          {form.next}
        </Button>
      </Box>
      <OrderedList maxW='container.sm' mx='auto' color='white' px='1'>
        {text.terms.map(([h, ul]) => (
          <ListItem key={h} mb='4'>
            {h}
            <UnorderedList listStyleType='none'>
              {ul.map((s, index) => (
                <ListItem key={`${h}-${index}`}>{s}</ListItem>
              ))}
            </UnorderedList>
          </ListItem>
        ))}
      </OrderedList>
    </>
  );
}

const PAYMENT_PAGE_URL = 'https://payment.fingerate.world/kspay_wh_order';

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

const redirect = (orderNumber) => {
  const url = `${PAYMENT_PAGE_URL}${isMobile() ? '_m' : ''}.php?orderNumber=${orderNumber}`;
  window.location.assign(url);
};
