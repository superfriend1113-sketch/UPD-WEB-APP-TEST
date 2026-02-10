'use server';

import { createClient } from '@/lib/supabase/server';
import { Deal } from '@/types/deal';
import { revalidatePath } from 'next/cache';

/**
 * Get all deals in the user's watchlist
 */
export async function getWatchlistDeals(): Promise<Deal[]> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Get watchlist items for the user
  const { data: watchlistItems, error: watchlistError } = await supabase
    .from('watchlist_items')
    .select('deal_id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (watchlistError) {
    console.error('Error fetching watchlist:', watchlistError);
    throw new Error('Failed to fetch watchlist');
  }

  if (!watchlistItems || watchlistItems.length === 0) {
    return [];
  }

  // Get deal IDs from watchlist
  const dealIds = watchlistItems.map(item => item.deal_id);

  // Fetch all deals in watchlist with their relationships
  const { data: deals, error: dealsError } = await supabase
    .from('deals')
    .select(`
      *,
      retailer:retailers(*),
      category:categories(*)
    `)
    .in('id', dealIds)
    .eq('is_active', true);

  if (dealsError) {
    console.error('Error fetching deals:', dealsError);
    throw new Error('Failed to fetch deals');
  }

  return (deals as Deal[]) || [];
}

/**
 * Add a deal to the user's watchlist
 */
export async function addToWatchlist(dealId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Check if already in watchlist
  const { data: existing } = await supabase
    .from('watchlist_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('deal_id', dealId)
    .single();

  if (existing) {
    return true; // Already in watchlist
  }

  // Add to watchlist
  const { error } = await supabase
    .from('watchlist_items')
    .insert({
      user_id: user.id,
      deal_id: dealId,
    });

  if (error) {
    console.error('Error adding to watchlist:', error);
    throw new Error('Failed to add to watchlist');
  }

  revalidatePath('/watchlist');
  return true;
}

/**
 * Remove a deal from the user's watchlist
 */
export async function removeFromWatchlist(dealId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Remove from watchlist
  const { error } = await supabase
    .from('watchlist_items')
    .delete()
    .eq('user_id', user.id)
    .eq('deal_id', dealId);

  if (error) {
    console.error('Error removing from watchlist:', error);
    throw new Error('Failed to remove from watchlist');
  }

  revalidatePath('/watchlist');
  return true;
}

/**
 * Check if a deal is in the user's watchlist
 */
export async function isInWatchlist(dealId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return false; // Not authenticated means not in watchlist
  }

  const { data, error } = await supabase
    .from('watchlist_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('deal_id', dealId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}

/**
 * Get watchlist item IDs for the current user
 */
export async function getWatchlistDealIds(): Promise<string[]> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('watchlist_items')
    .select('deal_id')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching watchlist IDs:', error);
    return [];
  }

  return data?.map(item => item.deal_id) || [];
}
