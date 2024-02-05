'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';

import Button from '@/components/buttons/Button';
import Container from '@/components/Container';
import Input from '@/components/inputs/Input';
import UserTabs from '@/components/user/UserTabs';
import { Category } from '@prisma/client';
import Loader from '@/components/Loader';
import ConfirmDelBtn from '@/components/buttons/ConfirmDelBtn';
import RestrictedPage from '@/components/user/RestrictedPage';

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [role, setRole] = useState<null | string>(null);

  // get all categories
  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get('/api/categories').then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitCategoryName = useCallback(async () => {
    try {
      const submitCatNamePromise = new Promise(async (resolve, reject) => {
        if (selectedCatId && updateMode) {
          const res = await axios.put(`/api/categories/${selectedCatId}`, {
            categoryName,
          });
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject();
          }

          toast.promise(submitCatNamePromise, {
            loading: 'Updating category',
            success: 'Category updated',
            error: 'Something went wrong!',
          });
          setUpdateMode(false);
        } else {
          const res = await axios.post('/api/categories', { categoryName });
          if (res.data) {
            resolve(res.data);
          } else {
            reject();
          }

          toast.promise(submitCatNamePromise, {
            loading: 'Adding new category',
            success: 'Category added',
            error: 'Something went wrong!',
          });
        }
        setCategoryName('');
        getCategories();
      });
    } catch (error) {
      toast.error('You are not an VENDOR');
      console.log(error);
    }
  }, [categoryName, selectedCatId, updateMode, getCategories]);

  const deleteCategoryName = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/api/categories/${id}`);
        toast.success('Category deleted');
        getCategories();
      } catch (error) {
        toast.error('Something went wrong!');
      }
    },
    [getCategories]
  );

  const editCategoryName = useCallback((id: string, name: string) => {
    setUpdateMode(true);
    setCategoryName(name);
    setSelectedCatId(id);
  }, []);

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get('/api/profile').then((res: AxiosResponse) => {
        const userData = res.data;

        setRole(userData?.role);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
    getCategories();
  }, [getCategories, getCurrentUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (role !== 'VENDOR') {
    return <RestrictedPage role={role} />;
  }
  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
        <UserTabs role={role} />
        <div className="w-[80%] mt-8 bg-neutral-200 p-10 rounded-lg">
          <div className="flex gap-3">
            <Input
              id="category"
              value={categoryName}
              onChange={(e: any) => setCategoryName(e.target.value)}
              label="Enter a category"
            />
            <Button
              label={updateMode ? 'Update' : 'Add'}
              addBtn
              onClick={submitCategoryName}
            />
          </div>
          <h2 className="mt-3 mb-1 text-sm">Available categories</h2>
          {/* CATEGORIES */}
          <div className="flex flex-col gap-3 ">
            {categories.map((cat: Category) => (
              <div key={cat.id} className="flex gap-3 items-center">
                <span
                  onClick={() =>
                    editCategoryName(cat.id, cat.categoryName || '')
                  }
                  className="flex-1 border border-black bg-white rounded-md p-2 cursor-pointer"
                >
                  {cat.categoryName}
                </span>

                <div className="block">
                  <ConfirmDelBtn
                    label="x"
                    onDelete={() => deleteCategoryName(cat.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoriesPage;
