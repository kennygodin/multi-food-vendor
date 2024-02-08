'use client';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Slider from '@/components/Slider';
import MenuCard from '@/components/menu/MenuCard';
import Loader from '@/components/Loader';
import { MenuItem, User } from '@prisma/client';
import VendorCard from '@/components/VendorCard';

interface MenuItemWithUser extends MenuItem {
  user: { name: string };
}

export default function Home() {
  const [latestItems, setLatestItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/menu-items').then((res) => {
        const latestThree = res.data.slice(0, 3);
        setLatestItems(latestThree);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const getOurVendors = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/vendors').then((res: AxiosResponse) => {
        setVendors(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getMenuItems();
    getOurVendors();
  }, [getMenuItems, getOurVendors]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Slider />
      {/* MENU ITEMS */}
      <div className="mt-20 max-w-3xl mx-auto flex flex-col items-center">
        <Heading
          mainTitle="Latest Menu Items"
          subTitle="Checkout recent menu items by our vendors"
          center
          home
        />
        <div className="flex gap-3 flex-wrap justify-center mt-8">
          {latestItems.map((item: MenuItemWithUser) => (
            <MenuCard
              key={item.id}
              name={item.menuItemName}
              desc={item.description}
              price={item.price}
              vendor={{ name: item.user.name }}
              image={item.image}
              home
            />
          ))}
        </div>
      </div>
      {/* VENDORS */}
      <div className="bg-neutral-200 my-20 max-w-6xl mx-auto p-10">
        <Heading
          mainTitle="Our Vendors"
          subTitle="Checkout more menu by our vendors"
          center
        />
        <div className="flex gap-2 flex-wrap justify-center mt-5">
          {vendors.map((vendor: User) => (
            <VendorCard
              onClick={() => router.push(`/vendors/${vendor.id}`)}
              key={vendor.id}
              name={vendor.name}
              email={vendor.email}
              phoneNumber={vendor.phoneNumber}
              image={vendor.image}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
