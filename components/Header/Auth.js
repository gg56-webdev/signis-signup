import { Box, Spinner } from '@chakra-ui/react';
import { useUser } from '../../hooks/useUser';

export default function Auth() {
  const { user, loading } = useUser();
  if (loading) return <Spinner />;
  if (!user) return <Box>Login</Box>;
  return <Box>{user.email}</Box>;
}
