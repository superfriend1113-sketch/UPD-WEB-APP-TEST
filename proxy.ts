/**
 * Next.js Proxy
 * Handles path-based routing and authentication checks
 * Routes:
 * - / -> Public homepage and consumer features
 * - /retailer/* -> Retailer portal (dashboard, deal management)
 * - /watchlist, /alerts -> Consumer protected routes
 * - /auth/* -> Authentication pages
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Create a response that we can modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client with cookie handling for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Public routes accessible without authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/callback',
    '/about',
    '/how-it-works',
    '/our-mission',
    '/our-story',
    '/legal',
    '/partner',
    '/deals',
    '/_next',
    '/favicon.ico',
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });

  // Skip auth checks for POST requests (RSC refetches) - they don't need
  // route protection and running getUser() on every POST causes a token
  // refresh loop that triggers endless client re-renders.
  if (request.method === 'POST') {
    return response;
  }

  // Refresh session - IMPORTANT: must call getUser() to refresh the cookie
  const { data: { user } } = await supabase.auth.getUser();

  // If logged-in user visits homepage or auth pages, redirect retailers to their portal
  if (user && (pathname === '/' || pathname.startsWith('/auth'))) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, retailer_id')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'retailer') {
      // Check approval status
      if (profile.retailer_id) {
        const { data: retailer } = await supabase
          .from('retailers')
          .select('status')
          .eq('id', profile.retailer_id)
          .single();

        if (retailer?.status === 'approved') {
          return NextResponse.redirect(new URL('/retailer/dashboard', request.url));
        }
      }
      return NextResponse.redirect(new URL('/retailer/pending', request.url));
    }

    // Redirect consumers away from auth pages if already logged in
    if (pathname.startsWith('/auth') && profile?.role === 'consumer') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // RETAILER ROUTES (/retailer/*)
  if (pathname.startsWith('/retailer')) {
    // Require authentication for retailer routes
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?returnUrl=' + pathname, request.url));
    }

    // Verify user is a retailer
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, retailer_id')
      .eq('id', user.id)
      .single();

    // Block non-retailers
    if (profile?.role !== 'retailer') {
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }

    return response;
  }

  // CONSUMER PROTECTED ROUTES
  const consumerProtectedRoutes = ['/watchlist', '/alerts', '/profile'];
  const isConsumerProtected = consumerProtectedRoutes.some(route => pathname.startsWith(route));

  if (isConsumerProtected) {
    // Require authentication
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?returnUrl=' + pathname, request.url));
    }

    // Verify user is a consumer (not a retailer)
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // Redirect retailers to their dashboard
    if (profile?.role === 'retailer') {
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url));
    }

    return response;
  }

  // Allow all public routes
  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
