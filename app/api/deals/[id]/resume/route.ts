/**
 * API Route: Resume Deal
 * Resumes a paused deal
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get retailer_id
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('retailer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.retailer_id) {
      return NextResponse.json({ error: 'Not a retailer' }, { status: 403 });
    }

    // Update deal to resume it
    const { error } = await supabase
      .from('deals')
      .update({ is_active: true })
      .eq('id', id)
      .eq('retailer_id', profile.retailer_id)
      .eq('status', 'approved');

    if (error) {
      console.error('Error resuming deal:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Deal resumed successfully' 
    });
  } catch (error) {
    console.error('Error in resume route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
