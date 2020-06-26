import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const View = ({
  children,
  showContents,
  showDownload,
  showSearch,
  showToggler,
  showShare,
  ...props
}) => {
  return (
    <>
      <Navbar
        showContents={showContents}
        showDownload={showDownload}
        showSearch={showSearch}
        showShare={showShare}
        showToggler={showToggler}
      />
      <AnimatePresence initial={false}>
        <motion.div
          className={`view`}
          initial={`INITIAL`}
          animate={`ENTER`}
          exit={`EXIT`}
          {...props}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default View;
