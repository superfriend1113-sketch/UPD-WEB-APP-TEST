/**
 * Dashboard Home Page
 * Pixel-perfect implementation matching UPD design
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | Retailer Portal',
  description: 'Manage your deals and track performance',
};

async function getDashboardMetrics(retailerId: string | null) {
  if (!retailerId) {
    return {
      totalDeals: 0,
      activeDeals: 0,
      pausedDeals: 0,
      pendingDeals: 0,
      rejectedDeals: 0,
      totalUnits: 0,
      recoveryValue: 0,
      recentDeals: [],
    };
  }

  const supabase = await createClient();
  
  // Fetch all deals for this retailer
  const { data: allDeals, error } = await supabase
    .from('deals')
    .select('*')
    .eq('retailer_id', retailerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return {
      totalDeals: 0,
      activeDeals: 0,
      pausedDeals: 0,
      pendingDeals: 0,
      rejectedDeals: 0,
      totalUnits: 0,
      recoveryValue: 0,
      recentDeals: [],
    };
  }

  const deals = allDeals || [];
  
  // Calculate metrics
  const activeDeals = deals.filter(d => d.status === 'approved' && d.is_active).length;
  const pausedDeals = deals.filter(d => d.status === 'approved' && !d.is_active).length;
  const pendingDeals = deals.filter(d => d.status === 'pending').length;
  const rejectedDeals = deals.filter(d => d.status === 'rejected').length;
  
  // Calculate total units from quantity field
  const totalUnits = deals.reduce((sum, d) => sum + (d.quantity || 0), 0);
  
  // Calculate recovery value (total value of all inventory)
  const recoveryValue = deals.reduce((sum, d) => {
    const price = d.discounted_price || d.price || 0;
    const quantity = d.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  return {
    totalDeals: deals.length,
    activeDeals,
    pausedDeals,
    pendingDeals,
    rejectedDeals,
    totalUnits,
    recoveryValue,
    recentDeals: deals.slice(0, 3),
  };
}

function calculateDaysListed(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function calculateDiscount(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice === 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default async function DashboardPage() {
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
  // Just fetch the retailer data here
  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', profile?.retailer_id)
    .single();

  const metrics = await getDashboardMetrics(profile?.retailer_id || null);

  return (
    <div className="p-8 bg-[#f5f2eb] min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-[#0d0d0d] rounded-[6px] p-[20px_24px] mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-[22px] tracking-[0.5px] text-[#f5f2eb] leading-none">
            WELCOME TO UNLIMITED PERFECT DEALS
          </h2>
          <p className="text-[13px] text-[#aaa] mt-[3px]">
            You are part of a controlled recovery network designed to maximize value while protecting brand integrity.
          </p>
        </div>
        <Link
          href="/retailer/dashboard/deals/new"
          className="px-6 py-[10px] bg-[#0d0d0d] text-white font-semibold rounded-[6px] hover:bg-[#2a2a2a] hover:-translate-y-px transition-all text-[14px] whitespace-nowrap"
        >
          + Upload Inventory
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-6">
        {/* Active Listings */}
        <div className="bg-white border border-[#d6d0c4] rounded-[6px] p-[18px_20px] shadow-[0_2px_12px_rgba(13,13,13,0.10)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#888070]">
            ACTIVE LISTINGS
          </div>
          <div className="font-display text-[32px] tracking-[0.5px] leading-none text-[#0d0d0d] mt-[4px]">
            {metrics.activeDeals}
          </div>
          <div className="text-[12px] text-[#888070] mt-[3px]">
            {metrics.pausedDeals} paused
          </div>
        </div>

        {/* Total Units */}
        <div className="bg-white border border-[#d6d0c4] rounded-[6px] p-[18px_20px] shadow-[0_2px_12px_rgba(13,13,13,0.10)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#888070]">
            TOTAL UNITS
          </div>
          <div className="font-display text-[32px] tracking-[0.5px] leading-none text-[#0d0d0d] mt-[4px]">
            {metrics.totalUnits.toLocaleString()}
          </div>
          <div className="text-[12px] text-[#888070] mt-[3px]">
            Across {metrics.totalDeals} SKUs
          </div>
        </div>

        {/* Est. Recovery Value */}
        <div className="bg-white border border-[#d6d0c4] rounded-[6px] p-[18px_20px] shadow-[0_2px_12px_rgba(13,13,13,0.10)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#888070]">
            EST. RECOVERY VALUE
          </div>
          <div className="font-display text-[32px] tracking-[0.5px] leading-none text-[#0d0d0d] mt-[4px]">
            ${metrics.recoveryValue.toLocaleString()}
          </div>
          <div className="text-[12px] text-[#888070] mt-[3px]">
            At current pricing
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white border border-[#d6d0c4] rounded-[6px] p-[18px_20px] shadow-[0_2px_12px_rgba(13,13,13,0.10)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#888070]">
            STATUS DISTRIBUTION
          </div>
          <div className="mt-[4px] space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#0d0d0d]">Active</span>
              <strong className="font-semibold">{metrics.activeDeals}</strong>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#0d0d0d]">Paused</span>
              <strong className="font-semibold">{metrics.pausedDeals}</strong>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#0d0d0d]">Pending</span>
              <strong className="font-semibold">{metrics.pendingDeals}</strong>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#0d0d0d]">Rejected</span>
              <strong className="font-semibold">{metrics.rejectedDeals}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#888070] mb-[14px] pb-[8px] border-b border-[#d6d0c4]">
        RECENT ACTIVITY
      </div>

      {/* Latest Listings Table */}
      <div className="bg-white border border-[#d6d0c4] rounded-[6px] shadow-[0_2px_12px_rgba(13,13,13,0.10)] overflow-hidden">
        <div className="px-[20px] py-[16px] border-b border-[#d6d0c4] flex items-center justify-between bg-[#ede9df]">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0d0d0d]">Latest Listings</h3>
          </div>
          <Link
            href="/retailer/dashboard/deals"
            className="px-[14px] py-[6px] text-[12px] bg-transparent text-[#0d0d0d] border-[1.5px] border-[#d6d0c4] rounded-[6px] hover:border-[#0d0d0d] transition-all font-semibold tracking-[0.2px]"
          >
            View All →
          </Link>
        </div>

        {metrics.recentDeals.length === 0 ? (
          <div className="text-center py-[60px] px-[20px] text-[#888070]">
            <span className="text-[40px] block mb-[12px]">📦</span>
            <h3 className="text-[18px] text-[#0d0d0d] mb-[6px] font-semibold">No listings yet</h3>
            <p className="text-[14px]">Upload your first inventory item to get started.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#ede9df] border-b border-[#d6d0c4]">
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  SKU
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  TITLE
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  STATUS
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  PRICE
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  QTY
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  DAYS LISTED
                </th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentDeals.map((deal) => {
                const discount = deal.original_price && deal.original_price > 0
                  ? Math.round(((deal.original_price - (deal.discounted_price || deal.price || 0)) / deal.original_price) * 100)
                  : 0;
                const daysListed = calculateDaysListed(deal.created_at);
                const isActive = deal.status === 'approved' && deal.is_active;
                
                return (
                  <tr key={deal.id} className="border-b border-[#d6d0c4] last:border-b-0 hover:bg-[#ede9df] transition-colors">
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle">
                      <span className="font-mono text-[12px] text-[#0d0d0d]">
                        {deal.sku || deal.slug?.substring(0, 8).toUpperCase() || deal.id.substring(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-[16px] py-[13px] text-[13.5px] text-[#0d0d0d] align-middle">
                      {deal.title || deal.product_name}
                    </td>
                    <td className="px-[16px] py-[13px] align-middle">
                      {isActive ? (
                        <span className="inline-flex items-center gap-[5px] text-[12px] font-semibold px-[10px] py-[3px] rounded-[12px] bg-[#f0faf5] text-[#1e8a52]">
                          ● Active
                        </span>
                      ) : deal.status === 'pending' ? (
                        <span className="inline-flex items-center gap-[5px] text-[12px] font-semibold px-[10px] py-[3px] rounded-[12px] bg-[#fef8e7] text-[#856404]">
                          ⏱ Pending
                        </span>
                      ) : deal.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-[5px] text-[12px] font-semibold px-[10px] py-[3px] rounded-[12px] bg-[#fef2f0] text-[#c8401a]">
                          ✕ Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-[5px] text-[12px] font-semibold px-[10px] py-[3px] rounded-[12px] bg-[#f5f5f5] text-[#888]">
                          ◉ Paused
                        </span>
                      )}
                    </td>
                    <td className="px-[16px] py-[13px] align-middle">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[13px] text-[#0d0d0d]">
                          ${(deal.discounted_price || deal.price || 0).toFixed(0)}
                        </span>
                        {discount > 0 && (
                          <span className="bg-[#c8401a] text-white text-[10px] font-bold px-[6px] py-[2px] rounded-[3px] ml-[4px]">
                            −{discount}%
                          </span>
                        )}
                      </div>
                      {deal.original_price && deal.original_price > (deal.discounted_price || deal.price || 0) && (
                        <div className="font-mono text-[12px] text-[#888070] line-through">
                          ${deal.original_price.toFixed(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle text-[#0d0d0d]">
                      {deal.quantity || 1}
                    </td>
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle text-[#0d0d0d]">
                      {daysListed}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
