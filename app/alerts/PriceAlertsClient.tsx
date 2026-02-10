'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { getPriceAlerts, deletePriceAlert } from '@/lib/actions/priceAlerts';
import { formatPrice } from '@/types/deal';

interface PriceAlert {
  id: string;
  deal_id: string;
  target_price: number;
  created_at: string;
  notified: boolean;
  deal: {
    id: string;
    product_name: string;
    price: number;
    image_url: string;
    is_active: boolean;
  };
}

export default function PriceAlertsClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/alerts');
      return;
    }

    // Load price alerts
    if (user) {
      loadAlerts();
    }
  }, [user, authLoading, router]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const userAlerts = await getPriceAlerts();
      setAlerts(userAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await deletePriceAlert(alertId);
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Alerts</h1>
        <p className="text-gray-600">
          Get notified when deals drop to your target price. {alerts.length} active {alerts.length === 1 ? 'alert' : 'alerts'}.
        </p>
      </div>

      {alerts.length === 0 ? (
        <EmptyState
          title="No price alerts set"
          description="Start adding price alerts on deal pages to get notified when prices drop."
          actionLabel="Browse Deals"
          actionHref="/deals"
        />
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Deal Image */}
                <Link href={`/deals/${alert.deal.id}`} className="shrink-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={alert.deal.image_url}
                      alt={alert.deal.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Alert Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/deals/${alert.deal.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2"
                  >
                    {alert.deal.product_name}
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Current: </span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(alert.deal.price)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Target: </span>
                      <span className="font-medium text-teal-600">
                        {formatPrice(alert.target_price)}
                      </span>
                    </div>
                    {alert.deal.price <= alert.target_price && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Target Reached!
                      </span>
                    )}
                    {!alert.deal.is_active && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        Deal Expired
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Created {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Delete alert"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
