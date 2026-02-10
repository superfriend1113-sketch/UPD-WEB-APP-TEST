/**
 * Hero Component
 * Landing page hero section with value proposition
 */

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-orange-50 to-purple-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Turning excess inventory into opportunity — 
              <span className="text-teal-900"> instantly, intelligently, profitably.</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Unlimited Perfect Deals helps retailers recover value from unsold, excess, and slow-moving inventory without damaging brand equity. We connect retailers to a controlled marketplace and intelligent liquidation system that converts inventory risk into revenue, while giving consumers access to high-quality products at exceptional value.
            </p>

            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-teal-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">For retailers:</span> recover capital, reduce storage costs, and protect pricing integrity.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-teal-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">For consumers:</span> access trusted deals from verified retailers.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-teal-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">For partners:</span> unlock a smarter inventory ecosystem.
                </p>
              </div>
            </div>

            <Link
              href="/deals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-900 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              Browse Deals
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left - Chair */}
            <div className="relative rounded-2xl overflow-hidden bg-orange-100 aspect-square">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                  New
                </span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop"
                alt="Modern chair"
                fill
                className="object-cover"
              />
            </div>

            {/* Top Right - Lounge Chair */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                  New
                </span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
                alt="Lounge chair"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom - Large Sofa */}
            <div className="relative col-span-2 rounded-2xl overflow-hidden bg-gray-800 aspect-[2/1]">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                  New
                </span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop"
                alt="Modern sofa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
