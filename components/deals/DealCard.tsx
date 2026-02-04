/**
 * DealCard Component
 * Displays a summary card for a single deal with product information
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Deal } from '@/types/deal';
import { formatPrice } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group">
      <Link href={`/deals/${deal.id}`} className="block">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
          <Image
            src={deal.imageUrl}
            alt={deal.productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
            aria-label="Add to wishlist"
          >
            <svg
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-gray-900'
              }`}
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Discount Badge */}
          {deal.savingsPercentage > 0 && (
            <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-2.5 py-1 rounded-md text-xs font-medium">
              {deal.savingsPercentage}% off
            </div>
          )}
        </div>

        {/* Deal Information */}
        <div className="space-y-1">
          {/* Product Name */}
          <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight">
            {deal.productName}
          </h3>

          {/* Retailer */}
          <p className="text-xs text-gray-500">
            {deal.retailer.charAt(0).toUpperCase() + deal.retailer.slice(1)}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-semibold text-gray-900">
              {formatPrice(deal.price)}
            </span>
            {deal.originalPrice > deal.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(deal.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
