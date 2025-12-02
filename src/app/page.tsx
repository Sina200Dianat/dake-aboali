
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Flame, Share2 } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'دکه ابوعلی | PWA چای آتیشی شیراز',
          text: 'طعم اصیل چای آتشی در شیراز را با دکه ابوعلی تجربه کنید!',
          url: window.location.href,
        });
        toast({ title: "اشتراک‌گذاری موفق بود!" });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Error sharing:', error);
            toast({
              variant: "destructive",
              title: "خطا در اشتراک‌گذاری",
              description: "مشکلی در هنگام اشتراک‌گذاری پیش آمد.",
            });
        }
      }
    } else {
      toast({
        variant: "destructive",
        title: "اشتراک‌گذاری پشتیبانی نمی‌شود",
        description: "مرورگر شما از قابلیت اشتراک‌گذاری پشتیبانی نمی‌کند.",
      });
    }
  };

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
                  <Link href="/kindness-plan" className="text-lg font-medium">طرح مهربانی</Link>
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
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm sm:max-w-md">
             <Sheet>
                <SheetTrigger asChild>
                    <Button size="lg" className="w-full sm:w-auto">منو</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="w-full max-w-full sm:max-w-[500px] h-3/4 mx-auto bg-background/80 backdrop-blur-lg rounded-t-2xl border-t-2 border-primary/50">
                    <SheetHeader>
                        <SheetTitle className="text-3xl text-center text-primary">منو</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 max-h-[calc(100%-4rem)] overflow-y-auto pr-2 mt-4">
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
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/address">آدرس</Link>
            </Button>
             <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary/50 hover:bg-primary/10">
                <Link href="/kindness-plan">طرح مهربانی</Link>
            </Button>
          </div>
        </main>
        
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2024 دکه ابوعلی. تمام حقوق محفوظ است.
          </p>
        </footer>

        <Button
          onClick={handleShare}
          className="fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
          aria-label="اشتراک گذاری"
        >
          <Share2 className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
