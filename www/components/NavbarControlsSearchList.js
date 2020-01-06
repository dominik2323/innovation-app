import React from "react";
import { DataContext } from "../helpers/dataContext";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Router from "next/router";

import {
  setActiveInnovationId,
  toggleNavbarSearch,
  toggleNavbarDownload,
  toggleSidebar,
  togglePhoneMenu
} from "../store/actions";

import Scrollbar from "./Scrollbar";
import Img from "./Img";

const listVariants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const NavbarControlsSearchList = ({
  show,
  filteredItems,
  resetQuery,
  queryIsSearchable
}) => {
  const dispatch = useDispatch();
  const selectProject = selectProjectAction(dispatch);
  const classNamePrefix = `navbar__search`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`${classNamePrefix}__list`}
          variants={listVariants}
          initial={`initial`}
          animate={`enter`}
          exit={`exit`}
        >
          <h1>Výsledky hledání</h1>
          <p>{`Počet výsledků: ${filteredItems.length}`}</p>
          <div
            className={`${classNamePrefix}__list__close`}
            onClick={() => dispatch(toggleNavbarSearch(false))}
          />
          {filteredItems.length > 0 ? (
            <Scrollbar vTrackStyle={{ right: 17, top: 0, left: `initial` }}>
              {filteredItems.map(({ innovationname, id, uid }) => (
                <h3
                  onClick={() => {
                    selectProject(uid);
                    resetQuery();
                  }}
                  key={id}
                >
                  {innovationname}
                </h3>
              ))}
            </Scrollbar>
          ) : (
            /*<Img src={`/static/icons/sadCactus.svg`} />*/
            <h4>Nepodařilo se najít žádné výsledky</h4>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarControlsSearchList;

const selectProjectAction = dispatch => uid => {
  dispatch(toggleSidebar(`half`));
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(togglePhoneMenu(false));
  Router.push({
    pathname: "/innovations",
    query: { id: uid }
  });
};
