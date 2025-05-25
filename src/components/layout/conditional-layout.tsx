'use client';

import { usePathname } from 'next/navigation';
import NavBar from './nav';


export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuxPage = pathname.includes('/about') || 
                     pathname.includes('/contact'); 
                     
                   

  return (
    <>
      {!isAuxPage && <NavBar />}
      <main className="flex-grow">{children}</main>

    </>
  );
}
