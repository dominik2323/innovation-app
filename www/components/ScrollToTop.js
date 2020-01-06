import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTop = ({ show, handleClick = () => null }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`scrollToTop`}
          onClick={() => handleClick()}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className={`scroll-to-top`}
        />
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
