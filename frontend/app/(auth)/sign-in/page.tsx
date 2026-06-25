import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fraunces } from '@/lib/fonts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Learning platform by Heyjong',
};

export default function SignInPage() {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='relative w-full bg-primary overflow-hidden p-16 flex flex-col justify-between'>
        <h4 className={`text-secondary text-2xl font-bold ${fraunces.className}`}>Jong Class</h4>
        <div className='mt-16 '>
          <h1 className={`text-white text-5xl/16 font-bold ${fraunces.className}`}>
            Join Jong Class and start building your real-world portfolio today.
          </h1>
          <p className='text-[#86878B] text-lg mt-8'>
            Master engineering skills through project-based learning and secure positions at industry-leading companies.
          </p>
        </div>
        <div className='bg-white/5 backdrop-blur-2xl border border-border rounded-xl p-8 flex items-start gap-4'>
          <div className='size-12 shrink-0 rounded-full bg-neutral'></div>
          <div className=''>
            <p className='text-white text-base'>
              &quot;The portfolio-first approach at Jong Class changed my career trajectory. I went from tutorial hell
              to building production-ready apps that got me hired.&quot;
            </p>
            <p className='mt-2 font-semibold text-secondary'>Mahdy Mubasyir, Fullstack Developer at GoTo</p>
          </div>
        </div>
        <div className='absolute size-72 rounded-full bg-white/20 blur-[96px] -top-32 -left-32'></div>
        <div className='absolute size-72 rounded-full bg-tertiary/20 blur-[96px] -bottom-32 -right-32'></div>
      </div>
      <div className='bg-[#F8F9FF] w-full h-full overflow-hidden p-16 flex flex-col justify-between'>
        <div className=''>
          <h2 className='xl:text-4xl text-primary font-bold'>Selamat Datang</h2>
          <p className='mt-2 text-base text-[#45474A]'>Sign in to continue your learning journey.</p>
        </div>
        <div className='mt-10'>
          <form>
            <button
              type='submit'
              className='flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-white/10 px-6 backdrop-blur-3xl transition-all hover:bg-white/20'
            >
              <Image src={`/icons/google.svg`} width={20} height={20} alt='google' className='size-5' />
              <p className='text-sm font-semibold text-primary'>Masuk dengan Google</p>
            </button>
          </form>
          <div className='my-6 flex items-center gap-4'>
            <div className='grow border-t-2 border-border'></div>
            <p className='text-xs uppercase text-[#45474A] font-medium'>atau masuk dengan email</p>
            <div className='grow border-t-2 border-border'></div>
          </div>
          <form className='mt-8 space-y-5'>
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-primary'>Email</Label>
              <Input type='email' placeholder='Masukkan email' />
            </div>
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-primary'>Password</Label>
              <Input type='password' placeholder='******' />
            </div>
            <div className=''>
              <Button variant={'secondary'} className='w-full cursor-pointer'>
                Masuk
              </Button>
            </div>
          </form>
          <div className='mt-6'>
            <p className='text-base text-primary text-center'>
              Belum punya akun?{' '}
              <Link href={`/sign-up`} className='text-secondary font-medium'>
                Registrasi Akun
              </Link>
            </p>
          </div>
        </div>
        <div className='mt-12 flex items-center justify-center gap-4'>
          <Link href={`#`}>
            <p className='text-[#74777E] font-bold text-xs'>Syarat Layanan</p>
          </Link>
          <Link href={`#`}>
            <p className='text-[#74777E] font-bold text-xs'>Kebijkan Privasi</p>
          </Link>
          <Link href={`#`}>
            <p className='text-[#74777E] font-bold text-xs'>Kontak Support</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
