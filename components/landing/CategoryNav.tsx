/**
 * CategoryNav Component
 * Displays category navigation on the landing page
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/types/category';

interface CategoryNavProps {
  categories: Category[];
}

const categoryImages: Record<string, string> = {
  'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
  'home-garden': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop',
  'clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop',
  'health-beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
  'sports-outdoors': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop',
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Explore popular categories
          </h2>
          <Link
            href="/deals"
            className="text-sm font-medium text-teal-900 hover:text-teal-800 hidden sm:block"
          >
            See all categories
          </Link>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="-mx-4 sm:mx-0">
          <div className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-hide sm:grid sm:grid-cols-5 sm:gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/deals?category=${category.slug}`}
                className="group flex-shrink-0 w-32 sm:w-auto bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-teal-900 hover:shadow-md transition-all"
              >
                <div className="relative aspect-square w-full bg-gray-100">
                  <Image
                    src={categoryImages[category.slug] || 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=200&h=200&fit=crop'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
