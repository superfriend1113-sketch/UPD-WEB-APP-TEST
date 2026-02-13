import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function RetailerPendingPage() {
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

  // Fetch actual retailer status from retailers table
  const { data: retailer } = await supabase
    .from('retailers')
    .select('status')
    .eq('id', profile.retailer_id)
    .single();

  // Redirect based on actual retailer status
  if (!retailer || retailer.status !== 'pending') {
    // If approved, go to dashboard
    if (retailer?.status === 'approved') {
      redirect('/retailer/dashboard');
    }
    // If rejected, go to rejected page
    if (retailer?.status === 'rejected') {
      redirect('/retailer/rejected');
    }
    // If no retailer found or unknown status, go home
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Application Under Review
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-center mb-8">
            Thank you for applying to become a retailer on Unlimited Perfect Deals. Your application is currently being reviewed by our team.
          </p>

          {/* Status Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-amber-900 mb-3">
              What happens next?
            </h2>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Our team will review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You'll receive an email notification once a decision is made</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>If approved, you'll gain immediate access to the retailer dashboard</span>
              </li>
            </ul>
          </div>

          {/* Consumer Access Notice */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-teal-900 mb-1">
                  Shop While You Wait
                </h3>
                <p className="text-teal-800 text-sm">
                  While your application is being reviewed, you can browse deals, add items to your cart, and make purchases as a consumer.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-teal-600 text-white text-center font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Browse Deals
            </Link>
            <Link
              href="/contact-us"
              className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 text-center font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Have questions about your application? Feel free to reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
