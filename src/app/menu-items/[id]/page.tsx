'use client';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';

import Container from '@/components/Container';
import MenuInput from '@/components/menu/MenuInput';
import UserTabs from '@/components/user/UserTabs';
import Loader from '@/components/Loader';
import { MenuItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MenuItemPage = () => {
  const itemId = useParams<{ id: string }>();
  const [menuItemName, setMenuItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getMenuItem = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`/api/menu-items/${itemId.id}`)
        .then((res: AxiosResponse) => {
          const data = res?.data;
          setMenuItemName(data.menuItemName);
          setDescription(data.description);
          setPrice(data.price);
          setImage(data.image);
          setCategoryId(data.categoryId);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [itemId]);

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get('/api/categories').then((res: AxiosResponse) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const updateMenuItem = useCallback(async () => {
    try {
      setIsLoading(true);
      const updateMenuItemPromise = new Promise<void>(
        async (resolve, reject) => {
          const res = await axios.put(`/api/menu-items/${itemId.id}`, {
            menuItemName,
            description,
            price,
            image,
            categoryId,
          });
          if (res.data) {
            resolve();
          } else {
            reject();
          }

          toast.promise(updateMenuItemPromise, {
            loading: 'Updating menu item',
            success: 'Menu item updated',
            error: 'Something went wrong!',
          });
          router.push('/menu-items');
        }
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [menuItemName, description, price, image, categoryId, router, itemId.id]);

  useEffect(() => {
    getMenuItem();
    getCategories();
  }, [getMenuItem, getCategories]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
        <UserTabs role={'VENDOR'} />
        <div className="w-[80%] mt-8 bg-neutral-200 p-10 rounded-lg">
          <MenuInput
            image={image}
            menuItemName={menuItemName}
            description={description}
            price={price}
            selectedOption={categoryId}
            setImage={setImage}
            setMenuItemName={setMenuItemName}
            setDescription={setDescription}
            setPrice={setPrice}
            setSelectedOption={setCategoryId}
            categories={categories}
            setAddedMode={() => router.push('/menu-items')}
            onSubmit={updateMenuItem}
            label="Update item"
          />
        </div>
      </div>
    </Container>
  );
};

export default MenuItemPage;
