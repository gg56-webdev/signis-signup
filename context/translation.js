import { useContext, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import ko from '../locales/ko.json';

const TranslationContext = createContext();

export const useTranslationContext = () => useContext(TranslationContext);

export default function TranslationContextProvider({ children }) {
  const [t, setT] = useState(ko);
  const { locale } = useRouter();
  useEffect(() => {
    const getTranslation = async () => {
      switch (locale) {
        case 'en':
          const en = await import('../locales/en.json');
          setT(en);
          break;

        default:
          setT(ko);
          break;
      }
    };

    getTranslation();
  }, [locale]);

  return <TranslationContext.Provider value={t}>{children}</TranslationContext.Provider>;
}
