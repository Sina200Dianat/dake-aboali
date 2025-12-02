import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'دکه ابوعلی | PWA چای آتیشی شیراز',
  description: 'دکه ابوعلی، تجربه اصیل چای آتشی در شیراز. طعم سنت و صمیمیت را با ما در یک برنامه وب پیش‌رونده (PWA) مدرن تجربه کنید.',
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
