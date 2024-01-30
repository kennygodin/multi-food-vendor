'use client';
import { SessionProvider } from 'next-auth/react';

export function AppContext({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}
