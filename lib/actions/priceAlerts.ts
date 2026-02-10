'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

/**
 * Get all price alerts for the current user
 */
export async function getPriceAlerts(): Promise<PriceAlert[]> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Get price alerts for the user with deal information
  const { data: alerts, error } = await supabase
    .from('price_alerts')
    .select(`
      id,
      deal_id,
      target_price,
      created_at,
      notified,
      deal:deals (
        id,
        product_name,
        price,
        image_url,
        is_active
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching price alerts:', error);
    throw new Error('Failed to fetch price alerts');
  }

  return (alerts as unknown as PriceAlert[]) || [];
}

/**
 * Create a new price alert for a deal
 */
export async function createPriceAlert(dealId: string, targetPrice: number): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Check if alert already exists for this deal
  const { data: existing } = await supabase
    .from('price_alerts')
    .select('id')
    .eq('user_id', user.id)
    .eq('deal_id', dealId)
    .single();

  if (existing) {
    // Update existing alert
    const { error } = await supabase
      .from('price_alerts')
      .update({ 
        target_price: targetPrice,
        notified: false // Reset notified flag when target changes
      })
      .eq('id', existing.id);

    if (error) {
      console.error('Error updating price alert:', error);
      throw new Error('Failed to update price alert');
    }
  } else {
    // Create new alert
    const { error } = await supabase
      .from('price_alerts')
      .insert({
        user_id: user.id,
        deal_id: dealId,
        target_price: targetPrice,
        notified: false,
      });

    if (error) {
      console.error('Error creating price alert:', error);
      throw new Error('Failed to create price alert');
    }
  }

  revalidatePath('/alerts');
  return true;
}

/**
 * Delete a price alert
 */
export async function deletePriceAlert(alertId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Delete the alert (RLS ensures user can only delete their own)
  const { error } = await supabase
    .from('price_alerts')
    .delete()
    .eq('id', alertId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting price alert:', error);
    throw new Error('Failed to delete price alert');
  }

  revalidatePath('/alerts');
  return true;
}

/**
 * Get price alert for a specific deal (if exists)
 */
export async function getDealPriceAlert(dealId: string): Promise<PriceAlert | null> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from('price_alerts')
    .select(`
      id,
      deal_id,
      target_price,
      created_at,
      notified,
      deal:deals (
        id,
        product_name,
        price,
        image_url,
        is_active
      )
    `)
    .eq('user_id', user.id)
    .eq('deal_id', dealId)
    .single();

  if (error) {
    return null;
  }

  return data as unknown as PriceAlert;
}

/**
 * Check if a price alert exists for a deal
 */
export async function hasPriceAlert(dealId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return false;
  }

  const { data, error } = await supabase
    .from('price_alerts')
    .select('id')
    .eq('user_id', user.id)
    .eq('deal_id', dealId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}
