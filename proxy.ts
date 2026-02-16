/**
 * Next.js Proxy
 * Handles path-based routing and authentication checks
 * Routes:
 * - / -> Public homepage and consumer features
 * - /retailer/* -> Retailer portal (accessible to all authenticated users)
 *   - /retailer/apply -> Application form for users without retailer account
 *   - /retailer/pending -> Status page for pending/rejected applications
 *   - /retailer/dashboard -> Dashboard for approved retailers only
 * - /watchlist, /alerts, /profile -> Consumer protected routes
 * - /auth/* -> Authentication pages
 * 
 * Note: All users sign up as consumers. Retailer access is granted through
 * the application process which creates a retailer account linked to the user.
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

  // If logged-in user visits auth pages, redirect them away
  if (user && pathname.startsWith('/auth')) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL('/', request.url));
  }

  // RETAILER ROUTES (/retailer/*)
  if (pathname.startsWith('/retailer')) {
    // Require authentication for retailer routes
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?returnUrl=' + pathname, request.url));
    }

    // All authenticated users can access retailer routes
    // The dashboard layout will handle redirects based on retailer_id and status
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

    // All authenticated users can access consumer routes
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
