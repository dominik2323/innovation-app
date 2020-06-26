import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ msg, show, onFinish = () => null }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`popup`}
          onAnimationComplete={() => onFinish()}
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
