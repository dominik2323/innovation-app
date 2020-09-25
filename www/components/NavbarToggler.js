import React from 'react';
import Img from './Img';
// import { useKeyPress } from '../hooks/useKeyPress';
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
import { selectInnovationById } from '../helpers/selectInnovationById';

const NavbarToggler = ({ controlsVariants, showControls }) => {
  const { innovations } = React.useContext(DataContext);
  const { activeInnovationId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const changeInnovationAction = changeInnovation(dispatch);

  const currInnovationIndex = selectInnovationById(
    innovations,
    activeInnovationId
  ).order;

  const [currentIndex, setCurrentIndex] = React.useState(currInnovationIndex);

  const handleInnovationChange = (direction, distance = 1) => {
    const nextIndex = currInnovationIndex + direction * distance;
    const nextInnovation = innovations.find(
      ({ node }) => node.order === nextIndex
    );

    if (innovations.length < nextIndex || nextIndex < 0) return;

    if (!nextInnovation) {
      handleInnovationChange(direction, distance + 1);
      return;
    }

    changeInnovationAction(nextInnovation.node._meta.uid, router.query.lang);
  };

  React.useEffect(() => {
    setCurrentIndex(currInnovationIndex);
  }, [activeInnovationId]);

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
      <span className={`navbar__toggler__pos`}>
        {currentIndex >= 10 ? currentIndex : `0${currentIndex}`}
      </span>
      <span className={`navbar__toggler__len`}>\ {innovations?.length}</span>
      <Img
        src={`/static/icons/plus.svg`}
        className={`navbar__toggler__btn`}
        onClick={() => handleInnovationChange(1)}
      />
    </motion.div>
  );
};

export default NavbarToggler;

const changeInnovation = (dispatch) => (nextActiveId, lang) => {
  dispatch(toggleInnovationVideo(false));
  dispatch(setCurrentSlideshowIndex(0));
  dispatch(toggleSidebar(`half`));
  dispatch(toggleNavbarSearch(false));
  dispatch(setActiveInnovationId(nextActiveId));
  dispatch(toggleNavbarDownload(false));
  Router.push(`/[lang]/innovations`, `/${lang}/innovations?id=${nextActiveId}`);
};
