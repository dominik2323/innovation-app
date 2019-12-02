export const TOPBAR_HEIGHT = `60px`;
export const VIEW_HEIGHT = `100vh - ${TOPBAR_HEIGHT}px`;

const transition = {
  type: 'spring',
  damping: 100,
  velocity: 1
  // duration: 5
};

export const VARIANTS = {
  PAGES: {
    ABOUT: {
      INITIAL: {
        x: 0,
        zIndex: -1,
        transition
      },
      ENTER: {
        x: 0,
        zIndex: -1,
        transitionEnd: { zIndex: `initial` },
        transition
      },
      EXIT: {
        x: 0,
        zIndex: -1,
        transition
      }
    },
    INTRO: {
      INITIAL: { x: `-100%`, transition },
      ENTER: { x: 0, transition },
      EXIT: { x: `-100%`, transition }
    },
    INNOVATION: {
      INITIAL: { x: `100%`, transition },
      ENTER: { x: 0, transition },
      EXIT: { x: `0%`, transition }
    }
  }
};
