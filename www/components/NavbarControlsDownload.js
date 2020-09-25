import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import { useSelector } from 'react-redux';
import absoluteUrl from '../helpers/absoluteUrl';
import { DataContext } from '../helpers/dataContext';
import Img from './Img';

const NavbarControlsDownload = () => {
  const { components } = React.useContext(DataContext);
  const router = useRouter();
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { lang } = router.query;
  const token = parseCookies().userData || ``;

  const baseUrl = absoluteUrl(null, 'localhost:9999');
  const apiUrl = `${baseUrl}api/pdf?uid=${activeInnovationId}&lang=${lang}&token=${token}`;
  return (
    <a className={`navbar__controls__item`} href={apiUrl} target='_blank'>
      <Img src={`/static/icons/download.svg`} />
      <span className={`navbar__controls__item__label`}>
        {components.navbar_download_label}
      </span>
    </a>
  );
};

export default NavbarControlsDownload;
