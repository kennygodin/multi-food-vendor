'use client';

import Container from '@/components/Container';
import Input from '@/components/Input';
import Avatar from '@/components/Avatar';
import Button from '@/components/buttons/Button';
import UserTabs from '@/components/user/UserTabs';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '@/components/Loader';
import Image from 'next/image';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<null | string>(null);

  const handleImageChange = useCallback(async (e: any) => {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', 'multi-food-vendor');

    try {
      const imageUploadPromise = new Promise(async (resolve, reject) => {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/kencodin/image/upload',
          formData
        );

        const imageLink = res.data?.secure_url;
        if (imageLink) {
          setImage(imageLink);
          resolve(imageLink);
        } else {
          reject();
        }

        toast.promise(imageUploadPromise, {
          loading: 'Uploading image',
          success: 'Image uploaded',
          error: 'Something went wrong!',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateProfile = useCallback(() => {
    try {
      const updatePromise = new Promise(async (resolve, reject) => {
        const res = await axios.put('/api/profile', {
          name,
          email,
          image,
          phoneNumber,
          address,
          state,
          country,
          postalCode,
        });

        if (res.data) {
          resolve(res.data);
        } else {
          reject();
        }
      });

      toast.promise(updatePromise, {
        loading: 'Updating profile',
        success: 'Profile updated',
        error: 'Something went wrong!',
      });
    } catch (error) {
      console.log(error);
    }
  }, [name, email, image, phoneNumber, address, state, country, postalCode]);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      try {
        await axios.get('/api/profile').then((res: AxiosResponse) => {
          const userData = res.data;
          setName(userData?.name);
          setEmail(userData?.email);
          setImage(userData?.image);
          setAddress(userData?.address);
          setPhoneNumber(userData?.phoneNumber);
          setState(userData?.state);
          setCountry(userData?.country);
          setPostalCode(userData?.postalCode);
          setRole(userData?.role);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
        <UserTabs role={role} />
        <div className="w-[80%] mt-8 bg-neutral-200 p-10 rounded-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex flex-col gap-1">
              <Avatar image={image} tab />
              <label className="flex items-center justify-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="bg-white border-black rounded-lg text-black p-1 text-sm font-light  hover:opacity-80 transition w-full border cursor-pointer text-center">
                  Edit image
                </span>
              </label>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input
                id="name"
                label="Name or Business name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Input
                id="email"
                label="Email or Admin email"
                disabled
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id="phoneNumber"
                label="Phone number"
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
              <Input
                id="address"
                label="Address"
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
              />
              <Input
                id="state"
                label="State"
                value={state}
                onChange={(e: any) => setState(e.target.value)}
              />

              <div className="flex gap-2">
                <Input
                  id="country"
                  label="Country"
                  value={country}
                  onChange={(e: any) => setCountry(e.target.value)}
                />
                <Input
                  id="postal code"
                  label="Postal code"
                  value={postalCode}
                  onChange={(e: any) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button label="Update user profile" onClick={updateProfile} />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
