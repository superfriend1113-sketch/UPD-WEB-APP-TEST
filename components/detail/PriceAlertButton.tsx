'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { createPriceAlert, getDealPriceAlert } from '@/lib/actions/priceAlerts';
import { formatPrice } from '@/types/deal';

interface PriceAlertButtonProps {
  dealId: string;
  currentPrice: number;
}

export default function PriceAlertButton({ dealId, currentPrice }: PriceAlertButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [existingTargetPrice, setExistingTargetPrice] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      checkExistingAlert();
    }
  }, [user, dealId]);

  const checkExistingAlert = async () => {
    try {
      const alert = await getDealPriceAlert(dealId);
      if (alert) {
        setHasAlert(true);
        setExistingTargetPrice(alert.target_price);
        setTargetPrice((alert.target_price / 100).toFixed(2));
      }
    } catch (error) {
      console.error('Error checking alert:', error);
    }
  };

  const handleClick = () => {
    if (!user) {
      router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceInCents = Math.round(parseFloat(targetPrice) * 100);
    
    if (isNaN(priceInCents) || priceInCents <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (priceInCents >= currentPrice) {
      alert('Target price must be lower than the current price');
      return;
    }

    setLoading(true);
    
    try {
      await createPriceAlert(dealId, priceInCents);
      setHasAlert(true);
      setExistingTargetPrice(priceInCents);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Failed to create price alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full px-6 py-3 bg-white border-2 border-teal-900 text-teal-900 text-base font-semibold rounded-lg hover:bg-teal-50 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span>{hasAlert ? 'Update Price Alert' : 'Set Price Alert'}</span>
      </button>

      {hasAlert && existingTargetPrice && (
        <p className="text-sm text-teal-700 mt-2 text-center">
          You'll be notified when price drops to {formatPrice(existingTargetPrice)}
        </p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {hasAlert ? 'Update Price Alert' : 'Set Price Alert'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Enter your target price and we'll notify you when this deal drops to or below that price.
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Current price: <span className="font-semibold text-gray-900">{formatPrice(currentPrice)}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Price ($)
                </label>
                <input
                  type="number"
                  id="targetPrice"
                  step="0.01"
                  min="0.01"
                  max={(currentPrice / 100 - 0.01).toFixed(2)}
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter target price"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be lower than current price
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-teal-900 text-white rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : hasAlert ? 'Update Alert' : 'Set Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
