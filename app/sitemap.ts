/**
 * Sitemap Generation
 * Generates sitemap for all pages including dynamic deal pages
 */

import { MetadataRoute } from 'next';
import { getActiveDeals } from '@/lib/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://unlimitedperfectdeals.com';

  try {
    // Fetch all active deals
    const deals = await getActiveDeals();

    // Generate deal URLs
    const dealUrls = deals.map(deal => ({
      url: `${baseUrl}/deals/${deal.id}`,
      lastModified: new Date(deal.updatedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/deals`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      ...dealUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return basic sitemap if data fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/deals`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}

