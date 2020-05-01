import React from 'react';
import Img from './Img';
import { useKeyPress } from '../hooks/useKeyPress';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  toggleInnovationVideo,
  setCurrentSlideshowIndex,
  toggleSidebar,
  toggleNavbarSearch,
  setActiveInnovationId,
  toggleNavbarDownload,
} from '../store/actions';
import { DataContext } from '../helpers/dataContext';

const NavbarToggler = ({ controlsVariants, showControls }) => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const leftArrow = useKeyPress('ArrowLeft');
  const rightArrow = useKeyPress('ArrowRight');
  const router = useRouter();
  const activeInnovationId = useSelector(state => state.activeInnovationId);
  const { innovations } = React.useContext(DataContext);

  const changeInnovationAction = changeInnovation(dispatch);
  const formatedPos = pos => (pos <= 9 ? `0${pos}` : pos);

  const handleInnovationChange = direction => {
    const nextPossiblePosition = index + direction;
    let nextPosition;
    if (nextPossiblePosition < 0) {
      nextPosition = 0;
    } else if (nextPossiblePosition >= innovations.length - 1) {
      nextPosition = innovations.length - 1;
    } else {
      nextPosition = nextPossiblePosition;
    }
    const nextActiveId = innovations[nextPosition].uid;
    changeInnovationAction(nextActiveId, router.query.lang);
  };

  /*                                    */
  /*    set current index in toggler    */
  /*                                    */

  React.useEffect(() => {
    const currIndex = innovations.findIndex(
      innovation => innovation.uid === activeInnovationId
    );
    setIndex(currIndex);
  }, [activeInnovationId]);

  React.useEffect(() => {
    if (leftArrow) {
      handleInnovationChange(-1);
    } else if (rightArrow) {
      handleInnovationChange(1);
    }
  }, [leftArrow, rightArrow]);

  return (
    <motion.div
      variants={controlsVariants}
      initial={false}
      animate={showControls ? `show` : `hide`}
      className={`navbar__toggler`}
    >
      <Img
        src={`/static/icons/minus.svg`}
        className={`navbar__toggler__btn`}
        onClick={() => handleInnovationChange(-1)}
      />
      <span className={`navbar__toggler__pos`}>{formatedPos(index + 1)}</span>
      <span className={`navbar__toggler__len`}>\ {innovations.length}</span>
      <Img
        src={`/static/icons/plus.svg`}
        className={`navbar__toggler__btn`}
        onClick={() => handleInnovationChange(1)}
      />
    </motion.div>
  );
};

export default NavbarToggler;

const changeInnovation = dispatch => (nextActiveId, lang) => {
  dispatch(toggleInnovationVideo(false));
  dispatch(setCurrentSlideshowIndex(0));
  dispatch(toggleSidebar(`half`));
  dispatch(toggleNavbarSearch(false));
  dispatch(setActiveInnovationId(nextActiveId));
  dispatch(toggleNavbarDownload(false));
  Router.push(`/[lang]/innovations`, `/${lang}/innovations?id=${nextActiveId}`);
};
