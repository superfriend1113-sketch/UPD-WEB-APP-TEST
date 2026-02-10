/**
 * EmptyState Component
 * Displays a message when no results are found
 */

import { ReactNode } from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  message?: string;
  description?: string;
  action?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ 
  title, 
  message, 
  description, 
  action, 
  actionLabel, 
  actionHref 
}: EmptyStateProps) {
  const displayTitle = title || 'No deals found';
  const displayMessage = description || message || 'Try adjusting your filters or check back later.';
  
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {displayTitle}
        </h3>
        <p className="text-gray-600 mb-8 text-lg">{displayMessage}</p>
        {action && <div>{action}</div>}
        {!action && actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center px-6 py-3 bg-teal-900 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
