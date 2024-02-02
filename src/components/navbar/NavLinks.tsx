'use client';

import Link from 'next/link';
import NavLinksItem from './NavLinksItem';

const NavLinks = () => {
  return (
    <div className="flex sm:gap-1 md:gap-3 ">
      <NavLinksItem label="Home" url="" />
      <NavLinksItem label="Menu" url="" />
      <NavLinksItem label="About" url="" />
    </div>
  );
};

export default NavLinks;
