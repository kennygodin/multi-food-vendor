'use client';

import Link from 'next/link';
import { PiBowlFoodLight } from 'react-icons/pi';

const Logo = () => {
  return (
    <div className="text-orange-500 flex items-center gap-1">
      <PiBowlFoodLight size={25} />
      <Link className="hidden md:block text-lg font-semibold" href="/">
        FoodTroops
      </Link>
    </div>
  );
};

export default Logo;
