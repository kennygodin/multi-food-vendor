'use client';

import Container from '../Container';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';

import { User, Vendor } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | Vendor | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-12 border-b-[1px]">
          <Logo />
          <NavLinks />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
