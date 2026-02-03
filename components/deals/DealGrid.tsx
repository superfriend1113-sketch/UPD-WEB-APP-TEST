/**
 * DealGrid Component
 * Responsive grid layout for displaying multiple deal cards
 */

import type { Deal } from '@/types/deal';
import DealCard from './DealCard';

interface DealGridProps {
  deals: Deal[];
}

export default function DealGrid({ deals }: DealGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map(deal => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
