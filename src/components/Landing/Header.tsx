"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#0a0c1b] to-black backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 text-primary">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded bg-accent"></div>
            <span className="text-xl font-bold">TicketHub</span> */}
            <Image
              src={"/mseal-logo.png"}
              alt="mseal logo"
              width={80}
              height={10}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Events
            </Link>
            <Link
              href="/sports"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Sports
            </Link>
            <Link
              href="/concerts"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Concerts
            </Link>
            <Link
              href="/theater"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Theater
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events, teams..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* <Link href={"/auth"}>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link> */}
            {/* <Link href={"/auth"}>
              {" "}
              <Button size="sm" className="hidden md:flex">
                Sign Up
              </Button>
            </Link> */}

            {/* <Button variant="ghost" size="sm">
              <ShoppingCart className="h-4 w-4" />
            </Button> */}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-secondary border-border"
                />
              </div>
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Events
              </Link>
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Sports
              </Link>
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Concerts
              </Link>
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Theater
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
