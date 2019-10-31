import { AnimatePresence, motion } from 'framer-motion';

import '../scss/index.scss';
import data from '../data';
import Intro from '../components/Intro';
import Navbar from '../components/Navbar';
import Innovation from '../components/Innovation';
import View from '../components/View';

export const DataContext = React.createContext();

const transition = {
  duration: 30,
  type: 'tween',
  ease: 'easeInOut'
};

const variants = {
  innovation: {
    initial: { x: '100%', transition },
    enter: { x: '0vw', transition },
    exit: { x: '100%', transition }
  },
  intro: {
    initial: { x: '-100%', transition },
    enter: { x: '0vw', transition },
    exit: { x: '-100%', transition }
  }
};

export default () => {
  const [screen, setScreen] = React.useState('Intro');
  const Screens = {
    Intro: (
      <Intro
        key={`intro`}
        initial={`initial`}
        animate={`enter`}
        exit={`exit`}
        variants={variants.intro}
        setScreen={screen => setScreen(screen)}
      />
    ),
    Innovation: (
      <Innovation
        key={`innovation`}
        initial={`initial`}
        animate={`enter`}
        exit={`exit`}
        variants={variants.innovation}
        setScreen={screen => setScreen(screen)}
      />
    )
  };
  return (
    <DataContext.Provider value={data}>
      <Navbar />
      <View>
        <AnimatePresence initial={false}>{Screens[screen]}</AnimatePresence>
      </View>
    </DataContext.Provider>
  );
};
