'use client';

import { User, Vendor } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
  currentUser?: User | Vendor | null;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  return (
    <Image
      className="rounded-full"
      src={currentUser?.image || '/images/placeholder.jpg'}
      height={30}
      width={30}
      alt=""
    />
  );
};

export default Avatar;
