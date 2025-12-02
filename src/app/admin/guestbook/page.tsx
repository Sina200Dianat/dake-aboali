
'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
  useDoc,
} from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Menu,
  Flame,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  ShieldAlert,
  Inbox,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Delneveshte } from '@/lib/types';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { initiateEmailSignIn, initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase/provider';
import { Input } from '@/components/ui/input';


function AdminGuestbookPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const pendingDelneveshtesRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'delneveshtes_pending') : null),
    [firestore]
  );
  const pendingQuery = useMemoFirebase(
    () => (pendingDelneveshtesRef ? query(pendingDelneveshtesRef, orderBy('submissionDate', 'desc')) : null),
    [pendingDelneveshtesRef]
  );

  const {
    data: pendingData,
    isLoading: isPendingLoading,
    error: pendingError,
  } = useCollection<Delneveshte>(pendingQuery);

  const approvedDelneveshtesRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'delneveshtes_approved') : null),
    [firestore]
  );
  const approvedQuery = useMemoFirebase(
    () => (approvedDelneveshtesRef ? query(approvedDelneveshtesRef, orderBy('approvalDate', 'desc')) : null),
    [approvedDelneveshtesRef]
  );

  const {
    data: approvedData,
    isLoading: isApprovedLoading,
    error: approvedError,
  } = useCollection<Delneveshte>(approvedQuery);
  
  const adminDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'roles_admin', user.uid) : null),
    [user, firestore]
  );
  
  const { data: adminData, isLoading: isAdminLoading, error: adminError } = useDoc(adminDocRef);
  const isAdmin = useMemo(() => !!adminData, [adminData]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);
  
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    initiateEmailSignIn(auth, email, password, (error) => {
      if (error.code === 'auth/invalid-credential') {
        toast({
          variant: 'destructive',
          title: 'خطا در ورود',
          description: 'ایمیل یا رمز عبور وارد شده صحیح نمی‌باشد.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'خطا در ورود',
          description: error.message,
        });
      }
    });
  }

  const handleApprove = async (delneveshte: Delneveshte) => {
    if (!firestore || !user || !isAdmin) return;
    try {
      const batch = writeBatch(firestore);
      const pendingDocRef = doc(firestore, 'delneveshtes_pending', delneveshte.id);
      const approvedDocRef = doc(firestore, 'delneveshtes_approved', delneveshte.id);

      batch.delete(pendingDocRef);
      batch.set(approvedDocRef, {
        ...delneveshte,
        approved: true,
        approvalDate: new Date().toISOString(),
        adminId: user.uid,
      });

      await batch.commit();
      toast({
        title: 'تایید شد',
        description: 'دلنوشته با موفقیت تایید و منتشر شد.',
      });
    } catch (e: any) {
       toast({
        variant: "destructive",
        title: "خطا در تایید",
        description: e.message,
      });
    }
  };

  const handleDelete = (id: string, collectionName: 'delneveshtes_pending' | 'delneveshtes_approved') => {
    if (!firestore || !isAdmin) return;
    const docRef = doc(firestore, collectionName, id);
    deleteDocumentNonBlocking(docRef);
    toast({
      variant: 'destructive',
      title: 'حذف شد',
      description: 'دلنوشته با موفقیت حذف شد.',
    });
  };

  if (isUserLoading || isAdminLoading) {
    return <div className="flex items-center justify-center h-screen bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if ((!isUserLoading && !user) || (!isAdminLoading && !isAdmin)) {
    return (
       <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
         <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm">
           <CardHeader className="text-center">
              <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
             <CardTitle className="text-2xl">دسترسی ادمین لازم است</CardTitle>
             <CardDescription>برای مدیریت دلنوشته‌ها، لطفاً با حساب کاربری ادمین وارد شوید.</CardDescription>
           </CardHeader>
           <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <Input name="email" type="email" placeholder="ایمیل" required />
                <Input name="password" type="password" placeholder="رمز عبور" required />
                <Button type="submit" className="w-full">ورود</Button>
            </form>
           </CardContent>
         </Card>
       </div>
    );
  }


  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://picsum.photos/seed/admin/1920/1080')" }}
      data-ai-hint="secure abstract"
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

        <main className="flex-1 p-4 md:p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold">مدیریت دلنوشته‌ها</h2>
            <p className="text-muted-foreground">دلنوشته‌های در انتظار تایید و منتشر شده را مدیریت کنید.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Submissions */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>در انتظار تایید</CardTitle>
                <CardDescription>
                  این دلنوشته‌ها منتظر تایید شما برای انتشار هستند.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPendingLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}
                {pendingError && <p className="text-destructive text-center">خطا در بارگذاری داده‌ها</p>}
                {!isPendingLoading && (!pendingData || pendingData.length === 0) && (
                   <div className="text-center py-8 text-muted-foreground">
                     <Inbox className="mx-auto h-12 w-12" />
                     <p>هیچ دلنوشته‌ای در انتظار تایید نیست.</p>
                   </div>
                )}
                {pendingData && pendingData.length > 0 && (
                  <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>نام</TableHead>
                          <TableHead>دلنوشته</TableHead>
                          <TableHead className="text-left">عملیات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.message}</TableCell>
                            <TableCell className="flex justify-end gap-2">
                              <Button size="icon" variant="ghost" className="text-green-400 hover:text-green-500" onClick={() => handleApprove(item)}>
                                <CheckCircle />
                              </Button>
                              <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-500" onClick={() => handleDelete(item.id, 'delneveshtes_pending')}>
                                <XCircle />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Approved Submissions */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>منتشر شده</CardTitle>
                <CardDescription>لیست دلنوشته‌های منتشر شده در سایت.</CardDescription>
              </CardHeader>
              <CardContent>
                {isApprovedLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}
                {approvedError && <p className="text-destructive text-center">خطا در بارگذاری داده‌ها</p>}
                 {!isApprovedLoading && (!approvedData || approvedData.length === 0) && (
                   <div className="text-center py-8 text-muted-foreground">
                     <Inbox className="mx-auto h-12 w-12" />
                     <p>هنوز هیچ دلنوشته‌ای منتشر نشده است.</p>
                   </div>
                )}
                {approvedData && approvedData.length > 0 && (
                  <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>نام</TableHead>
                          <TableHead>دلنوشته</TableHead>
                          <TableHead className="text-left">عملیات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.message}</TableCell>
                            <TableCell className="text-left">
                               <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(item.id, 'delneveshtes_approved')}>
                                <Trash2 />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminGuestbookPage;

    