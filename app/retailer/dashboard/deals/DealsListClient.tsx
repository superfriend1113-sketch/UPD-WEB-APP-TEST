'use client';

/**
 * Deals List Client Component
 * Handles client-side interactions for deal management
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/ui/Toast';

interface Deal {
  id: string;
  title?: string;
  product_name?: string;
  slug?: string;
  status: string;
  is_active: boolean;
  original_price?: number;
  discounted_price?: number;
  price?: number;
  quantity?: number;
  created_at: string;
  rejection_reason?: string;
}

interface DealsListClientProps {
  deals: Deal[];
}

export default function DealsListClient({ deals }: DealsListClientProps) {
  const router = useRouter();
  const [localDeals, setLocalDeals] = useState<Deal[]>(deals);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; show: boolean }>({
    message: '',
    type: 'info',
    show: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, show: true });
  };

  const handlePause = async (dealId: string) => {
    try {
      // Optimistic update
      setLocalDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === dealId ? { ...deal, is_active: false } : deal
        )
      );

      const response = await fetch(`/api/deals/${dealId}/pause`, {
        method: 'POST',
      });

      if (response.ok) {
        showToast('Deal paused successfully', 'success');
        router.refresh();
      } else {
        // Revert on error
        setLocalDeals(deals);
        showToast('Failed to pause deal', 'error');
      }
    } catch (error) {
      console.error('Error pausing deal:', error);
      setLocalDeals(deals);
      showToast('Error pausing deal', 'error');
    }
  };

  const handleResume = async (dealId: string) => {
    try {
      // Optimistic update
      setLocalDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === dealId ? { ...deal, is_active: true } : deal
        )
      );

      const response = await fetch(`/api/deals/${dealId}/resume`, {
        method: 'POST',
      });

      if (response.ok) {
        showToast('Deal resumed successfully', 'success');
        router.refresh();
      } else {
        // Revert on error
        setLocalDeals(deals);
        showToast('Failed to resume deal', 'error');
      }
    } catch (error) {
      console.error('Error resuming deal:', error);
      setLocalDeals(deals);
      showToast('Error resuming deal', 'error');
    }
  };

  const handleDelete = async (dealId: string) => {
    if (!confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/deals/${dealId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast('Deal deleted successfully', 'success');
        // Remove from local state immediately
        setLocalDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
        router.refresh();
      } else {
        showToast('Failed to delete deal', 'error');
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      showToast('Error deleting deal', 'error');
    }
  };

  return (
    <>
      <div className="bg-white border border-[#d6d0c4] rounded-[6px] shadow-[0_2px_12px_rgba(13,13,13,0.10)] overflow-hidden mb-6">
        <div className="px-[20px] py-[16px] border-b border-[#d6d0c4] flex items-center justify-between bg-[#ede9df]">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0d0d0d]">Inventory Table</h3>
            <p className="text-[12px] text-[#888070] mt-px">{localDeals.length} active listings</p>
          </div>
          <Link
            href="/retailer/dashboard/deals/new"
            className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#0d0d0d] text-white transition-all hover:bg-[#2a2a2a] hover:-translate-y-px tracking-[0.2px]"
          >
            + New Listing
          </Link>
        </div>

        {localDeals.length === 0 ? (
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
              {localDeals.map((deal) => {
                const discount = deal.original_price && deal.original_price > 0
                  ? Math.round(((deal.original_price - (deal.discounted_price || deal.price || 0)) / deal.original_price) * 100)
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
                      <div>
                        {deal.title || deal.product_name}
                        {deal.status === 'rejected' && deal.rejection_reason && (
                          <div className="mt-1 text-[11px] text-[#c8401a] bg-[#fef2f0] px-2 py-1 rounded border border-[#f0b0a0]">
                            <strong>Rejection reason:</strong> {deal.rejection_reason}
                          </div>
                        )}
                      </div>
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
                    <td className="px-[16px] py-[13px] align-middle">
                      <div className="flex gap-[6px] items-center">
                        <Link
                          href={`/retailer/dashboard/deals/${deal.id}/edit`}
                          className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-[1.5px] border-[#d6d0c4] bg-transparent text-[#0d0d0d] transition-all hover:border-[#0d0d0d] tracking-[0.2px]"
                        >
                          {deal.status === 'rejected' ? 'Edit & Resubmit' : 'Edit'}
                        </Link>
                        {isActive ? (
                          <button
                            onClick={() => handlePause(deal.id)}
                            className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-[1.5px] border-[#d6d0c4] bg-transparent text-[#0d0d0d] transition-all hover:border-[#0d0d0d] tracking-[0.2px]"
                          >
                            Pause
                          </button>
                        ) : deal.status === 'approved' ? (
                          <button
                            onClick={() => handleResume(deal.id)}
                            className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#1e8a52] text-white transition-all hover:bg-[#167343] tracking-[0.2px]"
                          >
                            Resume
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleDelete(deal.id)}
                          className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-[6px] font-body text-[12px] font-semibold cursor-pointer border-none bg-[#c8401a] text-white transition-all hover:bg-[#a83416] tracking-[0.2px]"
                        >
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

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}
