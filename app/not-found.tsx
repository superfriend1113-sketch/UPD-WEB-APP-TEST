/**
 * 404 Not Found Page
 * Displayed when a page or resource is not found
 */

import Link from 'next/link';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-3">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, we couldn't find the page you're looking for. The deal may have expired or been removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/deals">
            <Button className="min-w-[150px]">
              Browse Deals
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" className="min-w-[150px]">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
