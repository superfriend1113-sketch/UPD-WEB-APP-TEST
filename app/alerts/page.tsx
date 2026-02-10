import { Metadata } from 'next';
import PriceAlertsClient from './PriceAlertsClient';

export const metadata: Metadata = {
  title: 'Price Alerts | Unlimited Perfect Deals',
  description: 'Manage your price drop notifications.',
};

export default function PriceAlertsPage() {
  return <PriceAlertsClient />;
}
