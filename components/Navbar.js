import React from 'react';
import Link from 'next/link';

import Img from './Img';

import { DataContext } from '../pages';

const Navbar = ({ children }) => {
  const { components } = React.useContext(DataContext);
  const { logo } = components.navbar;
  return (
    <nav className={`navbar`}>
      <div className={`navbar__brand`}>
        <Link href={`/`}>
          <Img src={`/components/navbar/${logo}`} />
        </Link>
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
