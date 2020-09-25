import React from 'react';

import { togglePhoneMenu } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

import NavbarBrand from './NavbarBrand';
import NavbarToggler from './NavbarToggler';
import NavbarControls from './NavbarControls';
import { useViewportDimensions } from '../hooks/useViewportDimensions';

const controlsVariants = {
  show: { opacity: 1, display: `flex` },
  hide: { opacity: 0, transitionEnd: { display: `none` } },
};

const Navbar = ({
  showToggler = false,
  showShare = false,
  showDownload = false,
  showContents = true,
  showSearch = true,
}) => {
  const { showPhoneMenu } = useSelector((state) => state);
  const dispatch = useDispatch();
  const showControls = {
    share: showShare,
    download: showDownload,
    contents: showContents,
    search: showSearch,
  };
  const { w } = useViewportDimensions();

  return (
    <nav className={`navbar`}>
      <NavbarBrand />
      {showToggler && (
        <NavbarToggler
          controlsVariants={controlsVariants}
          showControls={showToggler}
        />
      )}
      <NavbarControls
        controlsVariants={controlsVariants}
        showControls={showControls}
      />
      {w <= 900 && (
        <button
          className={`hamburger hamburger--slider ${
            showPhoneMenu ? `is-active` : ``
          }`}
          onClick={() => dispatch(togglePhoneMenu(!showPhoneMenu))}
          type='button'
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner'></span>
          </span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
