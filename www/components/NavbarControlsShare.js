import React from 'react';
import Img from './Img';
import Popup from './Popup';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const NavbarControlsShare = () => {
  const [showCopyPopup, toggleCopyPopup] = React.useState(false);

  return (
    <React.Fragment>
      <CopyToClipboard
        onCopy={() => {
          toggleCopyPopup(true);
        }}
        text={window.location.href}>
        <div className={`navbar__controls__item`}>
          <Img src={`/static/icons/share.svg`} />
          <span className={`navbar__controls__item__label`}>Sdílet</span>
        </div>
      </CopyToClipboard>
      <Popup
        msg={`Odkaz zkopírován do schránky`}
        show={showCopyPopup}
        onFinish={() => setTimeout(() => toggleCopyPopup(false), 1000)}
      />
    </React.Fragment>
  );
};

export default NavbarControlsShare;
