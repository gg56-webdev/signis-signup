import { Button, Container, FormControl, FormLabel, Input, Box, Heading, Text } from '@chakra-ui/react';
import Confetti from 'react-dom-confetti';

import { useState } from 'react';
import Head from 'next/head';
import { getTranslation } from '../utils/getTranslation';

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale, 'check-rewards');
  return { props: { text } };
}

export default function CheckRewards({ text }) {
  const [email, setEmail] = useState('');
  const [output, setOutput] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    setDisabled(false);
    setEmail(e.target.value);
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    setOutput();
    setError();
    try {
      const res = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const { Ammount, msg } = await res.json();

      if (msg) {
        setError(msg);
      }
      setOutput(Ammount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box overflow='hidden'>
      <Head>
        <title>{text.check}</title>
      </Head>
      <Container maxW='container.lg' bg='white' shadow='md' p='4' minH='100vh'>
        <Heading as='h1' textAlign='center' fontWeight='normal'>
          {text.check}
        </Heading>
        <Box as='form' onSubmit={checkEmail} maxW='container.sm' mx='auto' display='grid' gap='4' mt='10'>
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input type='email' onChange={handleChange} />
          </FormControl>
          <Button colorScheme='blue' type='submit' isLoading={loading} isDisabled={disabled}>
            {text.btn}
          </Button>
        </Box>
        <Box pos='relative' textAlign='center' justifySelf='center' mt='10'>
          <Box pos='absolute' left='50%'>
            <Confetti active={Boolean(output)} config={config} />
          </Box>
          {output && (
            <>
              <Heading color='brand.main'>{text.congratz}</Heading>
              <Text mt='4' fontSize='xl' _before={{ content: '"⭐ "' }} _after={{ content: '" ⭐"' }}>
                {text[output === 3000 ? 'won1(3K)' : 'won1(10K)']}
                <Box as='span' fontWeight='bold' color='brand.main'>
                  {output.toLocaleString('ko')} ₩
                </Box>
                {text[output === 3000 ? 'won2(3K)' : 'won2(10K)']}
              </Text>
              <Text mt='4' _before={{ content: '"* "' }} color='gray.600'>
                {text.disclaimer}
              </Text>
            </>
          )}
          {error && <Box color='red.500'>{text.notFound}</Box>}
        </Box>
      </Container>
    </Box>
  );
}

const config = {
  left: '50%',
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 10000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};
