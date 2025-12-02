
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Menu, Flame, MessageSquareQuote, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Delneveshte } from '@/lib/types';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase/provider';


const guestbookFormSchema = z.object({
  firstName: z.string().min(2, { message: 'نام باید حداقل ۲ حرف داشته باشد.' }),
  lastName: z.string().min(2, { message: 'نام خانوادگی باید حداقل ۲ حرف داشته باشد.' }),
  message: z.string().min(5, { message: 'پیام باید حداقل ۵ حرف داشته باشد.' }).max(60, { message: 'پیام نمی‌تواند بیشتر از ۶۰ حرف باشد.' }),
});

type GuestbookFormValues = z.infer<typeof guestbookFormSchema>;

export default function GuestbookPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const form = useForm<GuestbookFormValues>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      message: '',
    },
  });

  const delneveshtesRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'delneveshtes_approved') : null),
    [firestore]
  );
  
  const delneveshtesQuery = useMemoFirebase(
    () => (delneveshtesRef ? query(delneveshtesRef, orderBy('approvalDate', 'desc')) : null),
    [delneveshtesRef]
  );
  
  const { data: approvedDelneveshtes, isLoading, error } = useCollection<Delneveshte>(delneveshtesQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
        initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);


  const onSubmit: SubmitHandler<GuestbookFormValues> = async (data) => {
    if (!firestore) return;
    try {
      const pendingCollectionRef = collection(firestore, 'delneveshtes_pending');
      await addDoc(pendingCollectionRef, {
        ...data,
        approved: false,
        submissionDate: new Date().toISOString(),
      });
      toast({
        title: 'پیام شما ارسال شد',
        description: 'دلنوشته شما پس از تایید توسط ادمین، در سایت نمایش داده خواهد شد.',
      });
      form.reset();
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'خطا در ارسال پیام',
        description: e.message,
      });
    }
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/guestbook/1920/1080')" }}
      data-ai-hint="parchment paper"
    >
      <div className="flex min-h-screen w-full flex-col bg-black/70 backdrop-blur-sm">
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

        <main className="flex flex-1 flex-col items-center justify-start p-4 md:p-8 gap-8">
          <div className="text-center space-y-2">
             <MessageSquareQuote className="mx-auto h-12 w-12 text-primary" />
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">دفتر دلنوشته‌ها</h2>
            <p className="text-muted-foreground md:text-xl max-w-2xl">
              یک یادگاری برای ما بنویسید. دلنوشته شما پس از تایید در این صفحه به نمایش در خواهد آمد.
            </p>
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>ثبت دلنوشته جدید</CardTitle>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نام</FormLabel>
                            <FormControl>
                              <Input placeholder="نام شما" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نام خانوادگی</FormLabel>
                            <FormControl>
                              <Input placeholder="نام خانوادگی شما" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>پیام شما (حداکثر ۶۰ کاراکتر)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="یک خاطره یا حس خوب..."
                              maxLength={60}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          در حال ارسال...
                        </>
                      ) : (
                         <>
                          <Send className="ml-2 h-4 w-4" />
                          ارسال دلنوشته
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>

            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center">یادگاری‌های شما</h3>
                {isLoading && <div className="flex justify-center items-center h-48"><Loader2 className="h-10 w-10 animate-spin text-primary"/></div>}
                {error && <p className="text-destructive text-center">خطا در بارگذاری دلنوشته‌ها.</p>}
                {!isLoading && approvedDelneveshtes && (
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 p-2 custom-scrollbar">
                        {approvedDelneveshtes.map((item) => (
                            <Card key={item.id} className="bg-muted/40 backdrop-blur-sm">
                                <CardContent className="p-4">
                                    <blockquote className="border-r-4 border-primary pr-4">
                                        <p className="text-lg italic">"{item.message}"</p>
                                        <footer className="mt-2 text-sm text-muted-foreground">
                                            - {item.firstName} {item.lastName}
                                        </footer>
                                    </blockquote>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
                 {!isLoading && approvedDelneveshtes?.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">
                        <p>هنوز هیچ دلنوشته‌ای ثبت نشده است. اولین نفر باشید!</p>
                    </div>
                )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
