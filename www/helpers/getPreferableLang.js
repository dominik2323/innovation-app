import { APP_LANGS, DEFAULT_APP_LANG } from '../../globals/appLangs';

export function getPreferableLang(req) {
  const browserLanguages = req.headers['accept-language'].match(/[a-z]{2}/g);

  const bestLang =
    Object.keys(APP_LANGS).find((lang) => browserLanguages.includes(lang)) ||
    DEFAULT_APP_LANG;

  return bestLang;
}
