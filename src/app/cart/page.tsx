'use client';
import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Avatar from '@/components/Avatar';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ConfirmDelBtn from '@/components/buttons/ConfirmDelBtn';
import ProfileDetails from '@/components/inputs/ProfileDetails';

const CartPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<null | string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = useCallback(async () => {
    try {
      await axios.get('/api/profile').then((res: AxiosResponse) => {
        const userData = res.data;
        setName(userData.name);
        setEmail(userData.email);
        setImage(userData.image);
        setPhoneNumber(userData.phoneNumber);
        setAddress(userData.address);
        setState(userData.state);
        setCountry(userData.country);
        setPostalCode(userData.postalCode);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Container>
      <div className="mt-8 max-w-6xl mx-auto px-2 ">
        <Heading mainTitle="Your Cart Page" home center />
        <div className="flex gap-2 mt-4 p-5">
          {/* ITEMS */}
          <div className="basis-2/3 flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between bg-neutral-200 p-2 rounded-md text-sm">
              <div className="flex gap-2 items-center">
                <Avatar
                  tab
                  image="https://res.cloudinary.com/kencodin/image/upload/v1706231712/multi-food%20vendor/slider6_hm8khs.jpg"
                />
                <div className="flex flex-col">
                  <span>
                    <b>Name:</b> Pepperoni pizza
                  </span>
                  <span>
                    <b>Desc:</b> my delicious pepperoni pizza
                  </span>
                  <span>
                    <b>Price: 2</b>
                  </span>
                  <span>
                    <b>Vendor:</b> Gourmet Delights
                  </span>
                </div>
              </div>

              <ConfirmDelBtn label="X" onDelete={() => {}} />
            </div>
            <div className="flex gap-2 items-center justify-between bg-neutral-200 p-2 rounded-md text-sm">
              <div className="flex gap-2 items-center">
                <Avatar
                  image="https://res.cloudinary.com/kencodin/image/upload/v1706231712/multi-food%20vendor/slider6_hm8khs.jpg"
                  tab
                />
                <div className="flex flex-col">
                  <span>
                    <b>Name:</b> Pepperoni pizza
                  </span>
                  <span>
                    <b>Desc:</b> my delicious pepperoni pizza
                  </span>
                  <span>
                    <b>Price: 2</b>
                  </span>
                  <span>
                    <b>Vendor:</b> Gourmet Delights
                  </span>
                </div>
              </div>

              <ConfirmDelBtn label="X" onDelete={() => {}} />
            </div>
          </div>
          {/* CHECKOUT */}
          <div className="basis-1/3 bg-neutral-200 p-5 rounded-md flex flex-col gap-2">
            <Heading
              mainTitle="Delivery Details"
              subTitle="Ensure your information are correct"
              center
            />
            {/* Profile */}
            <ProfileDetails
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
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
