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

const Navbar = () => {
  const { components } = React.useContext(DataContext);
  const { showPhoneMenu, activeInnovationId, isUserLogged } = useSelector(
    state => state
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const { logo } = components.navbar;
  // const showControls = activeInnovationId.length !== 0;

  const controlsVariants = {
    show: { opacity: 1, display: `flex` },
    hide: { opacity: 0, transitionEnd: { display: `none` } },
  };

  const showControlsInPages = [
    {
      url: id => '/about',
      showToggler: false,
      showControls: {
        share: false,
        download: false,
        contents: true,
        search: true,
      },
    },
    {
      url: id => '/innovations',
      showToggler: false,
      showControls: {
        share: true,
        download: false,
        contents: true,
        search: true,
      },
    },
    {
      url: id => `/innovations?id=${id}`,
      showToggler: true,
      showControls: {
        share: true,
        download: true,
        contents: true,
        search: true,
      },
    },
    {
      url: id => '/',
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
    return page.url(query.id) === asPath;
  });

  return (
    <nav className={`navbar`}>
      <NavbarBrand logo={logo} />
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
          onClick={() => dispatch(togglePhoneMenu(!showPhoneMenu))}>
          <Img className={``} src={`/static/icons/burger.svg`} />
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
