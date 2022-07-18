import Head from 'next/head';
import { Description, Footer, Header, Hero, Partners } from '../components';

const getTranslation = async (locale) => {
  switch (locale) {
    case 'en':
      return require('../locales/en.json');

    default:
      return require('../locales/ko.json');
  }
};

export async function getStaticProps({ locale }) {
  const text = await getTranslation(locale);
  return { props: { text } };
}

export default function Home({ text }) {
  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name='description' content={text.head.description} />
      </Head>
      <Header text={text.header} />
      <Hero text={text} />
      <Description text={text.description} />
      <Partners text={text.partners} />
      <Footer />
    </>
  );
}
