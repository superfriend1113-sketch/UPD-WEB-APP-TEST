/**
 * Edit Deal Page
 * Edit an existing deal
 */

import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import DealForm from '../../new/DealForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Edit Deal | Retailer Portal',
  description: 'Edit your deal',
};

async function getDeal(dealId: string, retailerId: string | null) {
  if (!retailerId) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', dealId)
    .eq('retailer_id', retailerId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

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

export default async function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

  if (!profile?.retailer_id) {
    redirect('/retailer/apply');
  }

  const deal = await getDeal(id, profile.retailer_id);

  if (!deal) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <div className="p-8 bg-[#f5f2eb] min-h-screen">
      {/* Header */}
      <div className="mb-[28px]">
        <h1 className="font-display font-extrabold text-[36px] tracking-[0.5px] text-[#0d0d0d] leading-none">
          Edit Listing
        </h1>
        <p className="text-[#888070] text-[13px] mt-[3px]">
          Update your deal information. Changes will require re-approval.
        </p>
      </div>

      {/* Status Messages */}
      {deal.status === 'rejected' && deal.rejection_reason && (
        <div className="mb-6 p-[12px_14px] bg-[#fef2f0] border border-[#f0b0a0] rounded-[6px] text-[13px] text-[#c8401a]">
          <div className="flex items-start gap-[10px]">
            <span className="text-[16px]">✕</span>
            <div>
              <strong className="font-semibold">Rejection Reason:</strong>
              <p className="mt-1">{deal.rejection_reason}</p>
            </div>
          </div>
        </div>
      )}

      {deal.status === 'pending' && (
        <div className="mb-6 p-[12px_14px] bg-[#fef8e7] border border-[#f0c040] rounded-[6px] text-[13px] text-[#856404]">
          <div className="flex items-start gap-[10px]">
            <span className="text-[16px]">⚠️</span>
            <div>
              <strong className="font-semibold">Pending Review:</strong>
              <p className="mt-1">This deal is currently being reviewed. Any changes will require re-approval.</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-[6px] border border-[#d6d0c4] p-8 shadow-[0_2px_12px_rgba(13,13,13,0.10)] max-w-[860px]">
        <h2 className="font-display font-extrabold text-[26px] tracking-[0.5px] mb-[4px] text-[#0d0d0d]">
          Update Listing
        </h2>
        <p className="text-[#888070] text-[13px] mb-6">
          All fields required unless marked optional.
        </p>
        
        <DealForm 
          retailerId={profile.retailer_id} 
          categories={categories}
          initialData={{
            id: deal.id,
            title: deal.title || deal.product_name,
            description: deal.description,
            original_price: deal.original_price,
            discounted_price: deal.discounted_price || deal.price,
            category_id: deal.category_id,
            deal_url: deal.deal_url || '',
            image_url: deal.image_url || '',
            images: deal.images || [],
            start_date: deal.start_date,
            end_date: deal.end_date,
            is_active: deal.is_active,
          }}
        />
      </div>
    </div>
  );
}
