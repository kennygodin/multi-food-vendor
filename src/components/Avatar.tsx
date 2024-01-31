'use client';

import Image from 'next/image';

interface AvatarProps {
  image?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      className="rounded-full"
      src={image || '/images/placeholder.jpg'}
      height={30}
      width={30}
      alt=""
    />
  );
};

export default Avatar;
