import { useEffect } from 'react';
import { useAuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { Spinner, Container } from '@chakra-ui/react';
import { Auth } from '../../components/dashboard';
import { getTranslation } from '../../utils/getTranslation';
import NftCard from '../../components/NftCard/';
import Head from 'next/head';

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale, 'dashboard');
  return { props: { text } };
}

export default function Dashboard({ text }) {
  const { user, userData, loading } = useAuthContext();
  const { push, locale } = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      push('/enter', '/enter', { locale });
    }
  }, [user, loading, push, locale]);

  if (loading) return <Spinner mx='auto' color='white' />;
  if (!user) return null;
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container maxW='container.lg' bg='white' shadow='md' p='4' minH='100vh'>
        <Auth text={text.auth} />
        <NftCard
          text={text.nftCard}
          isPurchasable
          size={250}
          userWallet={userData?.wallet_address}
          isPaid={userData?.purchased}
        />
      </Container>
    </>
  );
}
