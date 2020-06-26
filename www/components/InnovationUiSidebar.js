import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import Link from './Link';
import Button from './Button';
import { selectInnovationById } from '../helpers/selectInnovationById';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import {
  toggleSidebar,
  toggleNavbarSearch,
  toggleNavbarDownload,
} from '../store/actions';
import InnovationUiSidebarIntro from './InnovationUiSidebarIntro';
import ScrollToTop from './ScrollToTop';
import InnovationUiSidebarDetail from './InnovationUiSidebarDetail';
const transition = {
  type: 'spring',
  damping: 100,
  velocity: 1,
};
const InnovationUiSidebar = () => {
  const { innovations } = React.useContext(DataContext);
  const ref = React.useRef(null);
  const [showScrollTop, toggleScrollToTop] = React.useState(false);
  const dispatch = useDispatch();
  const { activeInnovationId, showSidebar } = useSelector((state) => state);
  const { w } = useViewportDimensions();
  const { innovationName, perex, benefits } = selectInnovationById(
    innovations,
    activeInnovationId
  );

  const sidebarVariants = {
    show: { x: '0%', transition },
    hide: { x: '100%', transition },
    half: { x: w <= 1200 ? `0%` : `60%`, transition },
  };

  const isSidebarHidden = showSidebar === `hide`;

  const handleScroll = (e) => {
    toggleScrollToTop(w < 900 && e.target.scrollTop > e.target.clientHeight);
  };

  React.useEffect(() => {
    ref.current.addEventListener('scroll', handleScroll);
    return () => ref.current.removeEventListener('scroll', handleScroll);
  }, [w]);

  React.useEffect(() => {
    ref.current.scrollTop = 0;
  }, [activeInnovationId]);

  return (
    <motion.div
      variants={sidebarVariants}
      animate={showSidebar}
      initial={false}
      className={`innovation-ui__sidebar`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`innovation-ui__sidebar__toggler ${
          isSidebarHidden ? `hidden` : `shown`
        }`}
        onClick={() => {
          dispatch(toggleNavbarSearch(false));
          dispatch(toggleNavbarDownload(false));
          dispatch(toggleSidebar(isSidebarHidden ? `half` : `hide`));
        }}
      />
      <div className={`innovation-ui__sidebar__content`} ref={ref}>
        <InnovationUiSidebarIntro />
        <InnovationUiSidebarDetail />
        <ScrollToTop
          show={showScrollTop}
          handleClick={() => (ref.current.scrollTop = 0)}
        />
      </div>
    </motion.div>
  );
};

export default InnovationUiSidebar;
