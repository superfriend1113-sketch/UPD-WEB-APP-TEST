/**
 * Sign Up Page
 * User registration with Google and Email
 */

import { redirect } from 'next/navigation';
import SignUpForm from './SignUpForm';
import Link from 'next/link';
import Image from 'next/image';
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
    <main className="min-h-screen flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/auth/register.jpg"
            alt="Register Background"
            fill
            className="object-cover animate-slide-lr"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Right Side - Signup Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex items-start justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
