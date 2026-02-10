# Multi-Tenant Application Setup Guide

This guide will help you set up and test the unified multi-tenant application with subdomain routing.

## Architecture Overview

The application now supports:
- **Consumer Portal** (`consumer.domain.com`) - For regular users browsing deals
- **Retailer Portal** (`retailer.domain.com`) - For retailers managing their products
- **Unified Authentication** - Smart role detection and auto-redirect
- **Tabbed Signup** - eBay-style signup with Personal/Business tabs

## Setup Instructions

### 1. Local Development Setup

#### Update your hosts file

**Windows:** Edit `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** Edit `/etc/hosts`

Add these lines:
```
127.0.0.1  consumer.localhost
127.0.0.1  retailer.localhost
```

#### Environment Variables

The `.env.local` file has been updated with:
```env
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_CONSUMER_DOMAIN=consumer.localhost:3000
NEXT_PUBLIC_RETAILER_DOMAIN=retailer.localhost:3000
NEXT_PUBLIC_SITE_URL=http://consumer.localhost:3000
```

### 2. Running the Application

```bash
cd user-web
npm install
npm run dev
```

The app will start on port 3000.

### 3. Testing the Multi-Tenant Features

**Important:** Always use subdomain URLs. If you visit plain `localhost:3000`, it will automatically redirect you to `consumer.localhost:3000`.

#### **Test Consumer Portal**

1. Visit: `http://consumer.localhost:3000` (or just `http://localhost:3000` - it will auto-redirect)
2. Click "Sign up" → You'll see tabs for "Personal" and "Business"
3. **Personal Tab** has:
   - Full Name
   - Email
   - Password
   - Confirm Password
   - Google OAuth button

4. Create a test consumer account:
   - Use the Personal tab
   - Fill in the form
   - Submit → Account created

#### **Test Retailer Portal**

1. Visit: `http://consumer.localhost:3000/auth/signup`
2. Click the **"Business" tab**
3. **Business Tab** has:
   - Business Name
   - Business Email
   - Website URL (optional)
   - Commission % (optional)
   - Password (min 8 characters)
   - Confirm Password

4. Create a test retailer account:
   - Fill in the business form
   - Submit → Application submitted
   - You'll be redirected to `/pending` page

5. To approve your test retailer:
   - Go to your Supabase dashboard
   - Open the `retailers` table
   - Find your newly created retailer
   - Change `status` from `'pending'` to `'approved'`
   - Refresh the pending page → Auto-redirects to dashboard

#### **Test Role Detection on Login**

1. Go to: `http://consumer.localhost:3000/auth/login`
2. Enter **retailer email** → System detects role → Redirects to `http://retailer.localhost:3000/dashboard`

3. Go to: `http://retailer.localhost:3000/auth/login`
4. Enter **consumer email** → System detects role → Redirects to `http://consumer.localhost:3000/`

#### **Test Middleware Protection**

1. As consumer, try accessing: `http://consumer.localhost:3000/dashboard`
   - Should be blocked/redirected

2. As retailer, try accessing: `http://retailer.localhost:3000/watchlist`
   - Should be blocked/redirected

## Key Features Implemented

### ✅ Middleware with Subdomain Detection
- File: `user-web/middleware.ts`
- Extracts subdomain from hostname
- Routes requests based on subdomain
- Protects routes by user role

### ✅ Utility Functions
- File: `user-web/lib/utils.ts`
- `getSubdomain()` - Detects current subdomain
- `getSubdomainUrl()` - Builds URLs for different subdomains
- Formatting helpers for currency, dates, etc.

### ✅ Tabbed Signup Page
- File: `user-web/app/auth/signup/SignupForm.tsx`
- Personal tab: Consumer signup with Google OAuth
- Business tab: Retailer signup (email only)
- Role-based account creation

### ✅ Role-Detection Login
- File: `user-web/app/auth/login/LoginForm.tsx`
- Queries `user_profiles` table for role
- Auto-redirects to correct subdomain
- Google OAuth only on consumer subdomain

### ✅ Retailer Dashboard
- Files: `user-web/app/dashboard/*`
- Protected by middleware
- Shows metrics, deals, analytics
- Redirects to `/pending` if not approved

### ✅ Pending Approval Page
- File: `user-web/app/pending/page.tsx`
- Auto-refreshes every 30 seconds
- Shows application status
- Displays rejection reason if rejected

## Production Deployment (Vercel Example)

### 1. Add Domains in Vercel
- Go to Project Settings → Domains
- Add: `consumer.yourdomain.com`
- Add: `retailer.yourdomain.com`

### 2. Configure DNS
Add CNAME records:
```
consumer.yourdomain.com → cname.vercel-dns.com
retailer.yourdomain.com → cname.vercel-dns.com
```

### 3. Update Environment Variables
In Vercel dashboard:
```env
NEXT_PUBLIC_DOMAIN=yourdomain.com
NEXT_PUBLIC_CONSUMER_DOMAIN=consumer.yourdomain.com
NEXT_PUBLIC_RETAILER_DOMAIN=retailer.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://consumer.yourdomain.com
```

### 4. Update OAuth Redirect URLs
In Google Cloud Console:
- Add: `https://consumer.yourdomain.com/auth/callback`
- Add: `https://retailer.yourdomain.com/auth/callback`

## File Structure

```
user-web/
├── middleware.ts                    # Subdomain routing & auth checks
├── app/
│   ├── auth/
│   │   ├── login/LoginForm.tsx     # Role-detection login
│   │   └── signup/SignupForm.tsx   # Tabbed signup (Personal/Business)
│   ├── dashboard/                   # Retailer dashboard (migrated)
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   ├── page.tsx                # Dashboard home with metrics
│   │   ├── deals/                  # Deal management (to be copied)
│   │   ├── analytics/              # Analytics page (to be copied)
│   │   └── profile/                # Profile page (to be copied)
│   └── pending/                     # Pending approval page
│       ├── page.tsx
│       ├── AutoRefresh.tsx
│       └── PendingActions.tsx
├── components/
│   └── layout/
│       └── RetailerSidebar.tsx     # Retailer navigation sidebar
└── lib/
    └── utils.ts                     # Subdomain & utility functions
```

## Database Schema (Already Set Up)

Your Supabase database already has:
- `user_profiles` table with `role` field (`admin | retailer | consumer`)
- `retailers` table with `status` field (`pending | approved | rejected`)
- RLS policies for data isolation
- `create_retailer_account()` RPC function

## Next Steps (Optional)

1. **Copy remaining retailer pages** from `retailer-management`:
   - `app/dashboard/deals/*` - Deal management
   - `app/dashboard/analytics/*` - Analytics
   - `app/dashboard/profile/*` - Profile settings

2. **Deduplicate UI components**:
   - Merge `components/ui/Button.tsx` from both apps
   - Merge `components/ui/Input.tsx` from both apps
   - Keep shared components in `user-web/components/ui/`

3. **Test OAuth Callback**:
   - Ensure Google OAuth works correctly
   - Test email verification flow

4. **Add "Wrong Subdomain" error page** for better UX

## Troubleshooting

### Issue: "Accessing localhost:3000 doesn't show consumer subdomain"
- **This is expected behavior!** Plain `localhost:3000` will automatically redirect to `consumer.localhost:3000`
- The middleware handles this redirect automatically
- After login/signup, you'll always be on the correct subdomain URL

### Issue: "localhost refused to connect"
- Make sure you added the hosts file entries
- Restart your browser after editing hosts file
- Try clearing DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### Issue: "User not redirected to correct subdomain"
- Check browser console for errors
- Verify environment variables are loaded
- Test `getSubdomain()` function in browser console

### Issue: "Retailer stuck on pending page"
- Go to Supabase dashboard
- Check `retailers` table
- Update `status` column to `'approved'`

### Issue: "Middleware not working"
- Check `middleware.ts` is at the root of `user-web/`
- Verify `matcher` config in middleware
- Check Next.js console for middleware errors

## Support

For issues or questions:
1. Check browser console for errors
2. Check Supabase logs for database errors
3. Verify environment variables are set correctly
4. Test with both consumer and retailer accounts

---

**Status**: Core multi-tenant infrastructure complete ✅
- Subdomain routing: ✅
- Role detection: ✅
- Tabbed signup: ✅
- Dashboard migration: ✅ (partial - need to copy deals/analytics/profile pages)
- Middleware protection: ✅
