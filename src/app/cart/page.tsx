'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ProfileDetails from '@/components/inputs/ProfileDetails';
import CartProduct from '@/components/cart/CartProduct';
import { useCartStore } from '@/utils/store';
import ConfirmDelBtn from '@/components/buttons/ConfirmDelBtn';
import Loader from '@/components/Loader';

const CartPage = () => {
  const { cartProducts, removeFromCart, totalItems, totalPrice, clearCart } =
    useCartStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;

  // Paystack components
  const componentProps = {
    email,
    amount: totalPrice * 100,
    firstname: name,
    phone: phoneNumber,
    publicKey: PAYSTACK_PUBLIC_KEY,
    text: `Pay ₦ ${totalPrice + 500}`,
    onSuccess: (transaction: any) => {
      const reference = transaction.reference;
      verifyTransactionAndCreateOrder(reference);
    },
    onClose: () => toast.error('Transaction cancelled!'),
  };

  const verifyTransactionAndCreateOrder = useCallback(
    async (reference: string) => {
      setIsLoading(true);
      try {
        await axios.post('/api/orders', {
          name,
          email,
          phoneNumber,
          address,
          state,
          country,
          postalCode,
          cartProducts,
          reference,
        });
        toast.success('Your order has been placed.');
        clearCart();
        setIsLoading(false);
        return router.push('/orders');
      } catch (error) {
        console.log(error);
        toast.error('Transaction failed!');
        setIsLoading(false);
      }
    },
    [
      name,
      email,
      phoneNumber,
      address,
      state,
      country,
      postalCode,
      cartProducts,
      clearCart,
      router,
    ]
  );

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get('/api/profile').then((res: AxiosResponse) => {
        const userData = res.data;
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setAddress(userData.address);
        setState(userData.state);
        setCountry(userData.country);
        setPostalCode(userData.postalCode);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (totalItems < 1) {
    return (
      <div className="mt-8">
        <Heading
          mainTitle="Your Cart is Empty"
          subTitle="Explore our delicious offerings and add items to your cart."
          center
          home
        />
      </div>
    );
  }

  return (
    <Container>
      <div className="mt-8 max-w-6xl mx-auto px-2 ">
        <Heading mainTitle="Your Cart Page" home center />
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-4 md:p-5 item-start">
          {/* ITEMS */}
          <div className="basis-2/3 flex flex-col gap-2">
            {cartProducts.map((item) => (
              <CartProduct
                key={item.id}
                name={item.menuItemName}
                desc={item.description}
                price={item.price}
                vendor={item.vendor}
                image={item.image}
                onDelete={() => removeFromCart(item)}
              />
            ))}
            <hr className="bg-black h-[1px] my-2" />
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-semibold">
                    Subtotal ({totalItems} items):
                  </span>
                  <span>₦ {totalPrice}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-semibold"> Delivery: </span>
                  <span>₦ 500</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-semibold"> Total:</span>
                  <span>₦ {totalPrice + 500}</span>
                </div>
              </div>
              <ConfirmDelBtn label="Clear cart" onDelete={clearCart} />
            </div>
          </div>
          {/* CHECKOUT */}
          <div className="basis-1/3 bg-neutral-200 p-5 rounded-md flex flex-col gap-2">
            <Heading mainTitle="Delivery Details" center />
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
            />
            <PaystackButton
              className="bg-green-500 border-white text-white py-2 rounded-lg hover:opacity-80 transition font-semibold text-base"
              {...componentProps}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
