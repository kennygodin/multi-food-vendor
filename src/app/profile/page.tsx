'use client';

import Container from '@/components/Container';
import Button from '@/components/buttons/Button';
import UserTabs from '@/components/user/UserTabs';
import ImageInput from '@/components/inputs/ImageInput';
import Loader from '@/components/Loader';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import ProfileDetails from '@/components/inputs/ProfileDetails';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<null | string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<null | string>(null);

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
        setIsLoading(false);
      }
    }
    getCurrentUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-4 md:mt-8 flex flex-col items-center">
        <UserTabs role={role} />
        <div className="w-full md:w-[80%] mt-4 md:mt-8 bg-neutral-200 p-5 md:p-10 rounded-lg">
          <div className="flex flex-col md:flex-row items-start gap-3 mb-2">
            <div className="flex flex-col gap-1">
              <ImageInput link={image} setLink={setImage} />
            </div>
            <ProfileDetails
              profile
              name={name}
              email={email}
              address={address}
              postalCode={postalCode}
              state={state}
              phoneNumber={phoneNumber}
              country={country}
              setName={setName}
              setEmail={setEmail}
              setAddress={setAddress}
              setPhoneNumber={setPhoneNumber}
              setState={setState}
              setCountry={setCountry}
              setPostalCode={setPostalCode}
            />
          </div>
          <Button label="Update user profile" onClick={updateProfile} />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
