import { Button } from '@/components/ui/button';
import { fraunces } from '@/lib/fonts';
import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=''>
      <section className='px-6 container mx-auto pt-40 pb-24 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4'>
        <div className=''>
          <div className='bg-slate-200 w-fit rounded-full px-4 py-2 flex items-center gap-2'>
            <CircleCheckBig className='size-4 text-primary' />
            <p className='text-primary text-xs font-medium'>Industry Standard Curriculum</p>
          </div>
          <h1 className={`mt-8.5 text-primary text-5xl/16 font-bold ${fraunces.className}`}>
            Master In-Demand Tech <br /> Skills, <span className='text-secondary'>Build Your Portfolio.</span>
          </h1>
          <p className='mt-8 text-lg text-primary'>
            Accelerate your engineering career with structured learning paths, <br /> real-world project portfolios, and
            direct guidance from industry veterans.
          </p>
          <Button className='mt-8'>Explore All Courses</Button>
        </div>
        <div className='px-16 hidden md:block'>
          <Image src={`/images/head.webp`} width={742} height={490} alt='header' className='rounded-4xl' />
        </div>
      </section>
      <section className='container mx-auto py-12 px-6'>
        <div className=''>
          <h2 className='text-3xl text-center text-primary font-bold'>Why Learn With Us?</h2>
          <p className='mt-4 text-neutral text-base text-center'>
            Designed by engineers, for engineers who want to excel.
          </p>
        </div>
        <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white rounded-lg p-4 lg:p-8 shadow-lg'>
            <div className='size-12 rounded-md shadow-lg'></div>
            <p className='mt-6 text-xl text-primary font-medium'>Structured Syllabus</p>
            <p className='mt-3 text-gray-text'>
              Carefully mapped learning paths to take you from zero to production-ready.
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 lg:p-8 shadow-lg'>
            <div className='size-12 rounded-md shadow-lg'></div>
            <p className='mt-6 text-xl text-primary font-medium'>Lifetime Access</p>
            <p className='mt-3 text-gray-text'>
              Purchase once and access course updates and materials forever at your own pace.
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 lg:p-8 shadow-lg'>
            <div className='size-12 rounded-md shadow-lg'></div>
            <p className='mt-6 text-xl text-primary font-medium'>Automated Certificates</p>
            <p className='mt-3 text-gray-text'>
              Get instant skill verification with blockchain-secured digital credentials.
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 lg:p-8 shadow-lg'>
            <div className='size-12 rounded-md shadow-lg'></div>
            <p className='mt-6 text-xl text-primary font-medium'>Expert Mentors</p>
            <p className='mt-3 text-gray-text'>Get unblocked by mentors working at top-tier global tech companies.</p>
          </div>
        </div>
      </section>
      <section className='container mx-auto py-12 px-6'>
        <div className=''>
          <h2 className='text-3xl text-primary font-bold'>Explore Our Catalog</h2>
          <p className='mt-4 text-neutral text-base'>
            Deep-divce into technical specialities curated for the modern developer ecosystem.
          </p>
        </div>
      </section>
    </div>
  );
}
