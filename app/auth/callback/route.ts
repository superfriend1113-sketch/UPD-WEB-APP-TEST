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
  }

  // Redirect all users to homepage
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
