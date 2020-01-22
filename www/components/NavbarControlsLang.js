import React from 'react';
import Router from 'next/router';

const langs = [
  { id: 'cs', name: 'CZ' },
  { id: 'de', name: 'DE' },
  { id: 'en', name: 'EN' },
];
const activeLang = 'cs';

const NavbarControlsLang = () => {
  const [showDropdown, toggleDropdown] = React.useState(false);
  const inactiveLangs = langs.filter(lang => lang.id !== activeLang);
  return (
    <div className={`navbar-controls__item navbar-lang`}>
      <div
        className={`navbar-lang__active-lang
        ${showDropdown ? `active` : ``}`}
        onClick={() => toggleDropdown(prevState => !prevState)}
      >
        {langs.find(x => x.id === activeLang).name}
      </div>
      {showDropdown && (
        <div className={`navbar-lang__dropdown`}>
          {inactiveLangs.map(({ id, name }) => (
            <div
              key={id}
              className={`navbar-lang__dropdown__item`}
              onClick={() => Router.push(`/${id}`)}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarControlsLang;
