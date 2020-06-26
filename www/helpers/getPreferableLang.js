import { appLangs } from './consts';

export function getPreferableLang(ctx) {
  const browserLanguages = ctx.req.headers['accept-language'].match(
    /[a-z]{2}/g
  );
  const bestLang = Object.keys(appLangs).find((lang) =>
    browserLanguages.includes(lang)
  );
  return bestLang;
}
