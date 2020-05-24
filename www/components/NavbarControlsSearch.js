import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Img from './Img';
import NavbarControlsSearchList from './NavbarControlsSearchList';

import { DataContext } from '../helpers/dataContext';
import { useSearch } from '../hooks/useSearch';
import { toggleSidebar, toggleNavbarSearch } from '../store/actions';

const NavbarControlsSearch = () => {
  const [query, updateQuery] = React.useState('');
  const { components } = React.useContext(DataContext);
  const filteredItems = useSearch(query);
  const dispatch = useDispatch();
  const { showNavbarSearch } = useSelector((state) => state);

  const classNamePrefix = `navbar__search`;
  return (
    <React.Fragment>
      <div
        className={`navbar__controls__item`}
        onClick={() => {
          updateQuery('');
          dispatch(toggleSidebar(`hide`));
          dispatch(toggleNavbarSearch(!showNavbarSearch));
        }}
      >
        <Img src={`/static/icons/search.svg`} />
        <span className={`navbar__controls__item__label`}>
          {components.navbar_search_label}
        </span>
      </div>
      {showNavbarSearch && (
        <div className={classNamePrefix}>
          <input
            type='text'
            value={query}
            autoFocus={true}
            onChange={(e) => updateQuery(e.target.value)}
          />
          <NavbarControlsSearchList
            show={query.length > 2}
            resetQuery={() => updateQuery('')}
            filteredItems={filteredItems}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarControlsSearch;
