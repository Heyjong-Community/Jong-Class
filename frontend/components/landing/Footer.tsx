import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full bg-primary py-24 px-6'>
      <div className='container mx-auto flex flex-col md:flex-row items-start justify-between gap-10'>
        <div className=''>
          <h2 className='text-secondary font-bold text-2xl'>Jong Class</h2>
          <p className='mt-6 text-base text-gray-text w-full lg:w-1/2'>
            High-end technical education platform for the next generation of engineers and tech leaders.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          <div className=''>
            <p className='text-white font-semibold text-base'>Navigation</p>
            <div className='mt-6 space-y-4'>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Kategori</p>
              </Link>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Semua Kelas</p>
              </Link>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Alur Belajar</p>
              </Link>
            </div>
          </div>
          <div className=''>
            <p className='text-white font-semibold text-base'>Resource</p>
            <div className='mt-6 space-y-4'>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Privacy Policy</p>
              </Link>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Terms of Service</p>
              </Link>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Help Center</p>
              </Link>
              <Link href={`#`} className='block'>
                <p className='text-base text-gray-text'>Career Mentor</p>
              </Link>
            </div>
          </div>
          <div className=''>
            <p className='text-white font-semibold text-base'>Connect</p>
            <p className='mt-6 text-base text-gray-text'>&copy; 2026 Jong Class. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
