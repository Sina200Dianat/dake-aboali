
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame } from "lucide-react";
import Link from "next/link";

export default function KindnessPlanPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/hotdrink/1920/1080')" }}
      data-ai-hint="hot drink"
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
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              طرح مهربانی
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              در طرح مهربانی، شما می‌توانید یک یا چند محصول را برای نیازمندان مهمان دکه ابوعلی باشید.
            </p>
          </div>

          <Card className="w-full max-w-md mx-auto mt-8 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">مشارکت در طرح</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-card-foreground">
                برای سهیم شدن در این کار خیر، می‌توانید مبلغ دلخواه خود را به شماره کارت زیر واریز نمایید:
              </p>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p dir="ltr" className="text-2xl font-mono tracking-widest text-center text-primary">
                  6063-7311-8905-8861
                </p>
                <p className="mt-2 text-center text-muted-foreground">
                  به نام موسی محمودی
                </p>
              </div>
              <Button size="lg" className="w-full">
                کپی شماره کارت
              </Button>
            </CardContent>
          </Card>
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
