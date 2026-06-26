import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

interface CourseCardProps {
  id: string;
  price: number;
  title: string;
  mentorId: string;
  rating: number;
}

export default function CourseCard({ id, price = 0, title, mentorId, rating }: CourseCardProps) {
  return (
    <div className='rounded-lg overflow-hidden'>
      <div className='relative bg-gray-400 w-full h-48'>
        <div
          id='badge-price'
          className={`absolute top-4 left-4 w-fit text-white font-medium text-xs py-1 px-2 rounded ${price === 0 ? 'bg-secondary uppercase' : 'bg-primary'}`}
        >
          {price === 0 ? 'Free' : `${price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}
        </div>
      </div>
      <div className='bg-white p-6 space-y-4'>
        <div className='flex items-center gap-2'>
          <Image src={`/icons/star.svg`} width={20} height={20} alt='star' className='size-3.5' />
          <p className='text-gray-text text-xs font-medium'>{rating} (2.4k reviews)</p>
        </div>
        <p className='text-lg text-primary line-clamp-2 h-[2lh] font-semibold'>{title}</p>
        <div className='flex items-center gap-3'>
          <div className='size-6 bg-gray-400 rounded-full'></div>
          <p className='text-sm font-semibold text-gray-text'>{mentorId}</p>
        </div>
        {price === 0 ? (
          <Button variant={'secondary'} className='w-full'>
            Claim Class
          </Button>
        ) : (
          <Button variant={'default'} className='w-full'>
            Learn Now
          </Button>
        )}
      </div>
    </div>
  );
}
