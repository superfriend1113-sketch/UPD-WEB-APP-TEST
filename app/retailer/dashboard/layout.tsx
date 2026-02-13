/**
 * Dashboard Layout
 * Protected layout for approved retailer dashboard
 * Includes sidebar navigation and retailer status-based access control
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

  // Get user profile with retailer_id
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id')
    .eq('id', user.id)
    .single();

  // Double-check user is a retailer
  if (!profile || profile.role !== 'retailer' || !profile.retailer_id) {
    redirect('/auth/login?error=unauthorized');
  }

  // Fetch actual retailer status from retailers table (source of truth)
  const { data: retailer } = await supabase
    .from('retailers')
    .select('status')
    .eq('id', profile.retailer_id)
    .single();

  // Check retailer status and redirect accordingly
  if (!retailer) {
    redirect('/auth/login?error=unauthorized');
  }

  if (retailer.status === 'rejected') {
    redirect('/retailer/rejected');
  } else if (retailer.status === 'pending') {
    redirect('/retailer/pending');
  } else if (retailer.status !== 'approved') {
    // Unknown status, redirect to pending for safety
    redirect('/retailer/pending');
  }

  // Only approved retailers reach this point
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
