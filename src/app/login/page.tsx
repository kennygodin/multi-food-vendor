'use client';

import Button from '@/components/buttons/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Input from '@/components/inputs/Input';

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
        return toast.error(res?.error);
      }
      toast.success('User logged in');
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  return (
    <Container>
      <div className="max-w-xl mx-auto bg-gray-200 shadow-md rounded-lg mt-8 p-5 flex flex-col gap-2">
        <Heading
          mainTitle="Welcome back"
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

        <div className="mt-2 flex flex-col gap-2">
          <Button
            label="Sign in with Google"
            outline
            icon={FcGoogle}
            disabled={isLoading}
            // onClick={() => signIn('google')}
          />
          <Button label="Login" onClick={login} disabled={isLoading} />
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 text-sm">
          <span>Forgot password?</span>
          <Link href="/pass-reset" className="underline">
            Click here to reset password
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
