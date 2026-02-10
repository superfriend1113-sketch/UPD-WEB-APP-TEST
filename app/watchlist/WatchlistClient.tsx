'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import DealCard from '@/components/deals/DealCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Deal } from '@/types/deal';
import { getWatchlistDeals } from '@/lib/actions/watchlist';

export default function WatchlistClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/watchlist');
      return;
    }

    // Load watchlist deals
    if (user) {
      loadWatchlist();
    }
  }, [user, authLoading, router]);

  const loadWatchlist = async () => {
    try {
      setLoading(true);
      const watchlistDeals = await getWatchlistDeals();
      setDeals(watchlistDeals);
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = (dealId: string) => {
    // Optimistically remove from UI
    setDeals(prev => prev.filter(deal => deal.id !== dealId));
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlist</h1>
        <p className="text-gray-600">
          {deals.length} {deals.length === 1 ? 'deal' : 'deals'} saved
        </p>
      </div>

      {deals.length === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          description="Start adding deals to your watchlist to track them here."
          actionLabel="Browse Deals"
          actionHref="/deals"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <DealCard 
              key={deal.id} 
              deal={deal}
              onWatchlistChange={handleRemoveFromWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
