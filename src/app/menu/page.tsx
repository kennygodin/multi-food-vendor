'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import MenuCard from '@/components/menu/MenuCard';
import axios, { AxiosResponse } from 'axios';
import { Category, MenuItem, User } from '@prisma/client';
import Loader from '@/components/Loader';
import { useCartStore } from '@/utils/store';

interface CategoryWithMenuItems extends Category {
  menuItems: MenuItem[];
}
interface MenuItemsWithUser extends MenuItem {
  user: { name: string };
}

const MenuPage = () => {
  const { addToCart, currentVendor, setCurrentVendor } = useCartStore();
  const [catMenuItems, setCatMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const menu = pathname.split('/')[1];

  const categories = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get(`/api/categories/${menu}`).then((res: AxiosResponse) => {
        setCatMenuItems(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [menu]);

  useEffect(() => {
    categories();
  }, [categories]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="max-w-4xl mx-auto mt-8">
        <Heading
          mainTitle="Explore Culinary Delights"
          subTitle="Discover a symphony of flavors in every dish, expertly prepared to satisfy you"
          center
          home
        />
        {catMenuItems.map((cat: CategoryWithMenuItems) => (
          <div className="mt-8" key={cat.id}>
            <Heading mainTitle={cat?.categoryName || ''} center />
            <div className="w-full flex gap-3 flex-wrap justify-center mt-5">
              {(cat.menuItems as MenuItemsWithUser[]).map(
                (menuItem: MenuItemsWithUser) => (
                  <MenuCard
                    key={menuItem.id}
                    name={menuItem.menuItemName}
                    desc={menuItem.description}
                    price={menuItem.price}
                    vendor={{ name: menuItem?.user?.name || '' }}
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
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MenuPage;
