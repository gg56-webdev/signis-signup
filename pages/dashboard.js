import { useEffect } from 'react';
import { useUserContext } from '../context/user';
import { useRouter } from 'next/router';
import { Box, Button, Spinner } from '@chakra-ui/react';

export default function Dashboard() {
  const { user, loading, logout } = useUserContext();
  const { push, locale } = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      push('/enter', '/enter', { locale });
    }
  }, [user, loading]);

  if (loading) return <Spinner />;
  return (
    <Box>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
