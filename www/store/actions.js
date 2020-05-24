import {
  SET_ACTIVE_INNOVATION_ID,
  SET_HOVER_INNOVATION_ID,
  SET_CURRENT_SLIDESHOW_INDEX,
  RESET_APP,
  TOGGLE_SIDEBAR,
  TOGGLE_INNOVATION_VIDEO,
  TOGGLE_NAVBAR_SEARCH,
  TOGGLE_NAVBAR_DOWNLOAD,
  LOG_USER,
  SET_AUTHORS_VISBILITY,
  TOGGLE_PHONE_MENU
} from "./types";

export const togglePhoneMenu = bool => ({
  type: TOGGLE_PHONE_MENU,
  payload: bool
});

export const setActiveInnovationId = id => ({
  type: SET_ACTIVE_INNOVATION_ID,
  payload: id
});

export const setAuthorsVisibility = bool => ({
  type: SET_AUTHORS_VISBILITY,
  payload: bool
});

export const setCurrentSlideshowIndex = index => ({
  type: SET_CURRENT_SLIDESHOW_INDEX,
  payload: index
});

export const setHoverInnovationId = id => ({
  type: SET_HOVER_INNOVATION_ID,
  payload: id
});

export const resetApp = () => ({
  type: RESET_APP
});

export const toggleSidebar = amount => ({
  type: TOGGLE_SIDEBAR,
  payload: amount
});

export const toggleInnovationVideo = bool => ({
  type: TOGGLE_INNOVATION_VIDEO,
  payload: bool
});

export const logUser = bool => ({
  type: LOG_USER,
  payload: bool
});

export const toggleNavbarSearch = bool => ({
  type: TOGGLE_NAVBAR_SEARCH,
  payload: bool
});

export const toggleNavbarDownload = bool => ({
  type: TOGGLE_NAVBAR_DOWNLOAD,
  payload: bool
});
