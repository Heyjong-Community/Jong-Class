'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 w-full z-50 px-16 py-4 flex items-center justify-between ${hasScrolled ? 'bf-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      <div className=''>
        <h1 className='text-2xl font-bold text-secondary'>Jong Class</h1>
      </div>
      <div className='flex items-center gap-8'>
        <Link href={`#`}>
          <p className='text-base font-semibold text-primary'>Kategori</p>
        </Link>
        <Link href={`#`}>
          <p className='text-base font-semibold text-primary'>Semua Kelas</p>
        </Link>
        <Link href={`#`}>
          <p className='text-base font-semibold text-primary'>Alur Belajar</p>
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link href={`#`}>
          <Button size={'sm'} variant={'destructive'} className='rounded-full'>
            Sign Up
          </Button>
        </Link>
        <Link href={`#`}>
          <Button size={'sm'} variant={'secondary'} className='rounded-full'>
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
}
