'use client';

import { useSession } from 'next-auth/react';

import Container from '@/components/Container';
import Input from '@/components/Input';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import UserTabs from '@/components/user/UserTabs';

import { useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  useEffect(() => {
    async function getCurrentUser() {
      try {
        await axios.get('/api/profile').then((res) => {
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, []);

  const { data, status } = useSession();
  console.log(data);
  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
        <UserTabs />
        <div className="w-[80%] mt-8 bg-neutral-200 p-10 rounded-lg">
          {/* <hr className="bg-black " /> */}
          <div className="flex items-start gap-3 mb-2">
            <div className="flex flex-col gap-1">
              <Avatar tab />
              <Button label="Edit image" outline small />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input id="name" label="Name" value="" onChange={() => {}} />
              <Input id="email" label="Email" value="" onChange={() => {}} />
              <Input
                id="address"
                label="Address"
                value=""
                onChange={() => {}}
              />
              <Input
                id="phoneNumber"
                label="Phone number"
                value=""
                onChange={() => {}}
              />
              <Input
                id="country"
                label="Country"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
          <Button label="Update user profile" />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
