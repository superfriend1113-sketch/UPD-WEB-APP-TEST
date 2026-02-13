import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import RetailerProfileForm from '@/components/retailer/RetailerProfileForm';

export const metadata = {
  title: 'Retailer Profile Settings | Unlimited Perfect Deals',
  description: 'Manage your retailer account settings and business information',
};

export default async function RetailerProfilePage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?redirect=/retailer/profile');
  }

  // Get user profile and verify retailer role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'retailer') {
    redirect('/');
  }

  // Fetch retailer data
  const { data: retailer, error } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', profile.retailer_id)
    .single();

  if (error || !retailer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">
            Unable to load your retailer profile. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retailer Profile Settings</h1>
          <p className="text-gray-600">
            Manage your business information and account settings
          </p>
        </div>

        {/* Status Banner */}
        {retailer.status === 'pending' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Pending Approval</h3>
                <p className="text-sm text-yellow-800">
                  Your retailer account is currently under review. You'll be notified once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {retailer.status === 'rejected' && retailer.rejection_reason && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Application Rejected</h3>
                <p className="text-sm text-red-800">{retailer.rejection_reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <RetailerProfileForm retailer={retailer} userEmail={user.email || ''} />
      </div>
    </div>
  );
}
