import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile and verify retailer role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, retailer_id')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'retailer') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { retailer_id, name, website_url, affiliate_id } = body;

    // Verify the retailer_id matches the user's profile
    if (retailer_id !== profile.retailer_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Validate required fields
    if (!name || !website_url) {
      return NextResponse.json(
        { error: 'Business name and website URL are required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(website_url);
    } catch {
      return NextResponse.json({ error: 'Invalid website URL format' }, { status: 400 });
    }

    // Update retailer profile
    const { data: updatedRetailer, error: updateError } = await supabase
      .from('retailers')
      .update({
        name,
        website_url,
        affiliate_id: affiliate_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', retailer_id)
      .eq('user_id', user.id) // Extra security check
      .select()
      .single();

    if (updateError) {
      console.error('Error updating retailer:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      retailer: updatedRetailer,
    });
  } catch (error) {
    console.error('Error in PATCH /api/retailer/profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
