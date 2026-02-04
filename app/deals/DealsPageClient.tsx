/**
 * Deals Feed Page Client Component
 * Client-side logic for deals filtering and display
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DealGrid from '@/components/deals/DealGrid';
import CategoryFilter from '@/components/deals/CategoryFilter';
import PriceRangeFilter from '@/components/deals/PriceRangeFilter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/common/Button';
import { getActiveDeals, getCategories, applyFilters, calculateCategoryCounts, type FilterState } from '@/lib/firestore';
import type { Deal } from '@/types/deal';
import type { Category } from '@/types/category';

interface DealsPageClientProps {
  categoryParam: string | null;
}

export default function DealsPageClient({ categoryParam }: DealsPageClientProps) {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    categorySlug: categoryParam,
    minPrice: null,
    maxPrice: null,
  });

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [dealsData, categoriesData] = await Promise.all([
          getActiveDeals(),
          getCategories(),
        ]);
        setDeals(dealsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load deals');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Update category filter when URL changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, categorySlug: categoryParam }));
  }, [categoryParam]);

  // Apply filters
  const filteredDeals = applyFilters(deals, filters);
  const dealCounts = calculateCategoryCounts(deals, categories);

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      categorySlug: null,
      minPrice: null,
      maxPrice: null,
    });
    router.push('/deals');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filters.categorySlug || filters.minPrice !== null || filters.maxPrice !== null;
  const selectedCategoryName = categories.find(c => c.slug === filters.categorySlug)?.name;

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header Card */}
        <div className="bg-gradient-to-br from-teal-50 to-orange-50 border border-gray-200 rounded-2xl shadow-md p-6 md:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {selectedCategoryName ? `${selectedCategoryName} Deals` : 'All Deals'}
          </h1>
          <p className="text-base text-gray-600">
            {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'} available
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Active Filters Badge */}
            {hasActiveFilters && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Active Filters</span>
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs text-teal-900 hover:text-teal-800 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategoryName && (
                    <span className="inline-flex items-center px-3 py-1 bg-teal-50 rounded-full text-xs font-medium text-teal-900 border border-teal-200">
                      {selectedCategoryName}
                    </span>
                  )}
                  {(filters.minPrice !== null || filters.maxPrice !== null) && (
                    <span className="inline-flex items-center px-3 py-1 bg-orange-50 rounded-full text-xs font-medium text-orange-900 border border-orange-200">
                      ${filters.minPrice || 0} - ${filters.maxPrice || '∞'}
                    </span>
                  )}
                </div>
              </div>
            )}

            <CategoryFilter
              categories={categories}
              dealCounts={dealCounts}
              totalDeals={deals.length}
            />
            <PriceRangeFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceRangeChange={handlePriceRangeChange}
              matchingCount={filteredDeals.length}
            />
          </aside>

          {/* Deals Grid */}
          <div className="lg:col-span-3">
            {filteredDeals.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12">
                <EmptyState
                  message="No deals found matching your filters"
                  action={
                    <Button onClick={handleClearAllFilters}>
                      Clear All Filters
                    </Button>
                  }
                />
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredDeals.length}</span> {filteredDeals.length === 1 ? 'result' : 'results'}
                  </p>
                </div>
                <DealGrid deals={filteredDeals} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
