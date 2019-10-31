import React from 'react';
import { motion } from 'framer-motion';

import Img from './Img';
import IntroNumber from './IntroNumber';
import IntroBg from './IntroBg';
import IntroContent from './IntroContent';
import Button from './Button';
import { DataContext } from '../pages';

const Intro = ({ setScreen, ...props }) => {
  const { components } = React.useContext(DataContext);
  const { posterSrc, header } = components.intro;
  const { discover, about } = components.button;
  return (
    <motion.div className={`intro`} {...props}>
      <IntroNumber number={20} />
      <IntroContent>
        <h1>{header.toUpperCase()}</h1>
        <Button
          handleClick={() => setScreen('Innovation')}
          className={`btn__primary`}
        >
          {discover}
        </Button>
        <Button
          handleClick={() => console.log('hello')}
          className={`btn__secondary intro__content__about-btn`}
        >
          {about}
        </Button>
      </IntroContent>
      <IntroBg path={`/components/intro/${posterSrc}`} />
    </motion.div>
  );
};

export default Intro;
