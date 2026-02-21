/**
 * Supabase Data Fetching Utilities
 * Functions for querying deals, categories, and retailers from Supabase
 */

import { supabase } from './supabase/config';
import type { Deal } from '../types/deal';
import type { Category } from '../types/category';
import type { Retailer } from '../types/retailer';

/**
 * Transform database deal record to Deal type
 * Converts snake_case to camelCase and prices from dollars to cents
 */
function transformDealFromDB(deal: any): Deal {
  return {
    id: deal.id,
    productName: deal.title || deal.product_name,
    description: deal.description,
    imageUrl: deal.images?.[0] || deal.image_url || '/placeholder-deal.jpg',
    dealUrl: deal.deal_url,
    category: deal.category,
    retailer: deal.retailer,
    retailerId: deal.retailer_id,
    price: Math.round((deal.discounted_price || deal.price || 0) * 100), // Convert dollars to cents
    originalPrice: Math.round((deal.original_price || 0) * 100), // Convert dollars to cents
    savingsPercentage: deal.savings_percentage,
    expirationDate: new Date(deal.expiration_date || deal.end_date),
    slug: deal.slug,
    isActive: deal.is_active,
    isFeatured: deal.is_featured,
    status: deal.status,
    approvedAt: deal.approved_at,
    approvedBy: deal.approved_by,
    rejectionReason: deal.rejection_reason,
    metaDescription: deal.meta_description,
    createdAt: new Date(deal.created_at),
    updatedAt: new Date(deal.updated_at),
    createdBy: deal.created_by,
    viewCount: deal.view_count || 0,
    clickCount: deal.click_count || 0,
  } as Deal;
}

/**
 * Get all active deals from Supabase
 * Filters for active status, approved deals, and non-expired deals
 */
export async function getActiveDeals(): Promise<Deal[]> {
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'approved')
      .gt('expiration_date', new Date().toISOString())
      .order('created_at', { ascending: false });
    
    if (error) {
      // If database isn't set up yet (e.g., during build), return empty
      if (error.code === '42703' || error.code === '42P01') {
        console.warn('Database not set up yet, returning empty deals');
        return [];
      }
      console.error('Supabase error:', error);
      throw new Error('Failed to load deals. Please try again later.');
    }
    
    return (data || []).map(transformDealFromDB);
  } catch (error) {
    console.error('Error fetching active deals:', error);
    throw new Error('Failed to load deals. Please try again later.');
  }
}

/**
 * Get featured deals from Supabase
 * @param limit - Maximum number of featured deals to return
 */
export async function getFeaturedDeals(limit: number = 6): Promise<Deal[]> {
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .eq('status', 'approved')
      .gt('expiration_date', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      // If database isn't set up yet (e.g., during build), return empty
      if (error.code === '42703' || error.code === '42P01') {
        console.warn('Database not set up yet, returning empty featured deals');
        return [];
      }
      console.error('Supabase error:', error);
      throw new Error('Failed to load featured deals. Please try again later.');
    }
    
    return (data || []).map(transformDealFromDB);
  } catch (error) {
    console.error('Error fetching featured deals:', error);
    throw new Error('Failed to load featured deals. Please try again later.');
  }
}

/**
 * Get all categories from Supabase
 * Ordered by display order
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to load categories. Please try again later.');
    }
    
    return (data || []).map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      order: cat.order,
      isActive: cat.is_active,
      dealCount: cat.deal_count,
      createdAt: new Date(cat.created_at),
      updatedAt: new Date(cat.updated_at),
    })) as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to load categories. Please try again later.');
  }
}

/**
 * Get a single deal by ID
 * @param id - Deal document ID
 */
export async function getDeal(id: string): Promise<Deal | null> {
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return transformDealFromDB(data);
  } catch (error) {
    console.error(`Error fetching deal ${id}:`, error);
    throw new Error('Failed to load deal details. Please try again later.');
  }
}

/**
 * Get a single retailer by slug
 * @param slug - Retailer slug
 */
export async function getRetailer(slug: string): Promise<Retailer | null> {
  try {
    const { data, error } = await supabase
      .from('retailers')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      logoUrl: data.logo_url,
      websiteUrl: data.website_url,
      affiliateId: data.affiliate_id,
      isActive: data.is_active,
      dealCount: data.deal_count,
      commission: data.commission,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Retailer;
  } catch (error) {
    console.error(`Error fetching retailer ${slug}:`, error);
    throw new Error('Failed to load retailer information. Please try again later.');
  }
}

/**
 * Check if a deal is expired
 * @param expirationDate - Deal expiration date
 */
export function isExpired(expirationDate: Date | any): boolean {
  const now = new Date();
  if (expirationDate instanceof Date) {
    return expirationDate <= now;
  }
  return true;
}

/**
 * Filter state interface
 */
export interface FilterState {
  categorySlug: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

/**
 * Apply client-side filters to deals array
 * @param deals - Array of deals to filter
 * @param filters - Filter criteria
 */
export function applyFilters(deals: Deal[], filters: FilterState): Deal[] {
  return deals.filter(deal => {
    // Category filter
    if (filters.categorySlug && deal.category !== filters.categorySlug) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== null && deal.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && deal.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

/**
 * Calculate deal counts by category
 * @param deals - Array of deals
 * @param categories - Array of categories
 */
export function calculateCategoryCounts(
  deals: Deal[],
  categories: Category[]
): Record<string, number> {
  const counts: Record<string, number> = {};

  categories.forEach(category => {
    counts[category.slug] = deals.filter(
      deal => deal.category === category.slug
    ).length;
  });

  return counts;
}
