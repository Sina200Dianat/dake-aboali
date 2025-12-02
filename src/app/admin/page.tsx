
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  collection,
  query,
  where,
  doc,
} from 'firebase/firestore';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
  useDoc,
} from '@/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame, PlusCircle, Edit, Trash2, Loader2, ShieldAlert } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { initiateEmailSignIn, initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase/provider';


const initialMenuItems = [
  { id: 1, name: 'چای', price: '50,000' },
  { id: 2, name: 'چای زعفرانی', price: '70,000' },
  { id: 3, name: 'چای ابوعلی', price: '70,000' },
  { id: 4, name: 'دمنوش آرامش', price: '70,000' },
  { id: 5, name: 'چای کرک', price: '110,000' },
  { id: 6, name: 'چای ماسالا', price: '110,000' },
  { id: 7, name: 'کاپوچینو', price: '90,000' },
  { id: 8, name: 'هات چاکلت', price: '90,000' },
  { id: 9, name: 'شیر پسته زعفرانی', price: '110,000' },
  { id: 10, name: 'شیر داغ', price: '65,000' },
  { id: 11, name: 'شیر چای', price: '70,000' },
  { id: 12, name: 'کلوچه', price: '55,000' },
  { id: 13, name: 'قهوه دله', price: '50,000' },
  { id: 14, name: 'خرما', price: '20,000' },
  { id: 15, name: 'ساندویچ سرد', price: '150,000' },
  { id: 16, name: 'باقلوا', price: '20,000' },
  { id: 17, name: 'کیک', price: '90,000' },
];

type MenuItem = {
  id: number;
  name: string;
  price: string;
};

function MenuItemRow({ item, onPriceChange, onDelete }: { item: MenuItem, onPriceChange: (id: number, newPrice: string) => void, onDelete: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(item.price.replace(/,/g, ''));
  const { toast } = useToast();

  const handleSave = () => {
    const formattedPrice = new Intl.NumberFormat('fa-IR').format(Number(price));
    onPriceChange(item.id, formattedPrice);
    setIsEditing(false);
    toast({
      title: "قیمت به‌روزرسانی شد",
      description: `قیمت ${item.name} به ${formattedPrice} تومان تغییر کرد.`,
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  }

  const handleDelete = () => {
    onDelete(item.id);
    toast({
      variant: "destructive",
      title: "آیتم حذف شد",
      description: `${item.name} از منو حذف شد.`,
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium text-right">{item.name}</TableCell>
      <TableCell className="text-right">
        {isEditing ? (
          <Input
            type="text"
            value={price}
            onChange={handlePriceChange}
            className="h-8 max-w-[120px]"
            dir="ltr"
          />
        ) : (
          <span>{item.price}</span>
        )}
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        {isEditing ? (
          <Button size="sm" onClick={handleSave}>ذخیره</Button>
        ) : (
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">ویرایش قیمت</span>
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">حذف آیتم</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>آیا از حذف این آیتم مطمئن هستید؟</AlertDialogTitle>
              <AlertDialogDescription>
                این عمل قابل بازگشت نیست. آیتم "{item.name}" برای همیشه حذف خواهد شد.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>انصراف</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}


export default function AdminPage() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const { toast } = useToast();
  
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
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
    initiateEmailSignIn(auth, email, password);
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;
    const newItem: MenuItem = {
      id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
      name: itemName,
      price: new Intl.NumberFormat('fa-IR').format(Number(itemPrice)),
    };
    setMenuItems([...menuItems, newItem]);
    toast({
      title: "آیتم اضافه شد",
      description: `${itemName} با قیمت ${newItem.price} تومان با موفقیت اضافه شد.`,
    });
    setItemName('');
    setItemPrice('');
  };
  
  const handlePriceChange = (id: number, newPrice: string) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, price: newPrice } : item));
  };
  
  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
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
             <CardDescription>برای مدیریت پنل، لطفاً با حساب کاربری ادمین وارد شوید.</CardDescription>
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

        <main className="flex flex-1 flex-col items-center justify-start pt-8 p-4 gap-8">
           <div className="text-center">
             <h2 className="text-4xl font-bold">پنل مدیریت</h2>
             <p className="text-muted-foreground">خوش آمدید! از اینجا می‌توانید بخش‌های مختلف سایت را مدیریت کنید.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>مدیریت منو</CardTitle>
                  <CardDescription>آیتم‌های منوی دکه را اضافه، حذف یا ویرایش کنید.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/admin/menu">رفتن به مدیریت منو</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>مدیریت دلنوشته‌ها</CardTitle>
                  <CardDescription>دلنوشته‌های ارسالی کاربران را تایید یا حذف کنید.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/admin/guestbook">رفتن به مدیریت دلنوشته‌ها</Link>
                  </Button>
                </CardContent>
              </Card>
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
