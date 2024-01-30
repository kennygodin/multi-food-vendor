'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Button from '@/components/Button';

interface verifyResponse {
  data: string;
}

const VerifyUser = () => {
  const searchParams = useSearchParams();
  const paramsToken = searchParams?.get('token') as string;
  const router = useRouter();

  const [verifyData, setVerifiedData] = useState('');

  useEffect(() => {
    async function verifyUser() {
      await axios
        .post<verifyResponse>('/api/register', { token: paramsToken })
        .then((res: AxiosResponse) => {
          // console.log(res);
          setVerifiedData(res.data);
        })
        .catch((error: any) => {
          console.error('Error', error);
        });
    }

    verifyUser();
  }, [paramsToken]);

  return (
    <Container>
      {verifyData && (
        <div className="max-w-xl mx-auto bg-gray-200 shadow-md rounded-lg py-5 px-3 mt-8 flex flex-col gap-3">
          <Heading
            mainTitle={verifyData}
            subTitle={
              verifyData === 'Invalid token!' || 'Tokens not found!'
                ? 'Something went wrong. Please register again.'
                : 'Please log into your account.'
            }
            center
          />
          <Button
            label={
              verifyData === 'Invalid token!' || 'Tokens not found!'
                ? 'Register'
                : 'Login'
            }
            onClick={
              verifyData === 'Invalid token!'
                ? () => router.push('/register')
                : () => router.push('/login')
            }
          />
        </div>
      )}
    </Container>
  );
};

export default VerifyUser;
