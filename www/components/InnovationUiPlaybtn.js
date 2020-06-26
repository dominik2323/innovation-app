import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import {
  toggleInnovationVideo,
  toggleSidebar,
  toggleNavbarSearch,
  toggleNavbarDownload
} from '../store/actions';

const InnovationUiPlaybtn = () => {
  const dispatch = useDispatch();
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`innovation-ui__playbtn`}
      onClick={() => {
        dispatch(toggleSidebar(`hide`));
        dispatch(toggleInnovationVideo(true));
        dispatch(toggleNavbarSearch(false));
        dispatch(toggleNavbarDownload(false));
      }}
    />
  );
};

export default InnovationUiPlaybtn;
