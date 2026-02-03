/**
 * CategoryNav Component
 * Displays category navigation on the landing page
 */

import Link from 'next/link';
import type { Category } from '@/types/category';

interface CategoryNavProps {
  categories: Category[];
}

const categoryIcons: Record<string, string> = {
  'electronics': '💻',
  'home-garden': '🏡',
  'clothing': '👕',
  'health-beauty': '💄',
  'sports-outdoors': '⚽',
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse deals organized by your favorite categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/deals?category=${category.slug}`}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative p-6 flex flex-col items-center justify-center min-h-[140px]">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[category.slug] || category.icon || '📦'}
                </div>
                <h3 className="text-center font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm md:text-base">
                  {category.name}
                </h3>
                {category.dealCount > 0 && (
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-blue-500">
                    {category.dealCount} deals
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
