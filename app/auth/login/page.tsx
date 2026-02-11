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
  
  // Redirect authenticated users to home page
  if (user) {
    redirect('/');
  }

  return (
    <main className="min-h-screen flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/auth/login.jpg"
            alt="Login Background"
            fill
            className="object-cover animate-slide-lr"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex items-start justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
