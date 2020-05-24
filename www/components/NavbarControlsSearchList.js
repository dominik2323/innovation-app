import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Router, { useRouter } from 'next/router';

import {
  toggleNavbarSearch,
  toggleNavbarDownload,
  toggleSidebar,
  togglePhoneMenu,
} from '../store/actions';

import Scrollbar from './Scrollbar';

const listVariants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const NavbarControlsSearchList = ({
  show,
  filteredItems,
  resetQuery,
  queryIsSearchable,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { components } = React.useContext(DataContext);
  const selectProject = selectProjectAction(dispatch, router);
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
          <h1>{components.navbar_search_results}</h1>
          <p>{`${components.navbar_search_num_of_results}: ${filteredItems.length}`}</p>
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
            <h4>{components.navbar_search_no_results}</h4>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarControlsSearchList;

const selectProjectAction = (dispatch, router) => (uid) => {
  dispatch(toggleSidebar(`half`));
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(togglePhoneMenu(false));
  Router.push({
    pathname: `/${router.query.lang}/innovations`,
    query: { id: uid },
  });
};
