import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import InnovationUiSlider from './InnovationUiSlider';
import InnovationUiSidebar from './InnovationUiSidebar';
import InnovationUiPlaybtn from './InnovationUiPlaybtn';

const variants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

const InnovationUi = () => {
  const { activeInnovationId } = useSelector(state => state);
  const showUi = activeInnovationId.length !== 0;
  return (
    <motion.div
      variants={variants}
      initial={false}
      animate={showUi ? `show` : `hide`}
      className={`innovation-ui`}>
      {/*<div className={`innovation-ui`}>*/}
      <InnovationUiSlider />
      {/*<InnovationUiPlaybtn />*/}
      <InnovationUiSidebar />
    </motion.div>
  );
};

export default InnovationUi;
