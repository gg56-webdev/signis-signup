import Head from 'next/head';
import { Description, Footer, Header, Hero, Partners, Promo } from '../components';
import { getTranslation } from '../utils/getTranslation';

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale, 'index');
  return { props: { text } };
}

export default function Home({ text }) {
  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name='description' content={text.head.description} />
        <link rel='icon' href='/favicon.jpg' />
      </Head>
      <Header text={text.header} />
      <Hero text={text} />
      <Promo text={text.promo} />
      <Description text={text.description} />
      <Partners text={text.partners} />
      <Footer />
    </>
  );
}
