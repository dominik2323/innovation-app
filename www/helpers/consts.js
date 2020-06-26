export const TOPBAR_HEIGHT = `60px`;
export const VIEW_HEIGHT = `100vh - ${TOPBAR_HEIGHT}px`;

export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;

export const appLangs = {
  cs: 'cs-cz',
  de: 'de-de',
  en: 'en-gb',
};
// export const defaultAppLang = 'en';

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
      INITIAL: ({ w }) => ({
        x: `-100vw`,
        transition,
      }),
      ENTER: { x: `0vw`, transition },
      EXIT: ({ w }) => ({
        x: `-100vw`,
        transition,
      }),
    },
    INNOVATION: {
      INITIAL: ({ w }) => ({
        x: `100vw`,
        transition,
      }),
      ENTER: { x: `0vw`, transition },
      EXIT: { x: `0vw`, transition },
    },
  },
};
