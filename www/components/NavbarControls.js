import React from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import NavbarControlsShare from './NavbarControlsShare';
import NavbarControlsSearch from './NavbarControlsSearch';
import NavbarControlsDownload from './NavbarControlsDownload';
import NavbarControlsLang from './NavbarControlsLang';
import NavbarControlsLogin from './NavbarControlsLogin';

import { DataContext } from '../helpers/dataContext';
import {
  toggleInnovationVideo,
  setCurrentSlideshowIndex,
  toggleSidebar,
  toggleNavbarSearch,
  toggleNavbarDownload,
  togglePhoneMenu,
  setActiveInnovationId,
} from '../store/actions';

const NavbarControls = ({ controlsVariants, showControls }) => {
  const { components } = React.useContext(DataContext);
  const { showPhoneMenu } = useSelector(state => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const showContentsAction = showContents(dispatch);
  const { search, download, share, contents } = showControls;

  return (
    <motion.div
      variants={controlsVariants}
      // animate={showControls ? `show` : `hide`}
      initial={false}
      className={`navbar__controls ${showPhoneMenu ? `show` : `hide`}`}
    >
      {search && <NavbarControlsSearch />}
      {download && <NavbarControlsDownload />}
      {share && <NavbarControlsShare />}
      {contents && (
        <div className={`navbar__controls__item`}>
          <span
            className={`navbar__controls__item__label navbar__controls__item__label--text`}
            onClick={() => {
              showContentsAction(router.query.lang);
              dispatch(togglePhoneMenu(false));
            }}
          >
            {components.contents}
          </span>
        </div>
      )}
      <NavbarControlsLang />
      <NavbarControlsLogin />
    </motion.div>
  );
};

export default NavbarControls;

const showContents = dispatch => lang => {
  dispatch(setCurrentSlideshowIndex(0));
  dispatch(toggleSidebar(`hide`));
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(toggleInnovationVideo(false));
  dispatch(setActiveInnovationId(''));
  Router.push(`/[lang]/innovations`, `/${lang}/innovations`);
};
