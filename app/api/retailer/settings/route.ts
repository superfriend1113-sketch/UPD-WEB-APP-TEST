/**
 * Retailer Settings API Route
 * Handles updating retailer profile information
 */

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { retailerId, name, website_url, affiliate_id } = body;

    // Verify user owns this retailer
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('retailer_id')
      .eq('id', user.id)
      .single();

    if (!profile || profile.retailer_id !== retailerId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update retailer
    const { error } = await supabase
      .from('retailers')
      .update({
        name,
        website_url,
        affiliate_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', retailerId);

    if (error) {
      console.error('Error updating retailer:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
