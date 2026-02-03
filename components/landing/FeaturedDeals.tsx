/**
 * FeaturedDeals Component
 * Displays featured deals on the landing page
 */

import type { Deal } from '@/types/deal';
import DealCard from '@/components/deals/DealCard';
import Link from 'next/link';

interface FeaturedDealsProps {
  deals: Deal[];
}

export default function FeaturedDeals({ deals }: FeaturedDealsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked deals with the biggest savings. Limited time offers you don't want to miss.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/deals"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Deals
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
