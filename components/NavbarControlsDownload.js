import React from "react";
import Router, { useRouter } from "next/router";

import Img from "./Img";

const NavbarControlsDownload = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div
      className={`navbar__controls__item`}
      onClick={() => Router.push(`/api/pdf?id=${id}`)}
    >
      <Img src={`/static/icons/download.svg`} />
      <span className={`navbar__controls__item__label`}>Stáhnout PDF</span>
    </div>
  );
};

export default NavbarControlsDownload;
