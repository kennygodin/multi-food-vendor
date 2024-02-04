'use client';

import Image from 'next/image';

interface AvatarProps {
  image?: string | null;
  tab?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image, tab }) => {
  return (
    <div
      className={`relative ${
        tab ? 'w-[100px] h-[100px]' : ' w-[30px] h-[30px]'
      }`}
    >
      <Image
        src={image || '/images/placeholder.jpg'}
        alt=""
        layout="fill"
        objectFit="cover"
        className={`rounded-${tab ? 'md' : 'full'}`}
        // sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 100px"
      />
    </div>
  );
};

export default Avatar;
