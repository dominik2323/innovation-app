import React from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { DataContext } from '../helpers/dataContext';
import { appLangs } from '../helpers/consts';
import absoluteUrl from '../helpers/absoluteUrl';

import Img from './Img';

const NavbarControlsDownload = () => {
  const { components } = React.useContext(DataContext);
  const router = useRouter();
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { lang } = router.query;
  const baseUrl = absoluteUrl(null, 'localhost:3000');
  const apiUrl =
    process.env.NODE_ENV === `production`
      ? `${baseUrl}/api/pdf?uid=${activeInnovationId}&lang=${appLangs[lang]}`
      : `http://localhost:9999/api/pdf?uid=${activeInnovationId}&lang=${appLangs[lang]}`;
  return (
    <a className={`navbar__controls__item`} href={apiUrl}>
      <Img src={`/static/icons/download.svg`} />
      <span className={`navbar__controls__item__label`}>
        {components.navbar_download_label}
      </span>
    </a>
  );
};

export default NavbarControlsDownload;
