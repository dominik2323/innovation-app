import React from 'react';
import Img from './Img';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { togglePhoneMenu } from '../store/actions';

const NavbarBrand = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className={`navbar__brand`}>
      <Img
        src={`/static/icons/skodaLogo.svg`}
        onClick={() => {
          Router.push('/[lang]', `/${router.query.lang}`);
          dispatch(togglePhoneMenu(false));
        }}
      />
    </div>
  );
};

export default NavbarBrand;
