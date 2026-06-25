import { plusJakartaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jong Class',
    template: '%s | Jong Class',
  },
  description: 'Learning platform by Heyjong',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn('h-full', 'antialiased', plusJakartaSans.className)}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
