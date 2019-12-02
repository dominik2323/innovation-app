import React from "react";
import Img from "./Img";
import Router from "next/router";

const NavbarBrand = ({ logo }) => {
  return (
    <div className={`navbar__brand`}>
      <Img
        src={`/static/icons/${logo}`}
        onClick={() => {
          Router.push("/");
        }}
      />
    </div>
  );
};

export default NavbarBrand;
