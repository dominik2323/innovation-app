import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  SET_ACTIVE_INNOVATION_ID,
  SET_HOVER_INNOVATION_ID,
  SET_CURRENT_SLIDESHOW_INDEX,
  RESET_APP,
  TOGGLE_SIDEBAR,
  TOGGLE_INNOVATION_VIDEO,
  LOG_USER,
  TOGGLE_NAVBAR_SEARCH,
  TOGGLE_PHONE_MENU,
  SET_AUTHORS_VISBILITY,
  TOGGLE_NAVBAR_DOWNLOAD,
} from './types';

const initialState = {
  activeInnovationId: '',
  hoverInnovationId: '',
  currentSlideshowIndex: 0,
  showSidebar: `hide`,
  playInnovationVideo: false,
  isUserLogged: true,
  showNavbarSearch: false,
  showNavbarDownload: false,
  areAuthorsVisible: false,
  showPhoneMenu: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PHONE_MENU:
      return Object.assign({}, { ...state, showPhoneMenu: action.payload });
    case TOGGLE_INNOVATION_VIDEO:
      return Object.assign(
        {},
        { ...state, playInnovationVideo: action.payload }
      );
    case SET_AUTHORS_VISBILITY:
      return Object.assign({}, { ...state, areAuthorsVisible: action.payload });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, { ...state, showSidebar: action.payload });
    case SET_ACTIVE_INNOVATION_ID:
      return Object.assign(
        {},
        { ...state, activeInnovationId: action.payload }
      );
    case SET_CURRENT_SLIDESHOW_INDEX:
      return Object.assign(
        {},
        { ...state, currentSlideshowIndex: action.payload }
      );
    case SET_HOVER_INNOVATION_ID:
      return Object.assign({}, { ...state, hoverInnovationId: action.payload });
    case RESET_APP:
      return Object.assign({}, initialState, {
        activeInnovationId: state.activeInnovationId,
        isUserLogged: state.isUserLogged,
      });
    case LOG_USER:
      return Object.assign(
        {},
        { ...initialState, isUserLogged: action.payload }
      );
    case TOGGLE_NAVBAR_SEARCH:
      return Object.assign({}, { ...state, showNavbarSearch: action.payload });
    case TOGGLE_NAVBAR_DOWNLOAD:
      return Object.assign(
        {},
        { ...state, showNavbarDownload: action.payload }
      );
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
