import { Box, Button, Spinner } from '@chakra-ui/react';
import { useUser } from '../../hooks/useUser';
import NLink from 'next/link';

export default function Auth({ text }) {
  const { user, loading } = useUser();
  if (loading) return <Spinner color='blue' />;
  if (!user)
    return (
      <NLink href='/enter' passHref>
        <Button as='a' variant='link' color='blue'>
          {`${text.login} / ${text.signup}`}
        </Button>
      </NLink>
    );
  return (
    <NLink href='/dashboard' passHref>
      <Button as='a' variant='link' color='blue'>
        {user.email.split('@')[0]}
      </Button>
    </NLink>
  );
}
