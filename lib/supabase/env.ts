/**
 * Supabase Environment Configuration Loader
 * Loads and validates Supabase credentials from environment variables
 */

export interface SupabaseEnv {
  url: string;
  anonKey: string;
}

/**
 * Load Supabase environment variables
 * @throws Error if required variables are missing
 */
export function loadSupabaseEnv(): SupabaseEnv {
  const env: Partial<SupabaseEnv> = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  if (!validateSupabaseEnv(env)) {
    const missingVars = getMissingVariables(env);
    const errorMessage = `Supabase configuration error: Missing required environment variables: ${missingVars.join(', ')}

Please ensure all required Supabase environment variables are set in your .env.local file.
See .env.example for the required variables.

Troubleshooting:
1. Copy .env.example to .env.local
2. Fill in your Supabase credentials from Supabase Dashboard > Project Settings > API
3. Restart your development server`;

    console.error(errorMessage);
    throw new Error(`Missing Supabase environment variables: ${missingVars.join(', ')}`);
  }

  return env as SupabaseEnv;
}

/**
 * Validate that all required Supabase environment variables are present
 */
export function validateSupabaseEnv(env: Partial<SupabaseEnv>): env is SupabaseEnv {
  return !!(
    env.url &&
    env.anonKey
  );
}

/**
 * Get list of missing environment variables
 */
function getMissingVariables(env: Partial<SupabaseEnv>): string[] {
  const missing: string[] = [];
  
  if (!env.url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!env.anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  return missing;
}
