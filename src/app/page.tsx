
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Flame, Music, MessageSquareQuote } from "lucide-react";
import Link from 'next/link';

const menuItems = [
  { name: 'چای', price: '50,000' },
  { name: 'چای زعفرانی', price: '70,000' },
  { name: 'چای ابوعلی', price: '70,000' },
  { name: 'دمنوش آرامش', price: '70,000' },
  { name: 'چای کرک', price: '110,000' },
  { name: 'چای ماسالا', price: '110,000' },
  { name: 'کاپوچینو', price: '90,000' },
  { name: 'هات چاکلت', price: '90,000' },
  { name: 'شیر پسته زعفرانی', price: '110,000' },
  { name: 'شیر داغ', price: '65,000' },
  { name: 'شیر چای', price: '70,000' },
  { name: 'کلوچه', price: '55,000' },
  { name: 'قهوه دله', price: '50,000' },
  { name: 'خرما', price: '20,000' },
  { name: 'ساندویچ سرد', price: '150,000' },
  { name: 'باقلوا', price: '20,000' },
  { name: 'کیک', price: '90,000' },
];


export default function Home() {
  const gradientButtonClasses = "bg-gradient-to-b from-primary/80 to-primary text-primary-foreground hover:from-primary/90 hover:to-primary/90";

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/chai/1920/1080')" }}
      data-ai-hint="campfire tea"
    >
      <div className="flex min-h-screen w-full flex-col bg-black/60">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
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
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">منو</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 pt-4">
                <nav className="mt-4 flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium">خانه</Link>
                  <Link href="/guestbook" className="text-lg font-medium">دلنوشته</Link>
                  <Link href="/kindness-plan" className="text-lg font-medium">طرح مهربانی</Link>
                  <Link href="/music" className="text-lg font-medium">موزیک های دکه</Link>
                  <Link href="/address" className="text-lg font-medium">آدرس</Link>
                  <Link href="/about" className="text-lg font-medium">درباره ما</Link>
                  <Link href="/admin" className="text-lg font-medium">پنل مدیریت</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center space-y-8 p-4 text-center sm:p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              چای آتشی در قلب شیراز
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
              تجربه اصیل چای آتشی و دمنوش‌های گیاهی در فضایی گرم و دوستانه. به دکه ابوعلی خوش آمدید.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg">
             <Sheet>
                <SheetTrigger asChild>
                    <Button size="lg" className={`w-full sm:w-auto ${gradientButtonClasses}`}>منو</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="w-full max-w-full sm:max-w-[500px] h-3/4 mx-auto bg-background/80 backdrop-blur-lg rounded-t-2xl border-t-2 border-primary/50">
                    <SheetHeader>
                        <SheetTitle className="text-3xl text-center text-primary">منو</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 max-h-[calc(100%-4rem)] overflow-y-auto pr-2 mt-4 custom-scrollbar">
                        {menuItems.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 text-lg">
                            <div className="flex items-center gap-2 flex-shrink-0 text-right">
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="flex-1 border-b-2 border-dotted border-muted-foreground/50 mx-2"></div>
                            <span className="font-semibold text-primary text-left whitespace-nowrap">{item.price} تومان</span>
                          </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Button asChild size="lg" className={`w-full sm:w-auto ${gradientButtonClasses}`}>
                <Link href="/address">آدرس</Link>
            </Button>
             <Button asChild size="lg" className={`w-full sm:w-auto ${gradientButtonClasses}`}>
                <Link href="/kindness-plan">طرح مهربانی</Link>
            </Button>
            <Button asChild size="lg" className={`w-full sm:w-auto ${gradientButtonClasses}`}>
                <Link href="/music" className="flex items-center gap-2">
                    <Music />
                    موزیک های دکه
                </Link>
            </Button>
          </div>
        </main>
        
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2024 دکه ابوعلی. تمام حقوق محفوظ است.
          </p>
        </footer>

        <Button
          asChild
          className="fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
          aria-label="ثبت دلنوشته"
        >
          <Link href="/guestbook">
            <MessageSquareQuote className="h-7 w-7" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
