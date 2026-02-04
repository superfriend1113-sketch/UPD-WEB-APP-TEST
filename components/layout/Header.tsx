'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-14 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative w-8 h-8 rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop"
                alt="Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <form className="relative">
              <input
                type="text"
                placeholder="Search deals"
                className="w-full h-9 px-4 text-sm text-gray-900 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-500"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/deals" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Deals
            </Link>
            <Link 
              href="/deals?category=electronics" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Electronics
            </Link>
            <Link 
              href="/deals?category=home-garden" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/deals?category=clothing" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Clothing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search deals"
                className="w-full h-10 px-4 text-sm text-gray-900 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="/deals"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/deals?category=electronics"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link
                href="/deals?category=home-garden"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/deals?category=clothing"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clothing
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
