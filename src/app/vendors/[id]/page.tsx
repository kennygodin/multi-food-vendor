'use client';

import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { Category, MenuItem, User } from '@prisma/client';
import MenuCard from '@/components/menu/MenuCard';
import VendorCard from '@/components/VendorCard';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast';
import { useCartStore } from '@/utils/store';

interface UserWithCategory extends User {
  categories: Category[];
}
interface CategoryWithMenuItems extends Category {
  menuItems: MenuItem[];
}
interface MenuItemsWithUser extends MenuItem {
  user: { name: string };
}

const VendorPage = () => {
  const { addToCart, currentVendor, setCurrentVendor } = useCartStore();
  const params = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<UserWithCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getVendorWithItems = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`/api/vendors/${params.id}`)
        .then((res: AxiosResponse) => {
          setVendor(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getVendorWithItems();
  }, [getVendorWithItems]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="mt-8 max-w-3xl mx-auto flex flex-col items-center">
        {vendor && (
          <>
            <Heading
              mainTitle={vendor.name || ''}
              subTitle={`Checkout tasty meals from us at ${vendor.name}`}
              center
              home
            />
            <VendorCard
              large
              name={vendor.name}
              email={vendor.email}
              image={vendor.image}
              role={vendor.role}
              address={vendor.address}
              state={vendor.state}
              postalCode={vendor.postalCode}
              phoneNumber={vendor.phoneNumber}
            />
            {vendor?.categories.map((cat: Category) => (
              <div className="mt-8" key={cat.id}>
                <Heading mainTitle={cat?.categoryName || ''} center />
                <div className="w-full flex gap-3 flex-wrap justify-center mt-5">
                  {(cat as CategoryWithMenuItems).menuItems?.map((menuItem) => (
                    <MenuCard
                      key={menuItem.id}
                      name={menuItem.menuItemName}
                      desc={menuItem.description}
                      price={menuItem.price}
                      vendor={{
                        name: (menuItem as MenuItemsWithUser)?.user?.name || '',
                      }}
                      image={menuItem.image}
                      home
                      onClick={() => {
                        const vendorName = (menuItem as MenuItemsWithUser).user
                          ?.name;
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
                          vendor: vendorName,
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
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default VendorPage;
