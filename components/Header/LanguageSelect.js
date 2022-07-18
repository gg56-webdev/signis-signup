import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LOCALES = Object.freeze({
  ko: '한국어',
  en: 'English',
  es: 'Español',
  fr: 'Français',
});

export default function LanguageSelect() {
  const { pathname, query, asPath, locales, locale, push } = useRouter();

  const changeLanguage = (e) => {
    const locale = e.target.value;
    push({ pathname, query }, asPath, { locale });
  };

  return (
    <Select w='auto' value={locale} onChange={changeLanguage} size='sm'>
      {locales.map((l) => (
        <option key={l} value={l}>
          {LOCALES[l]}
        </option>
      ))}
    </Select>
  );
}
