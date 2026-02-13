/**
 * Footer Component
 * Site-wide footer with links and information
 */

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Logo Section */}
        <div className="pt-12 pb-8 border-b border-gray-800">
          <Image
            src="/logo.png"
            alt="Unlimited Perfect Deals"
            width={200}
            height={50}
            className="h-12 w-auto brightness-0 invert"
          />
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Reach Us */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Reach us</h3>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300 text-sm">+1012 3456 789</span>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300 text-sm">demo@gmail.com</span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300 text-sm">
                    132 Dartmouth Street Boston,<br />
                    Massachusetts 02156 United States
                  </span>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/legal/privacy" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Terms & Services
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/deals" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    All Deals
                  </Link>
                </li>
                <li>
                  <Link href="/deals?category=electronics" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist" className="text-gray-300 hover:text-white transition-colors text-sm inline-block">
                    Watchlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Newsletter Section - Below Divider */}
        <div className="py-8">
          <div className="max-w-md">
            <h3 className="text-white font-bold text-base mb-4">Join Our Newsletter</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white placeholder:text-gray-500 text-sm"
                />
                <button className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                * Will send you weekly updates for your better tool management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
