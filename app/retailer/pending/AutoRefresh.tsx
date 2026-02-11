'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/config';

/**
 * Auto Refresh Component
 * Automatically checks approval status and redirects when approved
 */
export default function AutoRefresh({ checkInterval = 30000 }: { checkInterval?: number }) {
  const router = useRouter();

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('retailer_id')
          .eq('id', user.id)
          .single();

        if (!profile?.retailer_id) return;

        const { data: retailer } = await supabase
          .from('retailers')
          .select('status')
          .eq('id', profile.retailer_id)
          .single();

        // If approved, redirect to home page
        if (retailer?.status === 'approved') {
          window.location.href = '/';
        } else {
          // Otherwise just refresh the page data
          router.refresh();
        }
      } catch (error) {
        console.error('Error checking approval status:', error);
      }
    };

    // Check immediately on mount
    checkApprovalStatus();

    // Poll for status updates
    const interval = setInterval(checkApprovalStatus, checkInterval);

    return () => clearInterval(interval);
  }, [router, checkInterval]);

  return null;
}
