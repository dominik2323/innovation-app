import React from 'react';
import { motion } from 'framer-motion';
const View = ({ children, ...props }) => {
  return (
    <motion.div
      className={`view`}
      initial={`INITIAL`}
      animate={`ENTER`}
      exit={`EXIT`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default View;
