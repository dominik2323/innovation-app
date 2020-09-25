import Router, { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePhoneMenu } from '../store/actions';
import Img from './Img';

const NavbarBrand = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const lang = router.query.lang;
  return (
    <div className={`navbar__brand`}>
      <Img
        src={`/static/icons/skodaLogo_${lang}.svg`}
        onClick={() => {
          Router.push('/[lang]', `/${lang}`);
          dispatch(togglePhoneMenu(false));
        }}
      />
    </div>
  );
};

export default NavbarBrand;
