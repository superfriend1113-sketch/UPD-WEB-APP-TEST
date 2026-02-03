/**
 * DealCard Component
 * Displays a summary card for a single deal with product information
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Deal } from '@/types/deal';
import { formatPrice } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  return (
    <Link
      href={`/deals/${deal.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={deal.imageUrl}
          alt={deal.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Savings Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {deal.savingsPercentage}% OFF
        </div>

        {/* Retailer Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
          {deal.retailer.charAt(0).toUpperCase() + deal.retailer.slice(1)}
        </div>
      </div>

      {/* Deal Information */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[48px]">
          {deal.productName}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ${formatPrice(deal.price)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${formatPrice(deal.originalPrice)}
          </span>
        </div>

        {/* Savings Amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">
            Save ${formatPrice(deal.originalPrice - deal.price)}
          </span>
          <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
            View Deal →
          </span>
        </div>
      </div>
    </Link>
  );
}
