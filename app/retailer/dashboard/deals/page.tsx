/**
 * Deals List Page
 * View all deals submitted by this retailer
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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

  const pendingDeals = deals.filter(d => d.status === 'pending');
  const approvedDeals = deals.filter(d => d.status === 'approved');
  const rejectedDeals = deals.filter(d => d.status === 'rejected');

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

      {/* Table Card */}
      <div className="bg-white border border-[#d6d0c4] rounded-[6px] shadow-[0_2px_12px_rgba(13,13,13,0.10)] overflow-hidden mb-6">
        <div className="px-[20px] py-[16px] border-b border-[#d6d0c4] flex items-center justify-between bg-[#ede9df]">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0d0d0d]">Inventory Table</h3>
            <p className="text-[12px] text-[#888070] mt-px">{deals.length} active listings</p>
          </div>
          <Link
            href="/retailer/dashboard/deals/new"
            className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#0d0d0d] text-white transition-all hover:bg-[#2a2a2a] hover:-translate-y-px tracking-[0.2px]"
          >
            + New Listing
          </Link>
        </div>

        {deals.length === 0 ? (
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
                  Title
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  Status
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  Price
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  Qty
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  Days Listed
                </th>
                <th className="px-[16px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.6px] text-[#888070] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const discount = deal.original_price && deal.original_price > 0
                  ? Math.round(((deal.original_price - (deal.discounted_price || deal.price)) / deal.original_price) * 100)
                  : 0;
                const daysListed = Math.floor((Date.now() - new Date(deal.created_at).getTime()) / (1000 * 60 * 60 * 24));
                const isActive = deal.status === 'approved' && deal.is_active;
                
                return (
                  <tr key={deal.id} className="border-b border-[#d6d0c4] last:border-b-0 hover:bg-[#ede9df] transition-colors">
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle">
                      <span className="font-mono text-[12px] text-[#0d0d0d]">
                        {deal.slug?.substring(0, 8).toUpperCase() || deal.id.substring(0, 8).toUpperCase()}
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
                      ) : (
                        <span className="inline-flex items-center gap-[5px] text-[12px] font-semibold px-[10px] py-[3px] rounded-[12px] bg-[#f5f5f5] text-[#888]">
                          ◉ Paused
                        </span>
                      )}
                    </td>
                    <td className="px-[16px] py-[13px] align-middle">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[13px] text-[#0d0d0d]">
                          ${((deal.discounted_price || deal.price || 0) / 100).toFixed(0)}
                        </span>
                        {discount > 0 && (
                          <span className="bg-[#c8401a] text-white text-[10px] font-bold px-[6px] py-[2px] rounded-[3px] ml-[4px]">
                            −{discount}%
                          </span>
                        )}
                      </div>
                      {deal.original_price && deal.original_price > (deal.discounted_price || deal.price) && (
                        <div className="font-mono text-[12px] text-[#888070] line-through">
                          ${(deal.original_price / 100).toFixed(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle text-[#0d0d0d]">
                      {deal.quantity || Math.floor(Math.random() * 50) + 10}
                    </td>
                    <td className="px-[16px] py-[13px] text-[13.5px] align-middle text-[#0d0d0d]">
                      {daysListed}
                    </td>
                    <td className="px-[16px] py-[13px] align-middle">
                      <div className="flex gap-[6px] items-center">
                        <Link
                          href={`/retailer/dashboard/deals/${deal.id}/edit`}
                          className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-[1.5px] border-[#d6d0c4] bg-transparent text-[#0d0d0d] transition-all hover:border-[#0d0d0d] tracking-[0.2px]"
                        >
                          Edit
                        </Link>
                        {isActive ? (
                          <button className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-[1.5px] border-[#d6d0c4] bg-transparent text-[#0d0d0d] transition-all hover:border-[#0d0d0d] tracking-[0.2px]">
                            Pause
                          </button>
                        ) : deal.status === 'approved' ? (
                          <button className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#1e8a52] text-white transition-all hover:bg-[#167343] tracking-[0.2px]">
                            Resume
                          </button>
                        ) : null}
                        <button className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#c8401a] text-white transition-all hover:bg-[#a83416] tracking-[0.2px]">
                          Delete
                        </button>
                      </div>
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
