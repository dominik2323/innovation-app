import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { togglePhoneMenu } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

import Img from './Img';
import NavbarBrand from './NavbarBrand';
import NavbarToggler from './NavbarToggler';
import NavbarControls from './NavbarControls';

import { DataContext } from '../helpers/dataContext';
import { appLangs } from '../helpers/consts';

const Navbar = () => {
  // const { components } = React.useContext(DataContext);
  const { showPhoneMenu, activeInnovationId, isUserLogged } = useSelector(
    state => state
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const controlsVariants = {
    show: { opacity: 1, display: `flex` },
    hide: { opacity: 0, transitionEnd: { display: `none` } },
  };

  const regex = (page = '', withQuery = false) =>
    new RegExp(
      `^\/(${Object.keys(appLangs).join('|')})\/?(${page})${
        withQuery ? `?(.*=.*)` : ``
      }`,
      'g'
    );

  const showControlsInPages = [
    {
      regex: regex('about'),
      showToggler: false,
      showControls: {
        share: false,
        download: false,
        contents: true,
        search: true,
      },
    },
    {
      regex: regex('innovation', true),
      showToggler: true,
      showControls: {
        share: true,
        download: true,
        contents: true,
        search: true,
      },
    },
    {
      regex: regex('innovation'),
      showToggler: false,
      showControls: {
        share: true,
        download: false,
        contents: true,
        search: true,
      },
    },
    {
      regex: regex(),
      showToggler: false,
      showControls: {
        share: false,
        download: false,
        contents: isUserLogged ? true : false,
        search: isUserLogged ? true : false,
      },
    },
  ];

  const { showControls, showToggler } = showControlsInPages.find(page => {
    return asPath.match(page.regex);
  });

  return (
    <nav className={`navbar`}>
      <NavbarBrand />
      <NavbarToggler
        controlsVariants={controlsVariants}
        showControls={showToggler}
      />
      <NavbarControls
        controlsVariants={controlsVariants}
        showControls={showControls}
      />
      {(isUserLogged || pathname !== '/') && (
        <motion.div
          initial={false}
          className={`navbar__burger`}
          onClick={() => dispatch(togglePhoneMenu(!showPhoneMenu))}
        >
          <Img className={``} src={`/static/icons/burger.svg`} />
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
