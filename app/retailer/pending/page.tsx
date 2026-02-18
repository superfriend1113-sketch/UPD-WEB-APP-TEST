/**
 * Retailer Pending Approval Page
 * Shown to users whose retailer application is pending review
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Application Pending | Unlimited Perfect Deals',
  description: 'Your retailer application is under review',
};

export default async function PendingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user has a retailer account in profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('retailer_id')
    .eq('id', user.id)
    .maybeSingle();

  // Also check if there's a retailer record by user_id (in case retailer_id wasn't set in profile)
  const { data: retailerByUserId } = await supabase
    .from('retailers')
    .select('id, name, status, created_at, rejection_reason, approval_notes')
    .eq('user_id', user.id)
    .maybeSingle();

  // Determine the retailer to use
  let retailerId = profile?.retailer_id;
  let retailer = null;

  // If no retailer_id in profile but retailer exists by user_id, use that
  if (!retailerId && retailerByUserId) {
    retailerId = retailerByUserId.id;
    retailer = retailerByUserId;

    // Fix the profile to have the correct retailer_id
    await supabase
      .from('user_profiles')
      .update({ retailer_id: retailerId })
      .eq('id', user.id);
  } else if (retailerId) {
    // Get retailer data
    const { data: retailerData } = await supabase
      .from('retailers')
      .select('name, status, created_at, rejection_reason, approval_notes')
      .eq('id', retailerId)
      .maybeSingle();
    
    retailer = retailerData;
  }

  // If no retailer account exists, redirect to apply
  if (!retailerId || !retailer) {
    redirect('/retailer/apply');
  }

  // If approved, redirect to dashboard
  if (retailer.status === 'approved') {
    // Show a brief approval message before redirecting
    return (
      <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-4">
        <div className="max-w-[500px] text-center">
          <div className="w-[72px] h-[72px] bg-[#1e8a52] rounded-full flex items-center justify-center text-[32px] mx-auto mb-6">
            ✅
          </div>
          <h1 className="font-display text-[40px] mb-3">Application Approved!</h1>
          <p className="text-[#888070] text-[15px] leading-[1.7] mb-5">
            Congratulations! Your retailer application has been approved. You now have access to the retailer dashboard.
          </p>
          <span className="inline-flex items-center gap-[6px] text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] bg-[#f0faf5] text-[#1e8a52] border border-[#a8dfc0] uppercase tracking-[0.4px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#1e8a52]"></span>
            APPROVED
          </span>
          
          {/* Approval Notes */}
          {retailer.approval_notes && (
            <div className="mt-6 p-4 bg-[#f0faf5] border border-[#a8dfc0] rounded-[6px] text-left">
              <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#1e8a52]">
                Admin Notes
              </div>
              <div className="text-[14px] text-[#0d0d0d] leading-[1.6]">
                {retailer.approval_notes}
              </div>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-[#ede9df] border border-[#d6d0c4] rounded-[6px] text-left">
            <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#888070]">
              Business Name
            </div>
            <div className="font-semibold text-[16px]">{retailer.name}</div>
            <div className="text-[#888070] text-[13px] mt-[2px]">{user.email}</div>
          </div>
          
          <Link
            href="/retailer/dashboard"
            className="inline-block mt-6 px-[22px] py-[10px] bg-[#0d0d0d] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#2a2a2a] transition-all"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  // If rejected, show rejection message
  if (retailer.status === 'rejected') {
    return (
      <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-4">
        <div className="max-w-[500px] text-center">
          <div className="w-[72px] h-[72px] bg-[#c8401a] rounded-full flex items-center justify-center text-[32px] mx-auto mb-6">
            🚫
          </div>
          <h1 className="font-display text-[40px] mb-3">Application Rejected</h1>
          <p className="text-[#888070] text-[15px] leading-[1.7] mb-5">
            Unfortunately, your retailer application has been rejected. Please review the reason below.
          </p>
          <span className="inline-flex items-center gap-[6px] text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] bg-[#fef2f0] text-[#c8401a] border border-[#f0b0a0] uppercase tracking-[0.4px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#c8401a]"></span>
            REJECTED
          </span>
          
          {/* Rejection Reason */}
          {retailer.rejection_reason && (
            <div className="mt-6 p-4 bg-[#fef2f0] border border-[#f0b0a0] rounded-[6px] text-left">
              <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#c8401a]">
                Rejection Reason
              </div>
              <div className="text-[14px] text-[#0d0d0d] leading-[1.6]">
                {retailer.rejection_reason}
              </div>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-[#ede9df] border border-[#d6d0c4] rounded-[6px] text-left">
            <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#888070]">
              Business Name
            </div>
            <div className="font-semibold text-[16px]">{retailer.name}</div>
            <div className="text-[#888070] text-[13px] mt-[2px]">{user.email}</div>
          </div>
          
          <p className="text-[13px] text-[#888070] mt-6">
            If you believe this was an error or would like to discuss this decision, please contact our support team.
          </p>
          
          <Link
            href="/"
            className="inline-block mt-6 px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Show pending status
  return (
    <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-4">
      <div className="max-w-[500px] text-center">
        <div className="w-[72px] h-[72px] bg-[#0d0d0d] rounded-full flex items-center justify-center text-[32px] mx-auto mb-6">
          📋
        </div>
        <h1 className="font-display text-[40px] mb-3">Application Under Review</h1>
        <p className="text-[#888070] text-[15px] leading-[1.7] mb-5">
          Thank you for applying to Unlimited Perfect Deals. Your business is currently under review by our partner team.
        </p>
        <span className="inline-flex items-center gap-[6px] text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] bg-[#fef8e7] text-[#856404] border border-[#f0c040] uppercase tracking-[0.4px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#856404]"></span>
          PENDING REVIEW
        </span>
        <p className="text-[13px] text-[#888070] mt-5">
          You will receive an email notification once your application has been evaluated. Access to the retailer dashboard requires manual approval.
        </p>
        <div className="mt-8 p-4 bg-[#ede9df] border border-[#d6d0c4] rounded-[6px] text-left">
          <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#888070]">
            Submitted Business
          </div>
          <div className="font-semibold text-[16px]">{retailer?.name}</div>
          <div className="text-[#888070] text-[13px] mt-[2px]">{user.email}</div>
          <div className="text-[#888070] text-[12px] mt-3">
            Submitted: {new Date(retailer?.created_at || '').toLocaleDateString()}
          </div>
        </div>
        <Link
          href="/"
          className="inline-block mt-6 px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all"
        >
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}
