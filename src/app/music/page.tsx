
'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const musicList = [
  {
    title: "موزیک بیکلام",
    artist: "هنرمند ۱",
    url: "/music/sample1.mp3",
  },
  {
    title: "آهنگ شاد",
    artist: "هنرمند ۲",
    url: "/music/sample2.mp3",
  },
  {
    title: "قطعه کلاسیک",
    artist: "هنرمند ۳",
    url: "/music/sample3.mp3",
  },
];

export default function MusicPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/musicbg/1920/1080')" }}
      data-ai-hint="music abstract"
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

        <main className="flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              موزیک های دکه
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              از شنیدن موزیک‌های منتخب دکه ابوعلی لذت ببرید.
            </p>
          </div>

          <div className="mt-8 w-full max-w-2xl space-y-4">
            {musicList.map((music, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm text-right">
                <CardHeader>
                  <CardTitle>{music.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{music.artist}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <audio controls className="w-full sm:w-auto flex-grow">
                      <source src={music.url} type="audio/mpeg" />
                      مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
                    </audio>
                    <Button asChild variant="outline">
                      <a href={music.url} download>
                        <Download className="ml-2 h-4 w-4" />
                        دانلود
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2024 دکه ابوعلی. تمام حقوق محفوظ است.
          </p>
        </footer>
      </div>
    </div>
  );
}
