/**
 * Footer Component
 * Site-wide footer with links and information
 */

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative w-8 h-8 rounded-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover amazing deals from top retailers. Save money on electronics, fashion, home goods, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/deals" className="hover:text-white transition-colors">
                  All Deals
                </Link>
              </li>
              <li>
                <Link href="/deals?category=electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/deals?category=home-garden" className="hover:text-white transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/deals?category=clothing" className="hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/deals?category=health-beauty" className="hover:text-white transition-colors">
                  Health & Beauty
                </Link>
              </li>
              <li>
                <Link href="/deals?category=sports-outdoors" className="hover:text-white transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Unlimited Perfect Deals. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
