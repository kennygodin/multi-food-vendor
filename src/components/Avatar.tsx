'use client';

import Image from 'next/image';

interface AvatarProps {
  image?: string | null;
  tab?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image, tab }) => {
  return (
    <Image
      className={tab ? 'rounded-md object-cover' : 'rounded-full'}
      src={image || '/images/placeholder.jpg'}
      height={tab ? 120 : 30}
      width={tab ? 120 : 30}
      alt=""
    />
  );
};

export default Avatar;
