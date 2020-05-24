import React from 'react';
import Img from './Img';
import Popup from './Popup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DataContext } from '../helpers/dataContext';

const NavbarControlsShare = () => {
  const [showCopyPopup, toggleCopyPopup] = React.useState(false);
  const { components } = React.useContext(DataContext);
  return (
    <React.Fragment>
      <CopyToClipboard
        onCopy={() => {
          toggleCopyPopup(true);
        }}
        text={window.location.href}
      >
        <div className={`navbar__controls__item`}>
          <Img src={`/static/icons/share.svg`} />
          <span className={`navbar__controls__item__label`}>
            {components.navbar_share_label}
          </span>
        </div>
      </CopyToClipboard>
      <Popup
        msg={components.navbar_share_link_copied}
        show={showCopyPopup}
        onFinish={() => setTimeout(() => toggleCopyPopup(false), 1000)}
      />
    </React.Fragment>
  );
};

export default NavbarControlsShare;
