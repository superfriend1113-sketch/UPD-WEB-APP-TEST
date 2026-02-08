/**
 * Supabase Client SDK Configuration
 * Initializes and exports Supabase instance for the User Web App
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { loadSupabaseEnv } from './env';

let supabaseClient: SupabaseClient | undefined;

/**
 * Initialize Supabase with configuration from environment variables
 * Uses singleton pattern to prevent multiple initializations
 */
export function initializeSupabase(): SupabaseClient {
  // Return existing client if already initialized
  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    const config = loadSupabaseEnv();
    
    supabaseClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false, // User web app doesn't need authentication
        autoRefreshToken: false,
      },
    });

    console.log('Supabase initialized successfully');
    return supabaseClient;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Supabase initialization failed:', errorMessage);
    throw new Error(`Supabase initialization failed: ${errorMessage}`);
  }
}

/**
 * Get Supabase client instance
 * Initializes Supabase if not already initialized
 */
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    return initializeSupabase();
  }
  return supabaseClient;
}

/**
 * Export the Supabase client singleton
 */
export const supabase = getSupabase();
