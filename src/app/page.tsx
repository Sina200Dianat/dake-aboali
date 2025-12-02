
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

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
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              وب‌استارت
            </h1>
          </div>
          <Button>شروع کنید</Button>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs sm:max-w-md">
            <Button size="lg" className="w-full sm:w-auto">اقدام اصلی</Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              اقدام ثانویه
            </Button>
          </div>
          <div className="w-full max-w-5xl pt-8">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>آماده برای PWA</CardTitle>
                  <CardDescription>
                    به‌صورت پیش‌فرض به‌عنوان یک برنامه وب پیش‌رونده پیکربندی شده است.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">شامل یک فایل مانیفست با نمایش مستقل و URL شروع پیکربندی شده است.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>استایل‌دهی مدرن</CardTitle>
                  <CardDescription>
                    با زیبایی‌شناسی تمیز و مینیمال با استفاده از Tailwind CSS و shadcn/ui استایل‌دهی شده است.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">تم سفارشی با پس‌زمینه زغالی تیره و متن طلایی/سفید با کنتراست بالا.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <footer className="flex h-16 items-center justify-center border-t border-white/10 bg-transparent px-4 backdrop-blur-sm sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} وب‌استارت. تمام حقوق محفوظ است.
          </p>
        </footer>
      </div>
    </div>
  );
}
