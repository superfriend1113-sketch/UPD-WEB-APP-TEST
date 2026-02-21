/**
 * Deals List Page
 * View all deals submitted by this retailer
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DealsListClient from './DealsListClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Deals | Retailer Portal',
  description: 'Manage your submitted deals',
};

async function getRetailerDeals(retailerId: string | null) {
  if (!retailerId) {
    return [];
  }

  const supabase = await createClient();
  const { data: deals, error } = await supabase
    .from('deals')
    .select('*')
    .eq('retailer_id', retailerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }

  return deals as any[];
}

export default async function DealsPage() {
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
  const deals = await getRetailerDeals(profile?.retailer_id || null);

  return (
    <div className="p-8 bg-[#f5f2eb] min-h-screen">
      {/* Admin Header */}
      <div className="mb-[28px]">
        <h1 className="font-display font-extrabold text-[36px] tracking-[0.5px] text-[#0d0d0d] leading-none">
          My Listings
        </h1>
        <p className="text-[#888070] text-[13px] mt-[3px]">
          Manage all inventory currently listed on the platform.
        </p>
      </div>

      <DealsListClient deals={deals} />
    </div>
  );
}
