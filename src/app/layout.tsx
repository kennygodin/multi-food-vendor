import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { AppContext } from '@/components/AppContext';

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
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppContext>
          <Toaster
            containerStyle={{
              fontSize: 14,
            }}
          />
          <Navbar />
          <div className="pt-14">{children}</div>
        </AppContext>
      </body>
    </html>
  );
}
