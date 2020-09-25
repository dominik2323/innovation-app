import React from 'react';
import { useAuth } from '../hocs/auth';
import { DataContext } from '../helpers/dataContext';
import Router, { useRouter } from 'next/router';

import Popup from './Popup';
import Img from './Img';
import { useDispatch } from 'react-redux';
import { togglePhoneMenu } from '../store/actions';

function NavbarControlsLogin() {
  const [showPopup, togglePopup] = React.useState(false);
  const { components } = React.useContext(DataContext);
  const { query } = useRouter();
  const { isAuthenticated, logout, isAllowed, loading } = useAuth();
  const dispatch = useDispatch();
  return (
    !loading && (
      <div className={`navbar-controls__item navbar-login`}>
        {!isAuthenticated && (
          <span
            onClick={() => {
              dispatch(togglePhoneMenu(false));
              Router.push(`/[lang]/login`, `/${query.lang}/login`);
            }}
          >
            {components?.login}
          </span>
        )}
        {isAuthenticated && (
          <>
            <span onClick={logout}>{components.logout}</span>
            {/* {!isAllowed && (
              <Img
                src={`/static/icons/information.svg`}
                onMouseEnter={() => togglePopup(true)}
                onMouseLeave={() => togglePopup(false)}
              />
            )} */}
          </>
        )}
        <Popup msg={components?.unauthorized} show={showPopup} />
      </div>
    )
  );
}

export default NavbarControlsLogin;
