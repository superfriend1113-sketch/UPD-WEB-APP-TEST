/**
 * Sign Up Page
 * User registration with Google and Email
 */

import { redirect } from 'next/navigation';
import SignUpForm from './SignUpForm';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Sign Up - Unlimited Perfect Deals',
  description: 'Create an account to save your favorite deals and get alerts',
};

export default async function SignUpPage() {
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
      <SignUpForm />
    </main>
  );
}
