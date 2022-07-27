import { Box, Button } from '@chakra-ui/react';
import { useUserContext } from '../../../context/user';
export default function Auth() {
  const { user, logout } = useUserContext();
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
    >
      <Box color='brand.main' fontSize='xl' fontWeight='bold' mb='2'>
        {user.email}
      </Box>
      <Button variant='ghost' colorScheme='blue' onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
