'use client';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Input from '@/components/Input';

import { useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(async () => {
    // validation
    if (!name || !email || !password) {
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
        .post('/api/verify-user', {
          name,
          email,
          role,
          password,
          confirmPassword,
        })
        .then((res: AxiosResponse) => {
          if (res.data === 'Email sent successfully') {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            toast.success(res.data);
          }
          if (res.data === 'Email already registered!') {
            toast.error(res.data);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error('Something went wrong!');
    }
  }, [name, email, role, password, confirmPassword]);
  return (
    <Container>
      <div className="max-w-xl mx-auto bg-gray-200 shadow-md rounded-lg mt-8 py-5 px-5 flex flex-col gap-3">
        <Heading
          mainTitle="Welcome to FoodTroops!"
          subTitle="Embark on a delightful journey of culinary exploration. "
        />
        <div className="flex gap-3">
          <Button
            label="Join as Customer"
            small
            onClick={() => setRole('customer')}
            outline={role === 'customer' ? false : true}
            disabled={isLoading}
          />
          <Button
            label="Join as a Vendor"
            small
            onClick={() => setRole('vendor')}
            outline={role === 'vendor' ? false : true}
            disabled={isLoading}
          />
        </div>
        <Input
          id="name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          label={role === 'customer' ? 'Name' : 'Business Name'}
          type="text"
          disabled={isLoading}
        />
        <Input
          id="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          label={role === 'customer' ? 'Email' : 'Admin Email'}
          type="email"
          disabled={isLoading}
        />
        <Input
          id="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          label="Password"
          type="password"
          disabled={isLoading}
        />
        <Input
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          label="Confirm password"
          type="password"
          disabled={isLoading}
        />

        <Button
          label="Sign in with Google"
          disabled={isLoading}
          outline
          icon={FcGoogle}
        />
        <Button label="Register" onClick={register} disabled={isLoading} />
      </div>
    </Container>
  );
};

export default RegisterPage;
