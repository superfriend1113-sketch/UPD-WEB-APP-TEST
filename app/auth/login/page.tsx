/**
 * Login Page
 * User authentication with Google and Email
 */

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import type { Metadata } from 'next';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Login - Unlimited Perfect Deals',
  description: 'Sign in to access your watchlist and personalized deals',
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Redirect authenticated users based on their role
  if (user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, retailer_id')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'retailer') {
      if (profile.retailer_id) {
        const { data: retailer } = await supabase
          .from('retailers')
          .select('status')
          .eq('id', profile.retailer_id)
          .single();
        if (retailer?.status === 'approved') {
          redirect('/retailer/dashboard');
        }
      }
      redirect('/retailer/pending');
    }
    redirect('/');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<LoadingSpinner />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
