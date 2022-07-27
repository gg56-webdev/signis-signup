import { useEffect } from 'react';
import { useUserContext } from '../context/user';
import { useRouter } from 'next/router';
import { Spinner, Container } from '@chakra-ui/react';
import Auth from '../components/dashboard/Auth';
import Head from 'next/head';

export default function Dashboard() {
  const { user, loading } = useUserContext();
  const { push, locale } = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      push('/enter', '/enter', { locale });
    }
  }, [user, loading, push, locale]);

  if (loading) return <Spinner mx='auto' />;
  if (!user) return null;
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container maxW='container.lg' bg='white' shadow='md' p='4' minH='100vh'>
        <Auth />
      </Container>
    </>
  );
}
