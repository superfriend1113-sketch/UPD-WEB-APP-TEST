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
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured deals
          </h2>
          <Link
            href="/deals"
            className="text-sm text-teal-900 hover:text-teal-800 font-medium"
          >
            See all
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}
