import { plusJakartaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '../../globals.css';
import SidebarAdmin from '@/components/dashboard/sidebar/SidebarAdmin';
import NavbarDash from '@/components/dashboard/navbar/NavbarDash';

export const metadata: Metadata = {
  title: {
    default: 'Jong Class',
    template: '%s | Jong Class',
  },
  description: 'Learning platform by Heyjong',
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn('antialiased', plusJakartaSans.className)}>
      <body className='flex h-screen w-full items-stretch overflow-hidden'>
        <SidebarAdmin />
        <main className='bg-[#F8F9FF] flex flex-1 flex-col overflow-hidden'>
          <NavbarDash />
          {children}
        </main>
      </body>
    </html>
  );
}
