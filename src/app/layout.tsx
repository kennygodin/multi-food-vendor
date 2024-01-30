import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { AppContext } from '@/components/AppContext';
import getCurrentUser from '@/actions/getCurrentUser';
import { User } from '@prisma/client';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodTroops',
  description: 'FoodTroops, We buy and sell tasty meals!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppContext>
          <Toaster />
          <Navbar currentUser={currentUser} />
          <div className="pt-14">{children}</div>
        </AppContext>
      </body>
    </html>
  );
}
