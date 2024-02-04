'use client';

import React, { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Input from '@/components/Input';
import Button from '@/components/buttons/Button';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // After verification
  const searchParams = useSearchParams();
  const paramsToken = searchParams?.get('token') as string;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passReset = useCallback(async () => {
    // Validation
    if (!email) {
      return toast.error('Please enter an email');
    }

    try {
      setIsLoading(true);
      await axios
        .post('/api/pass-reset', { email })
        .then((res: AxiosResponse) => {
          if (res.data === 'Please enter a registered email') {
            return toast.error(res.data);
          }
          return toast.success(res.data);
        });

      setIsLoading(false);
      setEmail('');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [email]);

  const passSubmit = useCallback(async () => {
    // validation
    if (!password || !confirmPassword) {
      return toast.error('Please fill all fields');
    }
    if (password.length < 6) {
      return toast.error('Minimum password length is 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setIsLoading(true);
      await axios
        .put('/api/pass-reset', {
          password,
          confirmPassword,
          token: paramsToken,
        })
        .then((res: AxiosResponse) => {
          if (res.data === 'Invalid token!') {
            return toast.error(res.data);
          }
          toast.success(res.data);
          router.push('/profile');
        });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [password, confirmPassword, paramsToken, router]);

  return (
    <Container>
      <div className="mx-auto max-w-lg bg-gray-200 shadow-md rounded-lg mt-8 py-5 px-3 flex flex-col gap-3">
        <Heading
          mainTitle={
            paramsToken ? 'Choose a New Password' : 'Reset your Password'
          }
          subTitle={
            paramsToken
              ? "Let's secure your account again"
              : 'We will send you an email to reset password'
          }
        />

        <Input
          id={paramsToken ? 'password' : 'email'}
          value={paramsToken ? password : email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            paramsToken ? setPassword(e.target.value) : setEmail(e.target.value)
          }
          label={paramsToken ? 'Password' : 'Enter valid email'}
          type={paramsToken ? 'password' : 'email'}
          disabled={isLoading}
        />
        {paramsToken && (
          <Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            label="Confirm password"
            type="password"
            disabled={isLoading}
          />
        )}
        <div className="flex flex-col mt-2 gap-2">
          <Button
            label={paramsToken ? 'Update Password' : 'Send Email'}
            onClick={paramsToken ? passSubmit : passReset}
            disabled={isLoading}
          />
          {!paramsToken && (
            <Button
              label="Back to Login"
              outline
              onClick={() => router.push('/login')}
              disabled={isLoading}
            />
          )}{' '}
        </div>
      </div>
    </Container>
  );
};

export default PasswordReset;
