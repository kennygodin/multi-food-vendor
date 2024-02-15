'use client';

import { FaInfoCircle } from 'react-icons/fa';
import Container from './Container';
import { useEffect, useState } from 'react';

const sliderData = [
  {
    id: 1,
    title: 'Explore a World of Flavors',
    bg: "bg-[url('https://res.cloudinary.com/kencodin/image/upload/v1706231712/multi-food%20vendor/slider4_mbpr03.jpg')]",
  },
  {
    id: 2,
    title: 'Indulge in Culinary Delights from Local Chefs',
    bg: "bg-[url('https://res.cloudinary.com/kencodin/image/upload/v1706231712/multi-food%20vendor/slider1_v03xko.jpg')]",
  },
  {
    id: 3,
    title: 'Discover Your Next Favorite Dish with TasteTroop',
    bg: "bg-[url('https://res.cloudinary.com/kencodin/image/upload/v1706231714/multi-food%20vendor/slider5_w60kac.jpg')]",
  },
  {
    id: 1,
    title: 'Savor Every Bite, Every Flavor, Every Moment',
    bg: "bg-[url('https://res.cloudinary.com/kencodin/image/upload/v1706231712/multi-food%20vendor/slider6_hm8khs.jpg')]",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prevValue) =>
          prevValue === sliderData.length - 1 ? 0 : prevValue + 1
        ),
      3000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="h-[50vh] md:h-[70vh]">
        {/* Image container */}
        <div
          className={`w-full h-full ${sliderData[currentSlide].bg} bg-cover bg-center
            `}
        >
          <div className="relative  h-full w-full bg-black/40 backdrop-brightness-75">
            {/* Text container */}
            <div className="w-[80%] px-4 py-2 md:w-1/2 bg-orange-500/80 absolute top-10 left-3 md:p-8 md:top-20 md:left-10 rounded-lg">
              <h1 className="text-2xl md:text-5xl text-white">
                {sliderData[currentSlide].title}
              </h1>
              <button className="text-white bg-green-500 py-2 px-3 mt-2 rounded-md flex items-center gap-2 hover:opacity-80 transition">
                <FaInfoCircle /> <span>Order now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
