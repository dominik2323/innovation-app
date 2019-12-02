import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Img from "./Img";
import NavbarControlsShare from "./NavbarControlsShare";
import NavbarControlsSearch from "./NavbarControlsSearch";
import NavbarControlsDownload from "./NavbarControlsDownload";
import Popup from "./Popup";
import Router from "next/router";
import {
  toggleInnovationVideo,
  setCurrentSlideshowIndex,
  toggleSidebar,
  toggleNavbarSearch,
  toggleNavbarDownload,
  togglePhoneMenu
} from "../store/actions";

const NavbarControls = ({ controlsVariants, showControls }) => {
  const { showNavbarDownload, showPhoneMenu } = useSelector(state => state);
  const dispatch = useDispatch();
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
              showContentsAction();
              dispatch(togglePhoneMenu(false));
            }}
          >
            Obsah
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default NavbarControls;

const showContents = dispatch => () => {
  dispatch(setCurrentSlideshowIndex(0));
  dispatch(toggleSidebar(`hide`));
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(toggleInnovationVideo(false));
  Router.push({ pathname: `/innovations` });
};
