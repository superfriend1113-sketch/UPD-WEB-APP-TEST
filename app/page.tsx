/**
 * Landing Page
 * Main entry point for the Unlimited Perfect Deals application
 */

import Hero from '@/components/landing/Hero';
import FeaturedDeals from '@/components/landing/FeaturedDeals';
import CategoryNav from '@/components/landing/CategoryNav';
import { getFeaturedDeals, getCategories } from '@/lib/firestore';

export default async function Home() {
  // Fetch data on server
  const [featuredDeals, categories] = await Promise.all([
    getFeaturedDeals(6),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryNav categories={categories} />
      <FeaturedDeals deals={featuredDeals} />
    </main>
  );
}
