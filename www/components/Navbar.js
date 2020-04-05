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

const controlsVariants = {
  show: { opacity: 1, display: `flex` },
  hide: { opacity: 0, transitionEnd: { display: `none` } },
};

const regex = (page = '') => {
  return new RegExp(`^\/(${Object.keys(appLangs).join('|')})\/?(${page})`);
};

const showControlsInPages = [
  {
    regex: regex('about/?$'),
    showToggler: false,
    showControls: {
      share: false,
      download: false,
      contents: true,
      search: true,
    },
  },
  {
    regex: regex('innovations\\?id=.*'),
    showToggler: true,
    showControls: {
      share: true,
      download: true,
      contents: true,
      search: true,
    },
  },
  {
    regex: regex('innovations/?$'),
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
      contents: true,
      search: true,
    },
  },
];
const Navbar = () => {
  // const { components } = React.useContext(DataContext);
  const { showPhoneMenu, activeInnovationId, isUserLogged } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const { showControls, showToggler, regex } = showControlsInPages.find(
    (page) => {
      // console.log(asPath, page.regex.test(asPath));
      return page.regex.test(asPath);
    }
  );

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

      <motion.div
        initial={false}
        className={`navbar__burger`}
        onClick={() => dispatch(togglePhoneMenu(!showPhoneMenu))}
      >
        <Img className={``} src={`/static/icons/burger.svg`} />
      </motion.div>
    </nav>
  );
};

export default Navbar;
