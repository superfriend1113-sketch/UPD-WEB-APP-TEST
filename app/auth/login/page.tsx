/**
 * Login Page
 * User authentication with Google and Email
 */

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import Link from 'next/link';
import Image from 'next/image';
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
    <main className="min-h-screen flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-teal-600 via-teal-700 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Unlimited Perfect Deals"
              width={180}
              height={45}
              className="h-11 w-auto brightness-0 invert"
            />
          </Link>
          
          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Discover Amazing,<br />
              <span className="text-orange-200">Unbeatable Deals</span>
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Access exclusive discounts from top retailers clearing their inventory. 
              Save big on electronics, fashion, home goods, and more.
            </p>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <span className="text-teal-100">Exclusive retailer partnerships</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <span className="text-teal-100">Real-time inventory deals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <span className="text-teal-100">Personalized watchlists</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex gap-2">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white/50 rounded-full"></div>
            <div className="w-2 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoadingSpinner />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
