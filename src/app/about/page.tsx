
'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame, Instagram, Phone, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/tradition/1920/1080')" }}
      data-ai-hint="tradition warmth"
    >
      <div className="flex min-h-screen w-full flex-col bg-black/60 backdrop-blur-sm">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-transparent px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            <h1 className="text-4xl font-bold text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
              دکه ابوعلی
            </h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">بازکردن منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <h2 className="text-2xl font-bold">منو</h2>
                <nav className="mt-4 flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium">خانه</Link>
                  <Link href="/kindness-plan" className="text-lg font-medium">طرح مهربانی</Link>
                  <Link href="/address" className="text-lg font-medium">آدرس</Link>
                  <Link href="/about" className="text-lg font-medium">درباره ما</Link>
                  <Link href="/admin" className="text-lg font-medium">پنل مدیریت</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-6 md:p-8">
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              درباره دکه ابوعلی
            </h2>
            <div className="text-lg text-foreground/90 leading-relaxed space-y-4">
              <p>
                در دل شلوغی‌های شهر، جایی که سنت و مدرنیته به هم می‌رسند، «دکه ابوعلی» پناهگاهی گرم برای دوستداران طعم‌های اصیل ایرانی است. ما با الهام از سنت دیرینه نوشیدن «چای آتشی»، فضایی صمimi و دوستانه را فراهم آورده‌ایم تا لحظاتی سرشار از آرامش و خاطره را برای شما رقم بزنیم.
              </p>
              <p>
                هر فنجان چای در دکه ما، داستانی از آتش، طبیعت و دورهمی‌های گرم ایرانی را روایت می‌کند. ما باور داریم که یک چای خوب می‌تواند پلی باشد میان نسل‌ها و بهانه‌ای برای گفتگوهای دلنشین. به دکه ابوعلی بیایید و طعم واقعی سنت را در کنار ما تجربه کنید.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-md mx-auto space-y-4">
              <h3 className="text-2xl font-semibold">تماس با ما</h3>
              <div className="flex flex-col items-center gap-4 text-lg">
                <Button asChild variant="outline" className="w-full bg-transparent border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground">
                  <a href="https://instagram.com/dake_aboali" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Instagram className="ml-2" />
                    آدرس پیج اینستاگرام
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground">
                  <a href="tel:+989170000000" className="flex items-center justify-center">
                    شماره موبایل موسی محمودی
                    <Phone className="mr-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground">
                  <Link href="/" className="flex items-center justify-center">
                    <Globe className="ml-2" />
                    آدرس سایت دکه ابوعلی
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </main>
        
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} دکه ابوعلی. تمام حقوق محفوظ است.
          </p>
        </footer>
      </div>
    </div>
  );
}
