import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function RetailerRejectedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id')
    .eq('id', user.id)
    .single();

  // Check if user is a retailer
  if (profile?.role !== 'retailer' || !profile?.retailer_id) {
    redirect('/');
  }

  // Fetch actual retailer status and rejection details from retailers table
  const { data: retailer } = await supabase
    .from('retailers')
    .select('status, rejection_reason')
    .eq('id', profile.retailer_id)
    .single();

  // Redirect based on actual retailer status
  if (!retailer || retailer.status !== 'rejected') {
    // If approved, go to dashboard
    if (retailer?.status === 'approved') {
      redirect('/retailer/dashboard');
    }
    // If pending, go to pending page
    if (retailer?.status === 'pending') {
      redirect('/retailer/pending');
    }
    // If no retailer found or unknown status, go home
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Retailer Application Not Approved
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-center mb-8">
            We're sorry, but your retailer application has not been approved at this time.
          </p>

          {/* Rejection Reason */}
          {retailer.rejection_reason && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Reason for Decision:
              </h2>
              <p className="text-gray-800 leading-relaxed">
                {retailer.rejection_reason}
              </p>
            </div>
          )}

          {/* Consumer Access Notice */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-teal-900 mb-1">
                  You Can Still Shop as a Consumer
                </h3>
                <p className="text-teal-800 text-sm">
                  While you don't have access to retailer features, you can still browse deals, add items to your cart, and make purchases as a regular consumer.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/contact-us"
              className="block w-full px-6 py-3 bg-teal-600 text-white text-center font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 text-center font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Deals
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 text-center mt-6">
            If you believe this decision was made in error or would like to appeal, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
