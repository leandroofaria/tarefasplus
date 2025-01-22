"use client";

import Header from '@/components/header';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <SessionProvider>
      <html lang="pt-br">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
