'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginPromptProps {
  action: 'cart' | 'purchase' | 'watchlist' | string;
  onClose: () => void;
  returnUrl?: string;
}

const actionMessages = {
  cart: {
    title: 'Sign in to add to cart',
    description: 'Create an account or sign in to add items to your cart and complete your purchase.',
  },
  purchase: {
    title: 'Sign in to complete purchase',
    description: 'You need to be signed in to complete your purchase and track your orders.',
  },
  watchlist: {
    title: 'Sign in to save to watchlist',
    description: 'Create an account or sign in to save deals to your watchlist and get price alerts.',
  },
};

/**
 * Modal prompt shown when unauthenticated users try to perform protected actions
 */
export default function LoginPrompt({ action, onClose, returnUrl }: LoginPromptProps) {
  const router = useRouter();
  const message = actionMessages[action as keyof typeof actionMessages] || {
    title: 'Sign in required',
    description: 'You need to be signed in to perform this action.',
  };

  const loginUrl = `/auth/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;
  const signupUrl = `/auth/signup${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {message.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {message.description}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href={loginUrl}
              className="block w-full px-4 py-3 bg-teal-600 text-white text-center font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href={signupUrl}
              className="block w-full px-4 py-3 border-2 border-teal-600 text-teal-600 text-center font-semibold rounded-lg hover:bg-teal-50 transition-colors"
            >
              Create Account
            </Link>
            <button
              onClick={onClose}
              className="block w-full px-4 py-3 text-gray-600 text-center font-medium hover:text-gray-800 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
