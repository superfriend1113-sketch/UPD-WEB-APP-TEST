/**
 * Retailer Portal Layout
 * Protected layout for all retailer routes with status-based access control
 * Auth-only wrapper - sidebar is in dashboard/layout.tsx
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: {
    default: 'Retailer Portal',
    template: '%s | Retailer Portal',
  },
  description: 'Manage your deals and track performance',
};

export default async function RetailerLayout({
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

  // Get user profile with retailer status
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id, retailer_status')
    .eq('id', user.id)
    .single();

  // Check if user is a retailer
  if (!profile || profile.role !== 'retailer') {
    redirect('/auth/login?error=unauthorized');
  }

  return <>{children}</>;
}
