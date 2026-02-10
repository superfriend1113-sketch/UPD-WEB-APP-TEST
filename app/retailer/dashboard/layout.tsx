/**
 * Dashboard Layout
 * Protected layout for approved retailer dashboard
 * Includes sidebar navigation matching retailer-management design
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import RetailerSidebar from '@/components/layout/RetailerSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user profile and retailer status
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id')
    .eq('id', user.id)
    .single();

  // Double-check user is a retailer (should already be checked by parent layout)
  if (!profile || profile.role !== 'retailer') {
    redirect('/auth/login?error=unauthorized');
  }

  // Check retailer approval status
  if (profile.retailer_id) {
    const { data: retailer } = await supabase
      .from('retailers')
      .select('status')
      .eq('id', profile.retailer_id)
      .single();

    // Redirect to pending page if not approved
    if (retailer?.status !== 'approved') {
      redirect('/retailer/pending');
    }
  } else {
    // No retailer account linked, redirect to pending
    redirect('/retailer/pending');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RetailerSidebar />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header spacer */}
        <div className="h-14 lg:hidden" />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
