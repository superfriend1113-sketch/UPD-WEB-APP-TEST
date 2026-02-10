/**
 * Auth Callback Handler
 * Handles OAuth callbacks from Google
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/auth/login?error=auth_failed', requestUrl.origin));
    }
    
    // Check user role
    const userRole = data.session?.user?.user_metadata?.role;
    
    // If no role is set (new OAuth user), default to consumer
    if (!userRole && data.user) {
      await supabase.auth.updateUser({
        data: { role: 'consumer' }
      });
    }

    // Redirect retailers to their portal
    if (userRole === 'retailer') {
      // Check approval status
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('retailer_id')
        .eq('id', data.user!.id)
        .single();

      if (profile?.retailer_id) {
        const { data: retailer } = await supabase
          .from('retailers')
          .select('status')
          .eq('id', profile.retailer_id)
          .single();

        if (retailer?.status === 'approved') {
          return NextResponse.redirect(new URL('/retailer/dashboard', requestUrl.origin));
        }
      }
      return NextResponse.redirect(new URL('/retailer/pending', requestUrl.origin));
    }
  }

  // Default: redirect consumers to homepage
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
