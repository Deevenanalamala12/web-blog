"use client";

import Link from 'next/link';
import { Search, BookOpen, Menu, PlusCircle, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  
  const searchId = React.useId();
  const mobileSearchId = React.useId();

  return (
    <header className="bg-card/80 border-b backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold font-headline text-primary">Inkwell</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/categories">Categories</Link>
              </Button>
            </nav>
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">Search</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id={searchId} placeholder="Search..." className="pl-9 w-48 lg:w-64" />
            </div>
            {user ? (
              <>
                <Button asChild>
                  <Link href="/create"><PlusCircle className="mr-2"/> Create Post</Link>
                </Button>
                <Button variant="ghost" onClick={logout}>
                    <LogOut className="mr-2"/> Logout
                </Button>
              </>
            ) : (
                 <Button asChild>
                    <Link href="/login"><LogIn className="mr-2"/> Login</Link>
                </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 pt-8">
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setOpen(false)}>
                    <BookOpen className="h-7 w-7 text-primary" />
                    <span className="text-2xl font-bold font-headline text-primary">Inkwell</span>
                  </Link>
                  <div className="relative">
                    <label htmlFor={mobileSearchId} className="sr-only">Search</label>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id={mobileSearchId} placeholder="Search..." className="pl-9" />
                  </div>
                  <nav className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start" asChild>
                       <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                       <Link href="/categories" onClick={() => setOpen(false)}>Categories</Link>
                    </Button>
                  </nav>
                   {user ? (
                    <>
                        <Button asChild className="mt-4">
                           <Link href="/create" onClick={() => setOpen(false)}><PlusCircle className="mr-2"/> Create Post</Link>
                        </Button>
                        <Button variant="ghost" onClick={() => { logout(); setOpen(false); }}>
                            <LogOut className="mr-2"/> Logout
                        </Button>
                    </>
                   ) : (
                    <Button asChild className="mt-4">
                        <Link href="/login" onClick={() => setOpen(false)}><LogIn className="mr-2"/> Login</Link>
                    </Button>
                   )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
