import React from 'react';
import Router, { useRouter } from 'next/router';

import { appLangs } from '../helpers/consts';

const langNames = {
  cs: 'CZ',
  en: 'EN',
  de: 'DE',
};

const NavbarControlsLang = () => {
  const [showDropdown, toggleDropdown] = React.useState(false);
  const langKeys = Object.keys(appLangs);
  const router = useRouter();
  const inactiveLangs = langKeys.filter((lang) => lang !== router.query.lang);

  return (
    <div className={`navbar-controls__item navbar-lang`}>
      <div
        className={`navbar-lang__active-lang
        ${showDropdown && window.innerWidth > 900 ? `active` : ``}`}
        onClick={() => toggleDropdown((prevState) => !prevState)}
      >
        {langNames[langKeys.find((lang) => lang === router.query.lang)]}
      </div>
      {(showDropdown || window.innerWidth <= 900) && (
        <div className={`navbar-lang__dropdown`}>
          {inactiveLangs.map((lang) => (
            <div
              key={lang}
              className={`navbar-lang__dropdown__item`}
              onClick={() =>
                // TODO: there is a problem, when user tries to change the language and has token in query
                // after that the query is erased. You cannot change it in here, because that would break changing languaages
                // innovations detail, beacuse of different UID
                // I suggest to change the UID resolving logic
                Router.push(
                  router.asPath.split('?')[0].replace(/(cs|en|de)/, lang)
                )
              }
            >
              {langNames[lang]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarControlsLang;
