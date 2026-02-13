/**
 * Access Control Utilities
 * Manages retailer access, role checking, and authorization
 */

import { supabase } from '@/lib/supabase/config';

export interface RetailerAccessResult {
  hasAccess: boolean;
  status: 'approved' | 'rejected' | 'pending' | null;
  rejectionReason?: string;
  rejectionDate?: string;
}

/**
 * Check if a user has retailer access
 */
export async function checkRetailerAccess(
  userId: string
): Promise<RetailerAccessResult> {
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role, retailer_status, rejection_reason, rejection_date')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return { hasAccess: false, status: null };
    }

    // Only users with retailer role can have retailer access
    if (profile.role !== 'retailer') {
      return { hasAccess: false, status: null };
    }

    // Check retailer status
    const hasAccess = profile.retailer_status === 'approved';

    return {
      hasAccess,
      status: profile.retailer_status,
      rejectionReason: profile.rejection_reason,
      rejectionDate: profile.rejection_date,
    };
  } catch (error) {
    console.error('Error checking retailer access:', error);
    return { hasAccess: false, status: null };
  }
}


/**
 * Enforce retailer access - throws error if access denied
 */
export async function enforceRetailerAccess(userId: string): Promise<void> {
  const result = await checkRetailerAccess(userId);

  if (!result.hasAccess) {
    if (result.status === 'rejected') {
      throw new Error('RETAILER_REJECTED');
    } else if (result.status === 'pending') {
      throw new Error('RETAILER_PENDING');
    } else {
      throw new Error('UNAUTHORIZED');
    }
  }
}

/**
 * Check if user has specific role
 */
export async function checkUserRole(
  userId: string,
  requiredRole: string
): Promise<boolean> {
  try {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();

    return profile?.role === requiredRole;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}
