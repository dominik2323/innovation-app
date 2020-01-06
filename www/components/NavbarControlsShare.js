import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Img from "./Img";
import Popup from "./Popup";

const NavbarControlsShare = () => {
  const [showCopyPopup, toggleCopyPopup] = React.useState(false);

  const copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <React.Fragment>
      <div
        className={`navbar__controls__item`}
        onClick={() => {
          copyToClipboard(window.location.href);
          toggleCopyPopup(true);
        }}
      >
        <Img src={`/static/icons/share.svg`} />
        <span className={`navbar__controls__item__label`}>Sdílet</span>
      </div>
      <Popup
        msg={`Odkaz zkopírován do schránky`}
        show={showCopyPopup}
        onFinish={() => setTimeout(() => toggleCopyPopup(false), 1000)}
      />
    </React.Fragment>
  );
};

export default NavbarControlsShare;
