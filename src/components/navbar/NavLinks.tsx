'use client';

import NavLinksItem from './NavLinksItem';

const NavLinks = () => {
  return (
    <div className="flex sm:gap-1 md:gap-3 ">
      <NavLinksItem label="Home" url="/" />
      <NavLinksItem label="Menu" url="/menu" />
      <NavLinksItem label="About" url="/about" />
    </div>
  );
};

export default NavLinks;
