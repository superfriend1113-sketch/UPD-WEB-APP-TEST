/**
 * New Deal Page
 * Create a new deal submission
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DealForm from './DealForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Create Deal | Retailer Portal',
  description: 'Submit a new deal for approval',
};

async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export default async function NewDealPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('retailer_id')
    .eq('id', user.id)
    .single();

  // Layout already handles retailer_id check and status check
  // Get retailer info
  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', profile?.retailer_id)
    .single();

  // If retailer is not approved, redirect to dashboard
  if (retailer?.status !== 'approved') {
    redirect('/retailer/dashboard');
  }

  const categories = await getCategories();

  return (
    <div className="p-8 bg-[#f5f2eb] min-h-screen">
      {/* Admin Header */}
      <div className="mb-[28px]">
        <h1 className="font-display font-extrabold text-[36px] tracking-[0.5px] text-[#0d0d0d] leading-none">
          Upload Inventory
        </h1>
        <p className="text-[#888070] text-[13px] mt-[3px]">
          Add surplus items to the deal feed. They appear publicly once submitted.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[6px] border border-[#d6d0c4] p-8 shadow-[0_2px_12px_rgba(13,13,13,0.10)] max-w-[860px]">
        <h2 className="font-display font-extrabold text-[26px] tracking-[0.5px] mb-[4px] text-[#0d0d0d]">
          New Listing
        </h2>
        <p className="text-[#888070] text-[13px] mb-6">
          All fields required unless marked optional.
        </p>
        
        <DealForm retailerId={profile?.retailer_id || ''} categories={categories} />
      </div>
    </div>
  );
}
