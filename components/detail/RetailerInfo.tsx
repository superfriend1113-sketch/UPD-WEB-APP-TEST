/**
 * RetailerInfo Component
 * Displays retailer information on deal detail page
 */

import Image from 'next/image';
import type { Retailer } from '@/types/retailer';

interface RetailerInfoProps {
  retailer: Retailer;
}

export default function RetailerInfo({ retailer }: RetailerInfoProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        About the Retailer
      </h3>
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 shrink-0 bg-white rounded-xl p-3 shadow-md border border-gray-200">
          <Image
            src={retailer.logoUrl}
            alt={`${retailer.name} logo`}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-lg mb-2">{retailer.name}</h4>
          <a
            href={retailer.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors group"
          >
            <span>Visit Website</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
