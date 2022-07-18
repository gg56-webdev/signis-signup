import { Container, Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

export default function Description({ text }) {
  return (
    <Box as='section'>
      <Container maxW='container.md' py='20' textAlign='center'>
        <Box
          mb='10'
          px={{ base: 4, md: 10 }}
          py='5'
          borderWidth='2px'
          borderColor='blue.500'
          borderRadius='lg'
          bgGradient='linear(to-r, whiteAlpha.200, transparent)'
        >
          <Text>{text.card1.p}</Text>
        </Box>
        <Box
          px={{ base: 4, md: 10 }}
          py='5'
          borderWidth='2px'
          borderColor='blue.500'
          borderRadius='lg'
          bgGradient='linear(to-r, whiteAlpha.200, transparent)'
        >
          <Heading as='h3' mb='4'>
            {text.card2.h3}
          </Heading>
          <UnorderedList listStylePosition='inside' m='0' listStyleType={`'- '`}>
            {text.card2.ul.map((li) => (
              <ListItem key={li}>{li}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Container>
    </Box>
  );
}
