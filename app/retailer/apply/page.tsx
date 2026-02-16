/**
 * Retailer Application Page
 * Multi-step form for users to apply as retailers
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import RetailerApplicationForm from './RetailerApplicationForm';

export const metadata = {
  title: 'Apply as Retailer | Unlimited Perfect Deals',
  description: 'Turn excess inventory into revenue',
};

export default async function RetailerApplyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user already has a retailer account in profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('retailer_id')
    .eq('id', user.id)
    .maybeSingle();

  // Also check if there's a retailer record by user_id (in case retailer_id wasn't set in profile)
  const { data: retailerByUserId } = await supabase
    .from('retailers')
    .select('id, status')
    .eq('user_id', user.id)
    .maybeSingle();

  // Determine the retailer to use
  let retailerId = profile?.retailer_id;
  let retailerStatus = null;

  // If no retailer_id in profile but retailer exists by user_id, use that
  if (!retailerId && retailerByUserId) {
    retailerId = retailerByUserId.id;
    retailerStatus = retailerByUserId.status;

    // Fix the profile to have the correct retailer_id
    await supabase
      .from('user_profiles')
      .update({ retailer_id: retailerId })
      .eq('id', user.id);
  } else if (retailerId) {
    // Get retailer status
    const { data: retailer } = await supabase
      .from('retailers')
      .select('status')
      .eq('id', retailerId)
      .maybeSingle();
    
    retailerStatus = retailer?.status;
  }

  // If retailer exists, redirect based on status
  if (retailerId && retailerStatus) {
    // If approved, go to dashboard
    if (retailerStatus === 'approved') {
      redirect('/retailer/dashboard');
    }
    
    // If pending or rejected, go to pending page
    if (retailerStatus === 'pending' || retailerStatus === 'rejected') {
      redirect('/retailer/pending');
    }
  }

  // No retailer account exists - show application form
  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <RetailerApplicationForm userEmail={user.email || ''} userId={user.id} />
    </div>
  );
}
