'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('Header: Auth state', { hasUser: !!user, loading, userEmail: user?.email });
  }, [user, loading]);

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
              href="/how-it-works" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              How It Works
            </Link>
            
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                onBlur={() => setTimeout(() => setAboutMenuOpen(false), 150)}
                className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center gap-1"
              >
                About
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    href="/our-mission"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    Our Mission
                  </Link>
                  <Link
                    href="/our-story"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/partner" 
              className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Partner With Us
            </Link>

            {/* Auth Buttons / User Menu */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/watchlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Watchlist
                        </Link>
                        <Link
                          href="/alerts"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Price Alerts
                        </Link>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile Settings
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/auth/login"
                      className="text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-4 py-2 bg-teal-900 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
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
                href="/how-it-works"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              
              {/* About Section */}
              <div className="pt-3 mt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  About
                </p>
                <div className="flex flex-col space-y-3 pl-2">
                  <Link
                    href="/our-mission"
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Mission
                  </Link>
                  <Link
                    href="/our-story"
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              </div>
              
              <Link
                href="/partner"
                className="text-sm text-gray-700 hover:text-orange-600 font-medium pt-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner With Us
              </Link>

              {/* Mobile Auth Buttons / User Menu */}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-2">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/watchlist"
                        className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Watchlist
                      </Link>
                      <Link
                        href="/alerts"
                        className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Price Alerts
                      </Link>
                      <Link
                        href="/profile"
                        className="text-sm text-gray-700 hover:text-orange-600 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          signOut();
                        }}
                        className="w-full text-left text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="pt-3 mt-3 border-t border-gray-200 flex flex-col gap-3">
                        <Link
                          href="/auth/login"
                          className="text-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="text-center px-4 py-2 bg-teal-900 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
