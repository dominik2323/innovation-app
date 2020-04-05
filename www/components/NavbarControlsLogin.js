import React from 'react';
import { useAuth0 } from '../helpers/auth';
import { DataContext } from '../helpers/dataContext';

import Popup from './Popup';
import Img from './Img';

function NavbarControlsLogin() {
  const [showPopup, togglePopup] = React.useState(false);
  const { components } = React.useContext(DataContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div className={`navbar-controls__item navbar-login`}>
      {!isAuthenticated && (
        <span onClick={loginWithRedirect}>{components.login}</span>
      )}
      {isAuthenticated && (
        <span onClick={logout}>
          {components.logout}
          {!user?.isAllowed && (
            <Img
              src={`/static/icons/information.svg`}
              onMouseEnter={() => togglePopup(true)}
              onMouseLeave={() => togglePopup(false)}
            />
          )}
        </span>
      )}
      <Popup msg={components.unauthorized} show={showPopup} />
    </div>
  );
}

export default NavbarControlsLogin;
