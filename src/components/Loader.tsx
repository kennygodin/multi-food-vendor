'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
      <PuffLoader size={70} color="orange" />
    </div>
  );
};

export default Loader;
