/**
 * Account Settings Page
 * Pixel-perfect implementation matching UPD design
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Account Settings | Retailer Portal',
  description: 'Manage your business profile and platform preferences',
};

export default async function SettingsPage() {
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
  const { data: retailer } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', profile?.retailer_id)
    .single();

  return (
    <div className="p-8 bg-[#f5f2eb] min-h-screen">
      {/* Admin Header */}
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-[36px] tracking-[0.5px] text-[#0d0d0d] leading-none">
          ACCOUNT SETTINGS
        </h1>
        <p className="text-[13px] text-[#888070] mt-[6px]">
          Manage your business profile and platform preferences.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#d6d0c4] rounded-[6px] shadow-[0_2px_12px_rgba(13,13,13,0.10)] p-8 max-w-[860px]">
        <h2 className="font-display font-extrabold text-[22px] tracking-[0.3px] text-[#0d0d0d] mb-4">
          Business Profile
        </h2>
        
        <SettingsForm retailer={retailer} userEmail={user.email || ''} />
      </div>
    </div>
  );
}
