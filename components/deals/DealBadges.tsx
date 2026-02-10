/**
 * DealBadges Component
 * Displays urgency indicators for deals (New, Ending Soon, etc.)
 */

import { Deal } from '@/types/deal';

interface DealBadgesProps {
  deal: Deal;
  className?: string;
}

export default function DealBadges({ deal, className = '' }: DealBadgesProps) {
  const badges: { text: string; color: string }[] = [];

  // Check if deal is new (created within last 7 days)
  const createdDate = deal.createdAt instanceof Date ? deal.createdAt : new Date(deal.createdAt);
  const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCreation <= 7) {
    badges.push({ text: 'NEW', color: 'bg-blue-600' });
  }

  // Check if deal is ending soon (expires within 24 hours)
  const expirationDate = deal.expirationDate instanceof Date ? deal.expirationDate : new Date(deal.expirationDate);
  const hoursUntilExpiration = Math.floor((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60));
  
  if (hoursUntilExpiration > 0 && hoursUntilExpiration <= 24) {
    badges.push({ text: 'ENDING SOON', color: 'bg-red-600' });
  }

  // Check for high savings (over 50%)
  if (deal.savingsPercentage >= 50) {
    badges.push({ text: 'HOT DEAL', color: 'bg-orange-600' });
  }

  // Don't render if no badges
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((badge, index) => (
        <span
          key={index}
          className={`${badge.color} text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide shadow-sm`}
        >
          {badge.text}
        </span>
      ))}
    </div>
  );
}
