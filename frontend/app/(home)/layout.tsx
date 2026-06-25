import { plusJakartaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Jong Class',
    template: '%s | Jong Class',
  },
  description: 'Learning platform by Heyjong',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn('h-full', 'antialiased', plusJakartaSans.className)}>
      <body className='relative bg-[#F8F9FF]'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
