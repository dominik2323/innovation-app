import React from "react";
import Img from "./Img";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { togglePhoneMenu } from "../store/actions";

const NavbarBrand = ({ logo }) => {
  const showPhoneMenu = useSelector(state => state.showPhoneMenu);
  const dispatch = useDispatch();
  return (
    <div className={`navbar__brand`}>
      <Img
        src={`/static/icons/${logo}`}
        onClick={() => {
          Router.push("/");
          dispatch(togglePhoneMenu(false));
        }}
      />
    </div>
  );
};

export default NavbarBrand;
