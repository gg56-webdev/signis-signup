import { Flex, Link } from '@chakra-ui/react';
import NLink from 'next/link';

export default function Auth() {
  const { user, loading, error } = useUserContext();
  if (error)
    return (
      <Flex align='center' p='1' color='red' gap='1'>
        Auth error
      </Flex>
    );
  if (loading) return <Spinner />;
  if (user !== null)
    return (
      <Flex align='center' maxW='15ch' gap='1'>
        <NLink href='/dashboard' passHref>
          <Link isTruncated>{user.email.split('@')[0]}</Link>
        </NLink>
      </Flex>
    );
  return (
    <NLink href='/enter' passHref>
      <Link>login / signup</Link>
    </NLink>
  );
}
