'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsCart } from 'react-icons/bs';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import { User, Vendor } from '@prisma/client';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser?: User | Vendor | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div onClick={toggle} className="cursor-pointer">
          <Avatar currentUser={currentUser} />
        </div>
        <div className="cursor-pointer">
          <BsCart size={20} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {!currentUser && (
                <MenuItem
                  onClick={() => {
                    router.push('/login'), setIsOpen(false);
                  }}
                  label="Login"
                />
              )}
              {!currentUser && (
                <MenuItem
                  onClick={() => {
                    router.push('/register'), setIsOpen(false);
                  }}
                  label="Sign up"
                />
              )}

              {currentUser && (
                <MenuItem
                  onClick={() => {
                    router.push('/profile'), setIsOpen(false);
                  }}
                  label="Profile"
                />
              )}
              {currentUser && (
                <MenuItem
                  onClick={() => {
                    signOut(), setIsOpen(false);
                  }}
                  label="Logout"
                />
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
