export const TOPBAR_HEIGHT = `60px`;
export const VIEW_HEIGHT = `100vh - ${TOPBAR_HEIGHT}px`;

export const VH = (frag = 1) => {
  if (process.browser) {
    return window.innerHeight * frag;
  }
  return 0;
};
export const VW = (frag = 1) => {
  if (process.browser) {
    return window.innerWidth * frag;
  }
  return 0;
};

const transition = {
  type: 'spring',
  damping: 100,
  velocity: 1,
  // duration: 5
};

export const VARIANTS = {
  PAGES: {
    ABOUT: {
      INITIAL: {
        x: 0,
        zIndex: -1,
        transition,
      },
      ENTER: {
        x: 0,
        zIndex: -1,
        transitionEnd: { zIndex: 1 },
        transition,
      },
      EXIT: {
        x: 0,
        zIndex: -1,
        transition,
      },
    },
    INTRO: {
      INITIAL: { x: VW(-1), transition },
      ENTER: { x: 0, transition },
      EXIT: { x: VW(-1), transition },
    },
    INNOVATION: {
      INITIAL: { x: VW(1), transition },
      ENTER: { x: 0, transition },
      EXIT: { x: 0, transition },
    },
  },
};
