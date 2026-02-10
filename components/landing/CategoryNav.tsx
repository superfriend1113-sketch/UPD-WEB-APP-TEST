/**
 * CategoryNav Component
 * Displays category navigation on the landing page
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Category } from '@/types/category';

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add "All" category at the beginning
  const allCategories = [
    { id: 'all', name: 'All Deals', slug: '' },
    ...categories.slice(0, 4), // Show first 4 categories
    { id: 'more', name: 'More', slug: 'more' }
  ];

  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-br from-purple-50 via-gray-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-start gap-2">
            Stylish Collection of Deals
            <svg className="w-8 h-8 text-teal-600 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" className="text-purple-400"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1" fill="currentColor"/>
              <circle cx="15" cy="9" r="1" fill="currentColor"/>
            </svg>
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover unbeatable deals on quality products from trusted retailers — clearance inventory at exceptional value.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={category.slug ? `/deals?category=${category.slug}` : '/deals'}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                selectedCategory === category.id || (category.id === 'all' && selectedCategory === 'all')
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
