/**
 * Deal Detail Page
 * Displays comprehensive information about a single deal
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DealDetail from '@/components/detail/DealDetail';
import { createClient } from '@/lib/supabase/server';

interface DealDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: DealDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: deal } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .eq('is_active', true)
    .single();

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  const savingsPercentage = deal.original_price && deal.original_price > 0
    ? Math.round(((deal.original_price - (deal.discounted_price || deal.price || 0)) / deal.original_price) * 100)
    : 0;

  const imageUrl = deal.images?.[0] || deal.image_url || '/placeholder-deal.jpg';
  const title = deal.title || deal.product_name || 'Deal';

  return {
    title: `${title} - Save ${savingsPercentage}%`,
    description: deal.description,
    openGraph: {
      title: `${title} - Save ${savingsPercentage}%`,
      description: deal.description,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ] : [],
    },
  };
}

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  // First, try to fetch the deal without status/active filters to see if it exists
  const { data: dealCheck, error: checkError } = await supabase
    .from('deals')
    .select('id, status, is_active, title, product_name')
    .eq('id', id)
    .single();

  console.log('Deal check:', { dealCheck, checkError, id });

  // Fetch deal data with related information
  const { data: dealData, error } = await supabase
    .from('deals')
    .select(`
      *,
      categories (
        id,
        name,
        slug
      ),
      retailers (
        id,
        name,
        website_url,
        status
      )
    `)
    .eq('id', id)
    .single();

  // Log for debugging
  if (error) {
    console.error('Error fetching deal:', error);
  }
  
  if (!dealData) {
    console.log('Deal not found for ID:', id);
  } else {
    console.log('Deal found:', {
      id: dealData.id,
      status: dealData.status,
      is_active: dealData.is_active,
      title: dealData.title || dealData.product_name
    });
  }

  // Handle deal not found
  if (!dealData) {
    notFound();
  }

  // Check if deal is approved and active
  if (dealData.status !== 'approved' || !dealData.is_active) {
    console.log('Deal exists but not approved/active:', {
      status: dealData.status,
      is_active: dealData.is_active
    });
    notFound();
  }

  // Convert prices from dollars to cents (database stores NUMERIC dollars, Deal type expects INTEGER cents)
  const priceInCents = Math.round((dealData.discounted_price || dealData.price || 0) * 100);
  const originalPriceInCents = Math.round((dealData.original_price || 0) * 100);

  // Calculate savings percentage
  const savingsPercentage = originalPriceInCents > 0
    ? Math.round(((originalPriceInCents - priceInCents) / originalPriceInCents) * 100)
    : 0;

  // Transform database data to Deal type
  const deal = {
    id: dealData.id,
    productName: dealData.title || dealData.product_name || '',
    description: dealData.description || '',
    imageUrl: dealData.images?.[0] || dealData.image_url || '/placeholder-deal.jpg',
    price: priceInCents,
    originalPrice: originalPriceInCents,
    savingsPercentage,
    category: dealData.categories?.slug || '',
    retailer: dealData.retailers?.name || '',
    retailerId: dealData.retailer_id,
    dealUrl: dealData.retailers?.website_url || '#',
    expirationDate: dealData.expiration_date || dealData.end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: dealData.is_active || false,
    isFeatured: false,
    status: dealData.status as 'pending' | 'approved' | 'rejected',
    approvedAt: dealData.approved_at,
    approvedBy: dealData.approved_by,
    rejectionReason: dealData.rejection_reason,
    createdAt: dealData.created_at,
    updatedAt: dealData.updated_at,
    createdBy: dealData.created_by,
    viewCount: 0,
    clickCount: 0,
    slug: dealData.id,
  };

  // Transform retailer data
  const retailer = {
    id: dealData.retailers?.id || '',
    name: dealData.retailers?.name || '',
    slug: dealData.retailers?.id || '',
    logoUrl: '',
    websiteUrl: dealData.retailers?.website_url || '',
    isActive: dealData.retailers?.status === 'approved',
    dealCount: 0,
    commission: '',
    status: dealData.retailers?.status as 'pending' | 'approved' | 'rejected',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <DealDetail deal={deal} retailer={retailer} />
      </div>
    </main>
  );
}
