/**
 * Hero Component
 * Landing page hero section with value proposition
 */

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="bg-gradient-to-br from-teal-50 to-orange-50 border border-gray-200 rounded-2xl shadow-md">
          <div className="py-10 md:py-12 px-6 md:px-12">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Discover great deals
            </h1>
            
            {/* Subheading */}
            <p className="text-base text-gray-600 mb-6 max-w-2xl">
              Curated deals from trusted retailers. Save up to 70% on electronics, home goods, and more.
            </p>

            {/* CTA */}
            <Link
              href="/deals"
              className="inline-flex items-center px-5 py-2.5 bg-teal-900 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              Browse deals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
