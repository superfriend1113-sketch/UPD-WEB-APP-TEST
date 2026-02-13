'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase/config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dealsMenuOpen, setDealsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, loading, signOut } = useAuth();

  // Fetch user role when user is authenticated
  useEffect(() => {
    if (user) {
      const fetchUserRole = async () => {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setUserRole(profile?.role || null);
      };
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-50 to-orange-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Unlimited Perfect Deals"
              width={180}
              height={45}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center space-x-8">
            {/* Deals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDealsMenuOpen(!dealsMenuOpen)}
                onBlur={() => setTimeout(() => setDealsMenuOpen(false), 150)}
                className="text-sm text-gray-700 hover:text-teal-900 font-medium transition-colors flex items-center gap-1"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dealsMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    href="/deals"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setDealsMenuOpen(false)}
                  >
                    All Deals
                  </Link>
                  <Link
                    href="/deals?category=electronics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setDealsMenuOpen(false)}
                  >
                    Electronics
                  </Link>
                  <Link
                    href="/deals?category=home-garden"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setDealsMenuOpen(false)}
                  >
                    Home & Garden
                  </Link>
                  <Link
                    href="/deals?category=clothing"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setDealsMenuOpen(false)}
                  >
                    Fashion
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/how-it-works" 
              className="text-sm text-gray-700 hover:text-teal-900 font-medium transition-colors"
            >
              How It Works
            </Link>
            
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                onBlur={() => setTimeout(() => setAboutMenuOpen(false), 150)}
                className="text-sm text-gray-700 hover:text-teal-900 font-medium transition-colors flex items-center gap-1"
              >
                About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    href="/our-mission"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    Our Mission
                  </Link>
                  <Link
                    href="/our-story"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/contact-us" 
              className="text-sm text-gray-700 hover:text-teal-900 font-medium transition-colors"
            >
              Contact Us
            </Link>

            {/* Retailer Dashboard Link - Only show for retailers */}
            {user && userRole === 'retailer' && (
              <Link 
                href="/retailer/dashboard" 
                className="text-sm text-gray-700 hover:text-teal-900 font-medium transition-colors"
              >
                Retailer Dashboard
              </Link>
            )}

          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="w-10 h-10 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-bold text-sm flex items-center justify-center"
                    >
                      {user.email?.charAt(0).toUpperCase()}
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
                        {userRole === 'retailer' ? (
                          <>
                            <Link
                              href="/retailer/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
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
                          </>
                        ) : (
                          <>
                            <Link
                              href="/watchlist"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              My Watchlist
                            </Link>
                            <Link
                              href="/alerts"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Price Alerts
                            </Link>
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
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
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="px-5 py-2 bg-teal-900 text-white text-sm font-medium rounded-full hover:bg-teal-800 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-5 py-2 border-2 border-teal-600 text-teal-900 text-sm font-medium rounded-full hover:bg-teal-50 transition-colors"
                    >
                      Get started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/50 shrink-0"
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
            <div className="flex flex-col space-y-3">
              <Link
                href="/deals"
                className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Now
              </Link>
              
              <Link
                href="/how-it-works"
                className="text-sm text-gray-700 hover:text-teal-900 font-medium"
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
                    className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Mission
                  </Link>
                  <Link
                    href="/our-story"
                    className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              </div>
              
              <Link
                href="/contact-us"
                className="text-sm text-gray-700 hover:text-teal-900 font-medium pt-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
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
                      {userRole === 'retailer' ? (
                        <>
                          <Link
                            href="/retailer/dashboard"
                            className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Retailer Dashboard
                          </Link>
                          <Link
                            href="/retailer/profile"
                            className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Profile Settings
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/watchlist"
                            className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            My Watchlist
                          </Link>
                          <Link
                            href="/alerts"
                            className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Price Alerts
                          </Link>
                          <Link
                            href="/profile"
                            className="text-sm text-gray-700 hover:text-teal-900 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Profile Settings
                          </Link>
                        </>
                      )}
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
                          className="text-center px-5 py-2 bg-teal-900 text-white text-sm font-medium rounded-full hover:bg-teal-800 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Log In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="text-center px-5 py-2 border-2 border-teal-600 text-teal-900 text-sm font-medium rounded-full hover:bg-teal-50 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Get started
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
