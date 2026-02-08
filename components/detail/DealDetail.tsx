/**
 * DealDetail Component
 * Displays comprehensive deal information
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Deal } from '@/types/deal';
import type { Retailer } from '@/types/retailer';
import { formatPrice, isActiveDeal } from '@/types/deal';
import Button from '@/components/common/Button';
import RetailerInfo from './RetailerInfo';

interface DealDetailProps {
  deal: Deal;
  retailer: Retailer;
}

function generateProductSchema(deal: Deal, retailer: Retailer) {
  const expirationDate = deal.expirationDate instanceof Date 
    ? deal.expirationDate 
    : new Date(deal.expirationDate);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.productName,
    description: deal.description,
    image: deal.imageUrl,
    offers: {
      '@type': 'Offer',
      price: (deal.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: expirationDate.toISOString(),
      seller: {
        '@type': 'Organization',
        name: retailer.name,
      },
    },
  };
}

export default function DealDetail({ deal, retailer }: DealDetailProps) {
  const isExpired = !isActiveDeal(deal);
  const expirationDate = deal.expirationDate instanceof Date 
    ? deal.expirationDate 
    : new Date(deal.expirationDate);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(deal, retailer)),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 text-teal-900 hover:text-teal-800 font-medium mb-6 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Deals
        </Link>

        {/* Expired Warning */}
        {isExpired && (
          <div className="bg-white border border-orange-300 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-yellow-900 font-semibold">
                This deal has expired and may no longer be available.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <Image
              src={deal.imageUrl}
              alt={deal.productName}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Savings Badge */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
              {deal.savingsPercentage}% OFF
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-1.5 bg-teal-100 text-teal-800 text-sm font-semibold rounded-full">
                {deal.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 leading-tight">
              {deal.productName}
            </h1>

            {/* Pricing Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {formatPrice(deal.price)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(deal.originalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700 font-semibold text-base">
                  Save {formatPrice(deal.originalPrice - deal.price)} ({deal.savingsPercentage}% off)
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Product Details
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {deal.description}
              </p>
            </div>

            {/* Expiration Date */}
            <div className="mb-5 flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">
                <span className="font-semibold">Expires:</span>{' '}
                {expirationDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* View Deal Button */}
            <div className="mb-6">
              <a
                href={deal.dealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={isExpired ? 'pointer-events-none opacity-50' : ''}
              >
                <button
                  disabled={isExpired}
                  className="w-full px-6 py-3.5 bg-teal-900 hover:bg-teal-800 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>View Deal at {retailer.name}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </a>
              {!isExpired && (
                <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Opens in a new tab
                </p>
              )}
            </div>

            {/* Retailer Info */}
            <RetailerInfo retailer={retailer} />
          </div>
        </div>
      </div>
    </>
  );
}
