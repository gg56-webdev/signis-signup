export const getTranslation = async (locale, path) => {
  switch (locale) {
    case 'en':
      return require(`../locales/${path}/en.json`);

    default:
      return require(`../locales/${path}/ko.json`);
  }
};
