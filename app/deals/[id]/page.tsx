/**
 * Deal Detail Page
 * Displays comprehensive information about a single deal
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DealDetail from '@/components/detail/DealDetail';
import { getDeal, getRetailer } from '@/lib/firestore';

interface DealDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: DealDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const deal = await getDeal(id);

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  return {
    title: `${deal.productName} - Save ${deal.savingsPercentage}%`,
    description: deal.description,
    openGraph: {
      title: `${deal.productName} - Save ${deal.savingsPercentage}%`,
      description: deal.description,
      images: [
        {
          url: deal.imageUrl,
          width: 800,
          height: 600,
          alt: deal.productName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${deal.productName} - Save ${deal.savingsPercentage}%`,
      description: deal.description,
      images: [deal.imageUrl],
    },
  };
}

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  // Fetch deal data
  const deal = await getDeal(id);

  // Handle deal not found
  if (!deal) {
    notFound();
  }

  // Fetch retailer data
  const retailer = await getRetailer(deal.retailer);

  // Handle retailer not found
  if (!retailer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <DealDetail deal={deal} retailer={retailer} />
      </div>
    </main>
  );
}
