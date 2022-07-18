import Head from 'next/head';
import { Description, Footer, Header, Hero, Partners } from '../components';
import { useTranslationContext } from '../context/translation';

export default function Home() {
  const { head } = useTranslationContext();
  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name='description' content={head.description} />
      </Head>
      <Header />
      <Hero />
      <Description />
      <Partners />
      <Footer />
    </>
  );
}
