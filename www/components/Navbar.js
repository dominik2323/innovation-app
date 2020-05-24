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

const Navbar = ({
  showToggler = false,
  showShare = false,
  showDownload = false,
  showContents = true,
  showSearch = true,
}) => {
  const { showPhoneMenu } = useSelector((state) => state);
  const dispatch = useDispatch();
  const showControls = {
    share: showShare,
    download: showDownload,
    contents: showContents,
    search: showSearch,
  };

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
