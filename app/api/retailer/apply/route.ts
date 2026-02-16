import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.json();

    // Create slug from business name
    const slug = formData.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Create retailer record with pending status and all application fields
    const { data: retailer, error: retailerError } = await supabase
      .from('retailers')
      .insert({
        // Basic info
        name: formData.businessName,
        slug,
        user_id: user.id,
        status: 'pending',
        is_active: false,
        commission: 0,
        
        // Step 1: Business Identity
        dba_name: formData.dbaName || null,
        entity_type: formData.entityType || null,
        state: formData.state || null,
        year_established: formData.yearEstablished ? parseInt(formData.yearEstablished) : null,
        ein: formData.ein || null,
        
        // Step 2: Business Contact
        website_url: formData.website,
        phone: formData.phone || null,
        has_physical_store: formData.hasPhysicalStore === 'yes',
        store_address: formData.hasPhysicalStore === 'yes' ? formData.storeAddress : null,
        city_state: formData.hasPhysicalStore === 'yes' ? formData.cityState : null,
        
        // Step 3: Inventory Profile
        categories: formData.categories || [],
        conditions: formData.conditions || [],
        volume: formData.volume || null,
        discount_range: formData.discountRange || null,
        storage_location: formData.storageLocation || null,
        
        // Step 4: Operational Controls
        min_margin: formData.minMargin ? parseFloat(formData.minMargin) : null,
        allow_dynamic_markdowns: formData.allowDynamicMarkdowns === 'yes',
        allow_flash_sales: formData.allowFlashSales === 'yes',
      })
      .select()
      .single();

    if (retailerError) {
      console.error('Error creating retailer:', retailerError);
      return NextResponse.json({ error: 'Failed to create retailer' }, { status: 500 });
    }

    // Update user profile with retailer_id
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({ retailer_id: retailer.id })
      .eq('id', user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true, retailer });
  } catch (error) {
    console.error('Error in retailer application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
