/**
 * Firestore Data Fetching Utilities
 * Functions for querying deals, categories, and retailers from Firestore
 */

import {
  collection,
  query,
  where,
  limit as firestoreLimit,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { getFirestoreInstance } from './firebase/config';
import type { Deal } from '../types/deal';
import type { Category } from '../types/category';
import type { Retailer } from '../types/retailer';

/**
 * Serialize Firestore data for Next.js Server/Client component boundary
 * Converts Timestamps to plain objects by using JSON serialization
 */
function serializeForClient<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (_key, value) => {
    // Convert Firestore Timestamps to plain objects with seconds and nanoseconds
    if (value && typeof value === 'object' && 'toMillis' in value) {
      return {
        seconds: Math.floor(value.toMillis() / 1000),
        nanoseconds: (value.toMillis() % 1000) * 1000000
      };
    }
    return value;
  }));
}

/**
 * Serialize deal data for passing to client components
 * Keeps timestamps as plain objects (not Timestamp instances)
 */
function serializeDeal(data: any): any {
  return serializeForClient(data);
}

/**
 * Get all active deals from Firestore
 * Filters for active status and non-expired deals
 */
export async function getActiveDeals(): Promise<Deal[]> {
  try {
    const db = getFirestoreInstance();
    const dealsRef = collection(db, 'deals');
    const q = query(dealsRef, where('isActive', '==', true));

    const snapshot = await getDocs(q);
    const deals = snapshot.docs.map(docSnap => 
      serializeDeal({ id: docSnap.id, ...docSnap.data() })
    );

    // Client-side filter for expired deals and sort by createdAt
    return deals
      .filter(deal => {
        if (!deal.isActive) return false;
        const expiration = deal.expirationDate as any;
        const now = Date.now();
        const expirationMillis = expiration.seconds * 1000 + expiration.nanoseconds / 1000000;
        return expirationMillis > now;
      })
      .sort((a, b) => {
        const aTime = (a.createdAt as any).seconds * 1000;
        const bTime = (b.createdAt as any).seconds * 1000;
        return bTime - aTime;
      });
  } catch (error) {
    console.error('Error fetching active deals:', error);
    throw new Error('Failed to load deals. Please try again later.');
  }
}

/**
 * Get featured deals from Firestore
 * @param limit - Maximum number of featured deals to return
 */
export async function getFeaturedDeals(limit: number = 6): Promise<Deal[]> {
  try {
    const db = getFirestoreInstance();
    const dealsRef = collection(db, 'deals');
    const q = query(
      dealsRef,
      where('isActive', '==', true),
      where('isFeatured', '==', true)
    );

    const snapshot = await getDocs(q);
    const deals = snapshot.docs.map(docSnap =>
      serializeDeal({ id: docSnap.id, ...docSnap.data() })
    );

    // Client-side filter for expired deals, sort, and limit
    return deals
      .filter(deal => {
        if (!deal.isActive) return false;
        const expiration = deal.expirationDate as any;
        const now = Date.now();
        const expirationMillis = expiration.seconds * 1000 + expiration.nanoseconds / 1000000;
        return expirationMillis > now;
      })
      .sort((a, b) => {
        const aTime = (a.createdAt as any).seconds * 1000;
        const bTime = (b.createdAt as any).seconds * 1000;
        return bTime - aTime;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured deals:', error);
    throw new Error('Failed to load featured deals. Please try again later.');
  }
}

/**
 * Get all categories from Firestore
 * Ordered by display order
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const db = getFirestoreInstance();
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('isActive', '==', true));

    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map(docSnap => 
      serializeForClient({ id: docSnap.id, ...docSnap.data() })
    ) as Category[];

    // Client-side sort by order
    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to load categories. Please try again later.');
  }
}

/**
 * Get a single deal by ID
 * @param id - Deal document ID
 */
export async function getDeal(id: string): Promise<Deal | null> {
  try {
    const db = getFirestoreInstance();
    const dealRef = doc(db, 'deals', id);
    const snapshot = await getDoc(dealRef);

    if (!snapshot.exists()) {
      return null;
    }

    return serializeDeal({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    console.error(`Error fetching deal ${id}:`, error);
    throw new Error('Failed to load deal details. Please try again later.');
  }
}

/**
 * Get a single retailer by slug
 * @param slug - Retailer slug
 */
export async function getRetailer(slug: string): Promise<Retailer | null> {
  try {
    const db = getFirestoreInstance();
    const retailersRef = collection(db, 'retailers');
    const q = query(retailersRef, where('slug', '==', slug), firestoreLimit(1));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const docSnap = snapshot.docs[0];
    return serializeForClient({ id: docSnap.id, ...docSnap.data() }) as Retailer;
  } catch (error) {
    console.error(`Error fetching retailer ${slug}:`, error);
    throw new Error('Failed to load retailer information. Please try again later.');
  }
}

/**
 * Check if a deal is expired
 * @param expirationDate - Deal expiration date (plain object or Timestamp)
 */
export function isExpired(expirationDate: any): boolean {
  const now = Date.now();
  if (expirationDate && typeof expirationDate === 'object') {
    if ('toMillis' in expirationDate) {
      // Firestore Timestamp
      return expirationDate.toMillis() <= now;
    } else if ('seconds' in expirationDate) {
      // Plain object with seconds/nanoseconds
      const millis = expirationDate.seconds * 1000 + (expirationDate.nanoseconds || 0) / 1000000;
      return millis <= now;
    }
  }
  return true;
}

/**
 * Filter state interface
 */
export interface FilterState {
  categorySlug: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

/**
 * Apply client-side filters to deals array
 * @param deals - Array of deals to filter
 * @param filters - Filter criteria
 */
export function applyFilters(deals: Deal[], filters: FilterState): Deal[] {
  return deals.filter(deal => {
    // Category filter
    if (filters.categorySlug && deal.category !== filters.categorySlug) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== null && deal.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && deal.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

/**
 * Calculate deal counts by category
 * @param deals - Array of deals
 * @param categories - Array of categories
 */
export function calculateCategoryCounts(
  deals: Deal[],
  categories: Category[]
): Record<string, number> {
  const counts: Record<string, number> = {};

  categories.forEach(category => {
    counts[category.slug] = deals.filter(
      deal => deal.category === category.slug
    ).length;
  });

  return counts;
}
