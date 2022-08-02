import { Box, Button } from '@chakra-ui/react';
import { useAuthContext } from '../../../context/auth';
export default function Auth({ text }) {
  const { user, logout } = useAuthContext();
  return (
    <Box
      borderRadius='lg'
      shadow='md'
      textAlign='center'
      p='4'
      border='2px'
      borderColor='brand.main'
      maxW='container.sm'
      mx='auto'
      mb='20'
    >
      <Box color='brand.main' fontSize='xl' fontWeight='bold' mb='2'>
        {user.email}
      </Box>
      <Button variant='ghost' colorScheme='blue' onClick={logout}>
        {text.logout}
      </Button>
    </Box>
  );
}
