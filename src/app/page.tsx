'use client';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Slider from '@/components/Slider';
import MenuCard from '@/components/menu/MenuCard';
import Loader from '@/components/Loader';
import { MenuItem, User } from '@prisma/client';
import VendorCard from '@/components/VendorCard';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useCartStore } from '@/utils/store';

interface MenuItemWithUser extends MenuItem {
  user: { name: string };
}

export default function Home() {
  const { addToCart, currentVendor, setCurrentVendor } = useCartStore();
  const [latestItems, setLatestItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/menu-items/featured-items').then((res) => {
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
          {latestItems.map((menuItem: MenuItemWithUser) => (
            <MenuCard
              key={menuItem.id}
              name={menuItem.menuItemName}
              desc={menuItem.description}
              price={menuItem.price}
              vendor={{ name: menuItem.user.name }}
              image={menuItem.image}
              home
              onClick={() => {
                const vendorName = menuItem.user.name;
                if (currentVendor && currentVendor !== vendorName) {
                  return toast.error(
                    'You can only order from a particular vendor at a time'
                  );
                }
                setCurrentVendor(vendorName);
                addToCart({
                  id: menuItem.id,
                  menuItemName: menuItem.menuItemName,
                  description: menuItem.description,
                  price: menuItem.price,
                  userId: menuItem.userId,
                  categoryId: menuItem.categoryId,
                  vendor: menuItem.user.name,
                  quantity: 1,
                  image: menuItem.image,
                  createdAt: menuItem.createdAt,
                  updatedAt: menuItem.updatedAt,
                });
                toast.success('Product added to cart');
              }}
            />
          ))}
        </div>
      </div>
      {/* VENDORS */}
      <div className="bg-neutral-200 my-20 max-w-full p-4 md:max-w-6xl mx-auto md:py-10 md:px-20">
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
      {/* ABOUT */}
      <div id="about">
        <About />
      </div>
      {/* FOOTER */}
      <Footer />
    </Container>
  );
}
