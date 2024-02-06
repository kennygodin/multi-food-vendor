'use client';

import Avatar from '@/components/Avatar';
import Container from '@/components/Container';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import UserTabs from '@/components/user/UserTabs';
import axios, { AxiosResponse } from 'axios';
import Loader from '@/components/Loader';
import { Category, MenuItem } from '@prisma/client';
import ImageInput from '@/components/inputs/ImageInput';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import RestrictedPage from '@/components/user/RestrictedPage';
import Heading from '@/components/Heading';
import Image from 'next/image';
import MenuCard from '@/components/menu/MenuCard';
import { IoMdArrowRoundBack } from 'react-icons/io';
import MenuInput from '@/components/menu/MenuInput';

interface MenuItemWithUser extends MenuItem {
  user: { name: string };
}

const MenuItemsPage = () => {
  const [menuItemName, setMenuItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<null | string>('');
  const [price, setPrice] = useState<number | null>(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorName, setVendorName] = useState('');
  const [role, setRole] = useState(null);
  const [addedMode, setAddedMode] = useState(false);

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await axios.get('/api/profile').then((res: AxiosResponse) => {
        const userData = res.data;

        setRole(userData?.role);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/categories').then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/menu-items').then((res) => {
        setMenuItems(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitMenuItemName = useCallback(async () => {
    try {
      const submitItemPromise = new Promise(async (resolve, reject) => {
        const res = await axios.post('/api/menu-items', {
          menuItemName,
          description,
          price,
          image,
          categoryId: selectedOption,
        });
        if (res.status === 201) {
          resolve(res.data);
          setMenuItemName('');
          setDescription('');
          setPrice(null);
          setImage(null);
          setSelectedOption('');
          getMenuItems();
          setAddedMode(true);
        } else {
          reject();
        }
      });
      toast.promise(submitItemPromise, {
        loading: 'Adding menu item',
        success: 'Menu item added',
        error: 'Something went wrong!',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [menuItemName, description, price, image, getMenuItems, selectedOption]);

  useEffect(() => {
    getCurrentUser();
    getCategories();
    getMenuItems();
  }, [getCurrentUser, getCategories, getMenuItems]);

  if (isLoading) {
    return <Loader />;
  }

  if (role !== 'VENDOR') {
    return <RestrictedPage role={role} />;
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto flex flex-col items-center mt-8">
        <UserTabs role={'VENDOR'} />
        <div
          className={`w-[80%] mt-8 ${
            !addedMode && 'bg-neutral-200'
          } p-5 rounded-lg`}
        >
          {addedMode ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-6 mb-4">
                <Heading
                  mainTitle="Your menu items"
                  subTitle="Checkout tasty menu items added"
                />
                <span
                  className="flex gap-1 border-2 rounded-md cursor-pointer py-1 px-2"
                  onClick={() => setAddedMode(false)}
                >
                  <IoMdArrowRoundBack size={20} />
                  Back
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {menuItems.map((item: MenuItemWithUser) => (
                  <MenuCard
                    key={item.id}
                    name={item.menuItemName}
                    desc={item.description}
                    price={item.price}
                    vendor={{ name: item.user.name }}
                    image={item.image}
                    menuItem={item}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <MenuInput
                menuItemName={menuItemName}
                image={image}
                description={description}
                price={price}
                selectedOption={selectedOption}
                setImage={setImage}
                setMenuItemName={setMenuItemName}
                setDescription={setDescription}
                setPrice={setPrice}
                setSelectedOption={setSelectedOption}
                setAddedMode={setAddedMode}
                onClick={submitMenuItemName}
                categories={categories}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MenuItemsPage;
