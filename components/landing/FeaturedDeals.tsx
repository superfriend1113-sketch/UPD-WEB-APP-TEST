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
    <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-gradient-to-br from-teal-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
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
