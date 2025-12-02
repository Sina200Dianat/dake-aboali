import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'دکه ابوعلی | PWA چای آتیشی شیراز',
  description: 'دکه ابوعلی، تجربه اصیل چای آتشی در شیراز. طعم سنت و صمیمیت را با ما در یک برنامه وب پیش‌رونده (PWA) مدرن تجربه کنید.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <meta name="theme-color" content="#121212" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${vazirmatn.className} font-body antialiased page-transition`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
