'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsCart } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';
import { useCartStore } from '@/utils/store';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import Link from 'next/link';

const UserMenu = () => {
  const { totalItems } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { data, status } = useSession();
  const image = data?.user?.image;

  const handleSignOut = useCallback(async () => {
    setIsOpen(false);
    await signOut();
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div onClick={toggle} className="cursor-pointer">
          <div className="w-[10px] h-[10px]"></div>
          <Avatar image={image} />
        </div>
        {totalItems > 0 && (
          <Link href="/cart" className="flex gap-1 items-center">
            <BsCart size={20} />
            <span>Cart ({totalItems})</span>
          </Link>
        )}
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {status === 'unauthenticated' && (
                <MenuItem
                  onClick={() => {
                    router.push('/login'), setIsOpen(false);
                  }}
                  label="Login"
                />
              )}
              {status === 'unauthenticated' && (
                <MenuItem
                  onClick={() => {
                    router.push('/register'), setIsOpen(false);
                  }}
                  label="Sign up"
                />
              )}

              {status === 'authenticated' && (
                <MenuItem
                  onClick={() => {
                    router.push('/profile'), setIsOpen(false);
                  }}
                  label="Profile"
                />
              )}
              {status === 'authenticated' && (
                <MenuItem onClick={handleSignOut} label="Logout" />
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
