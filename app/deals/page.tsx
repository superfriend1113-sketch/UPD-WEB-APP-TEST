/**
 * Deals Feed Page
 * Displays all active deals with filtering capabilities
 */

import type { Metadata } from 'next';
import { getCategories } from '@/lib/firestore';
import DealsPageClient from './DealsPageClient';

interface DealsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: DealsPageProps): Promise<Metadata> {
  const params = await searchParams;
  
  if (params.category) {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.category);

    if (category) {
      return {
        title: `${category.name} Deals`,
        description: `Browse the best ${category.name.toLowerCase()} deals from top retailers.`,
        openGraph: {
          title: `${category.name} Deals`,
          description: `Browse the best ${category.name.toLowerCase()} deals from top retailers.`,
        },
      };
    }
  }

  return {
    title: 'All Deals',
    description: 'Browse all available deals from top retailers.',
    openGraph: {
      title: 'All Deals',
      description: 'Browse all available deals from top retailers.',
    },
  };
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  return <DealsPageClient categoryParam={params.category || null} />;
}
