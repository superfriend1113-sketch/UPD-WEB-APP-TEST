# Unlimited Perfect Deals - User Web App

The public-facing web application for browsing and discovering deals. Built with Next.js 15, React 19, and Firebase.

## Overview

This is the customer-facing application where users can:
- Browse featured deals on the landing page
- Filter deals by category and price range
- View detailed deal information
- Track deal analytics (views, clicks)
- Navigate to retailer websites

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Firebase Firestore (database)
- Server-side rendering for SEO optimization

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project configured (see `FIREBASE_SETUP.md` in root)
- Environment variables set up

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Add your Firebase configuration to `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── deals/              # Deals listing and detail pages
├── layout.tsx          # Root layout
└── page.tsx            # Landing page

components/
├── common/             # Shared UI components
├── deals/              # Deal-specific components
├── detail/             # Deal detail components
├── landing/            # Landing page components
└── layout/             # Layout components

lib/
├── firebase/           # Firebase configuration
└── firestore.ts        # Firestore data access functions

types/
├── deal.ts             # Deal type definitions
├── category.ts         # Category type definitions
├── retailer.ts         # Retailer type definitions
└── analytics.ts        # Analytics type definitions
```

## Key Features

### Landing Page
- Hero section with call-to-action
- Featured deals carousel
- Category navigation

### Deals Page
- Grid view of all active deals
- Category filtering
- Price range filtering
- Real-time data from Firestore

### Deal Detail Page
- Full deal information
- Retailer details
- Analytics tracking (views, clicks)
- Direct link to retailer website

## Deployment

See `DEPLOYMENT_INSTRUCTIONS.md` in the project root for deployment guidelines.

## Related Projects

- `admin-panel/` - Admin dashboard for managing deals, categories, and retailers
