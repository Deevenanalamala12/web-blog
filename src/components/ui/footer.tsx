"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import React from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">Inkwell</span>
          </div>
          <nav className="flex gap-4 mb-4 md:mb-0 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <Link href="#" className="hover:text-primary transition-colors">About</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Inkwell. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
