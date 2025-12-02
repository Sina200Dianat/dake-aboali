
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">درباره ما</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        این صفحه درباره ما است.
      </p>
      <Link href="/" className="mt-8 text-primary hover:underline">
        بازگشت به خانه
      </Link>
    </main>
  );
}
