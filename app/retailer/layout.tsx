/**
 * Retailer Portal Layout
 * Protected layout for all retailer routes
 * Auth-only wrapper - specific access control is in child layouts
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

  // All authenticated users can access retailer routes
  // Specific access control (retailer_id, status checks) is handled in child layouts
  return <>{children}</>;
}
