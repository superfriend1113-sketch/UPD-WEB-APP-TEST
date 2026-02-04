/**
 * CategoryFilter Component
 * Allows users to filter deals by category
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/types/category';

interface CategoryFilterProps {
  categories: Category[];
  dealCounts: Record<string, number>;
  totalDeals: number;
}

export default function CategoryFilter({ categories, dealCounts, totalDeals }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryChange = (categorySlug: string | null) => {
    if (categorySlug) {
      router.push(`/deals?category=${categorySlug}`);
    } else {
      router.push('/deals');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-4 h-4 mr-2 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Categories
      </h2>
      
      {/* Mobile: Dropdown */}
      <div className="lg:hidden">
        <select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-900 focus:border-teal-900 transition-colors bg-white text-gray-900"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.slug}>
              {category.name} ({dealCounts[category.slug] || 0})
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: List */}
      <div className="hidden lg:block space-y-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`w-full px-3 py-2.5 rounded-lg text-sm transition-all text-left flex items-center justify-between ${
            !selectedCategory
              ? 'bg-teal-900 text-white font-semibold'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>All Categories</span>
          <span className={`text-sm font-semibold ${!selectedCategory ? 'text-teal-100' : 'text-gray-500'}`}>
            {totalDeals}
          </span>
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`w-full px-3 py-2.5 rounded-lg text-sm transition-all text-left flex items-center justify-between ${
              selectedCategory === category.slug
                ? 'bg-teal-900 text-white font-semibold'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{category.name}</span>
            <span className={`text-sm font-semibold ${selectedCategory === category.slug ? 'text-teal-100' : 'text-gray-500'}`}>
              {dealCounts[category.slug] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
