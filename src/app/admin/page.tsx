
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame, PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
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
} from "@/components/ui/alert-dialog"

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

// Component for a single menu item row with inline editing and deleting
function MenuItemRow({ item, onPriceChange, onDelete }: { item: MenuItem, onPriceChange: (id: number, newPrice: string) => void, onDelete: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(item.price.replace(/,/g, ''));
  const { toast } = useToast();

  const handleSave = () => {
    // Format price with commas for display
    const formattedPrice = new Intl.NumberFormat('fa-IR').format(Number(price));
    onPriceChange(item.id, formattedPrice);
    setIsEditing(false);
    toast({
      title: "قیمت به‌روزرسانی شد",
      description: `قیمت ${item.name} به ${formattedPrice} تومان تغییر کرد.`,
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
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
            type="text" // Use text to allow for formatting, but validate for numbers
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

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;
    const newItem: MenuItem = {
      id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
      name: itemName,
      price: new Intl.NumberFormat('fa-IR').format(Number(itemPrice)), // Format the price
    };
    setMenuItems([...menuItems, newItem]);
    toast({
      title: "آیتم اضافه شد",
      description: `${itemName} با قیمت ${newItem.price} تومان با موفقیت اضافه شد.`,
    });
    // Reset form fields
    setItemName('');
    setItemPrice('');
  };
  
  const handlePriceChange = (id: number, newPrice: string) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, price: newPrice } : item));
  };
  
  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };


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

        <main className="flex flex-1 flex-col items-center justify-start pt-8 p-4 gap-8">
          <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mt-4">اضافه کردن آیتم جدید</CardTitle>
              <CardDescription>آیتم جدید را به منو اضافه کنید.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="space-y-2 text-right">
                  <Label htmlFor="itemName">نام آیتم</Label>
                  <Input
                    id="itemName"
                    type="text"
                    placeholder="مثال: چای مخصوص"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="itemPrice">قیمت آیتم (تومان)</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    required
                    placeholder="مثال: 75000"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  اضافه کردن آیتم
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-right">
              <CardTitle>ویرایش منو</CardTitle>
              <CardDescription>لیست آیتم های موجود در منو را ویرایش کنید.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[40vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نام</TableHead>
                      <TableHead className="text-right">قیمت (تومان)</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <MenuItemRow key={item.id} item={item} onPriceChange={handlePriceChange} onDelete={handleDeleteItem} />
                    ))}
                  </TableBody>
                </Table>
              </div>
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
