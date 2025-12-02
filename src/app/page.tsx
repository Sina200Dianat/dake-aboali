import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-foreground" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            WebStart
          </h1>
        </div>
        <Button>Get Started</Button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 p-4 text-center sm:p-6 md:p-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Your Modern Web App is Ready
          </h2>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
            This is a PWA-ready application built with Next.js and styled with Tailwind CSS. It's clean, minimal, and ready for you to build upon.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs sm:max-w-md">
          <Button size="lg" className="w-full sm:w-auto">Primary Action</Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto">
            Secondary Action
          </Button>
        </div>
        <div className="w-full max-w-5xl pt-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>PWA Ready</CardTitle>
                <CardDescription>
                  Configured as a Progressive Web App out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Includes a manifest file with standalone display and start URL configured.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Modern Styling</CardTitle>
                <CardDescription>
                  Styled with a clean and minimal aesthetic using Tailwind CSS and shadcn/ui.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Custom theme with deep charcoal and high-contrast gold/off-white text.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="flex h-16 items-center justify-center border-t bg-background px-4 sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebStart. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
