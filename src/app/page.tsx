
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket } from "lucide-react";

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
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/chai/1920/1080')" }}
      data-ai-hint="campfire tea"
    >
      <div className="flex min-h-screen w-full flex-col bg-black/60">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-foreground" />
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
                  <a href="#" className="text-lg font-medium">صفحه اصلی</a>
                  <a href="#" className="text-lg font-medium">درباره ما</a>
                  <a href="#" className="text-lg font-medium">تماس با ما</a>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center space-y-8 p-4 text-center sm:p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              برنامه وب مدرن شما آماده است
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
              این یک برنامه آماده PWA است که با Next.js ساخته شده و با Tailwind CSS استایل‌دهی شده است. تمیز، مینیمال و آماده برای ساختن توسط شما.
            </p>
          </div>
          
          <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">منو</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {menuItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-lg">
                    <span className="font-medium text-right flex-shrink-0">{item.name}</span>
                    <div className="flex-1 border-b-2 border-dotted border-muted-foreground/50 mx-2"></div>
                    <span className="font-semibold text-primary text-left whitespace-nowrap">{item.price} تومان</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs sm:max-w-md">
            <Button size="lg" className="w-full sm:w-auto">اقدام اصلی</Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              اقدام ثانویه
            </Button>
          </div>
        </main>
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} دکه ابوعلی. تمام حقوق محفوظ است.
          </p>
        </footer>
      </div>
    </div>
  );
}
