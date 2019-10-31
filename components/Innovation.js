import React from 'react';
import { motion } from 'framer-motion';
import InnovationContents from './InnovationContents';

import Button from './Button';

const Innovation = ({ setScreen, ...props }) => {
  return (
    <motion.div className={`innovation`} {...props}>
      <InnovationContents>
        <h1>Innovation</h1>
        <Button handleClick={() => setScreen('Intro')}>back</Button>
      </InnovationContents>
    </motion.div>
  );
};

export default Innovation;
