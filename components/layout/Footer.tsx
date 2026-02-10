/**
 * Footer Component
 * Site-wide footer with links and information
 */

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-50 via-orange-50 to-gray-100 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Newsletter Section - Takes more space */}
            <div className="lg:col-span-5">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Unlimited Perfect Deals"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Join our newsletter to stay up to date on features and releases.
              </p>
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm shadow-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 text-sm shadow-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                By subscribing you agree with our Privacy Policy and provide consent to receive updates.
              </p>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4">Quick Links</h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/deals" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      All Deals
                    </Link>
                  </li>
                  <li>
                    <Link href="/deals?category=electronics" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link href="/deals?category=home-garden" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Home & Garden
                    </Link>
                  </li>
                  <li>
                    <Link href="/deals?category=clothing" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/watchlist" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Watchlist
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4">Company</h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-mission" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-story" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/partner" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      Partner With Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="text-gray-600 hover:text-teal-600 transition-colors text-sm inline-block">
                      How It Works
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all duration-200 shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all duration-200 shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all duration-200 shadow-sm"
                    aria-label="Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all duration-200 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Unlimited Perfect Deals. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/legal/privacy" className="text-gray-600 hover:text-teal-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-gray-600 hover:text-teal-600 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal" className="text-gray-600 hover:text-teal-600 text-sm transition-colors">
                Cookies Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
