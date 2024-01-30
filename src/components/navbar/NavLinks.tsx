'use client';

import Link from 'next/link';

const NavLinks = () => {
  return (
    <div className="flex sm:gap-1 md:gap-3 ">
      <Link
        className="items-center font-semibold rounded-full px-2 py-1 hover:text-orange-500 hover:bg-neutral-100 transition cursor-pointer"
        href="/"
      >
        Home
      </Link>
      <Link
        className="font-semibold rounded-full px-4 py-1 hover:text-orange-500 hover:bg-neutral-100 transition cursor-pointer"
        href="/"
      >
        Menu
      </Link>
      <Link
        className="font-semibold rounded-full px-4 py-1 hover:text-orange-500 hover:bg-neutral-100 transition cursor-pointer"
        href="/"
      >
        About
      </Link>
    </div>
  );
};

export default NavLinks;
