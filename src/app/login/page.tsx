'use client';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Input from '@/components/Input';

import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      setIsLoading(false);
      if (res?.error) {
        toast.error(res?.error);
        return;
      }
      toast.success('User logged in');

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  return (
    <Container>
      <div className="max-w-xl mx-auto bg-gray-200 shadow-md rounded-lg mt-8 py-5 px-3 flex flex-col gap-3">
        <Heading
          mainTitle="Welcome back to FoodTroops"
          subTitle="Log in to continue your culinary adventure"
        />

        <Input
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          label="Email"
          type="email"
          disabled={isLoading}
        />
        <Input
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          label="Password"
          type="password"
          disabled={isLoading}
        />

        <Button
          label="Sign in with Google"
          outline
          icon={FcGoogle}
          disabled={isLoading}
          // onClick={() => signIn('google')}
        />
        <Button label="Login" onClick={login} disabled={isLoading} />

        <div className="flex gap-3">
          <span>Forgot password?</span>
          <Link href="/" className="underline">
            Click here to reset password
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
