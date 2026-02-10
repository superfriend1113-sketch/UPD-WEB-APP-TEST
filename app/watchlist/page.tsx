import { Metadata } from 'next';
import WatchlistClient from './WatchlistClient';

export const metadata: Metadata = {
  title: 'My Watchlist | Unlimited Perfect Deals',
  description: 'Track and manage your favorite deals.',
};

export default function WatchlistPage() {
  return <WatchlistClient />;
}
