import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Img from "./Img";
import NavbarControlsSearchList from "./NavbarControlsSearchList";
import Popup from "./Popup";
import { toggleSidebar, toggleNavbarSearch } from "../store/actions";
import { useSearch } from "../hooks/useSearch";

const NavbarControlsSearch = () => {
  const [query, updateQuery] = React.useState("");
  const filteredItems = useSearch(query);
  const dispatch = useDispatch();
  const { showNavbarSearch } = useSelector(state => state);

  const classNamePrefix = `navbar__search`;
  return (
    <React.Fragment>
      <div
        className={`navbar__controls__item`}
        onClick={() => {
          updateQuery("");
          dispatch(toggleSidebar(`hide`));
          dispatch(toggleNavbarSearch(!showNavbarSearch));
        }}
      >
        <Img src={`/static/icons/search.svg`} />
        <span className={`navbar__controls__item__label`}>Hledat</span>
      </div>
      {showNavbarSearch && (
        <div className={classNamePrefix}>
          <input
            type="text"
            value={query}
            autoFocus={true}
            onChange={e => updateQuery(e.target.value)}
          />
          <NavbarControlsSearchList
            show={query.length > 2}
            resetQuery={() => updateQuery("")}
            filteredItems={filteredItems}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarControlsSearch;
