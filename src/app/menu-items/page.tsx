'use client';

import Avatar from '@/components/Avatar';
import Container from '@/components/Container';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import UserTabs from '@/components/user/UserTabs';
import axios from 'axios';
import Loader from '@/components/Loader';
import { Category } from '@prisma/client';
import ImageInput from '@/components/inputs/ImageInput';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const MenuItemsPage = () => {
  const [menuItemName, setMenuItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<null | string>('');
  const [price, setPrice] = useState<number | null>(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    }
  }, [menuItemName, description, price, image, selectedOption]);

  const handleSelectChange = useCallback((e: any) => {
    setSelectedOption(e.target.value);
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        setIsLoading(true);
        await axios.get('/api/categories').then((res) => {
          setCategories(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto flex flex-col items-center mt-8">
        <UserTabs role={'VENDOR'} />
        <div className="w-[80%] mt-8 bg-neutral-200 p-10 rounded-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex flex-col gap-1">
              <ImageInput link={image} setLink={setImage} />
            </div>
            <div className="grow flex flex-col gap-3">
              <Input
                id="menuItemName"
                value={menuItemName}
                onChange={(e: any) => setMenuItemName(e.target.value)}
                label="Menu name"
              />
              <Input
                id="description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                label="Short description of menu"
              />
              <Input
                id="price"
                value={price === null ? '' : String(price)}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  setPrice(inputValue === '' ? null : parseInt(inputValue, 10));
                }}
                label="Menu price"
              />

              <select
                className="p-2 rounded-md"
                id="category"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="">Select category</option>
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <Button label={'Add menu'} addBtn onClick={submitMenuItemName} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MenuItemsPage;
