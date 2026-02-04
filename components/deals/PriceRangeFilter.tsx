/**
 * PriceRangeFilter Component
 * Allows users to filter deals by price range
 */

'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

interface PriceRangeFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  matchingCount: number;
}

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceRangeChange,
  matchingCount,
}: PriceRangeFilterProps) {
  const [minInput, setMinInput] = useState(minPrice?.toString() || '');
  const [maxInput, setMaxInput] = useState(maxPrice?.toString() || '');
  const [error, setError] = useState<string | null>(null);

  const validateAndApply = () => {
    const min = minInput ? parseFloat(minInput) : null;
    const max = maxInput ? parseFloat(maxInput) : null;

    // Validation
    if (min !== null && min < 0) {
      setError('Minimum price must be positive');
      return;
    }
    if (max !== null && max < 0) {
      setError('Maximum price must be positive');
      return;
    }
    if (min !== null && max !== null && min > max) {
      setError('Minimum price must be less than maximum price');
      return;
    }

    setError(null);
    onPriceRangeChange(min, max);
  };

  const handleClearFilters = () => {
    setMinInput('');
    setMaxInput('');
    setError(null);
    onPriceRangeChange(null, null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-4 h-4 mr-2 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Price Range
      </h2>
      
      <div className="space-y-4">
        {/* Price Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="min-price" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              Min
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                id="min-price"
                type="number"
                min="0"
                step="0.01"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                onBlur={validateAndApply}
                placeholder="0"
                className="w-full min-h-[44px] pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="max-price" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              Max
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                onBlur={validateAndApply}
                placeholder="999"
                className="w-full min-h-[44px] pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* Matching Count */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
          <p className="text-sm font-semibold text-teal-900 flex items-center justify-between">
            <span>Matching Deals</span>
            <span className="text-lg">{matchingCount}</span>
          </p>
        </div>

        {/* Clear Filters Button */}
        {(minPrice !== null || maxPrice !== null) && (
          <button
            onClick={handleClearFilters}
            className="w-full min-h-[44px] px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Price Filter
          </button>
        )}
      </div>
    </div>
  );
}
