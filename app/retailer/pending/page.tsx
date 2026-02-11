/**
 * Pending Approval Page
 * Shown to retailers waiting for admin approval
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AutoRefresh from './AutoRefresh';
import PendingActions from './PendingActions';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pending Approval | Retailer Portal',
  description: 'Your account is pending approval',
};

export default async function PendingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, retailer_id')
    .eq('id', user.id)
    .single();

  // If no profile or not a retailer, redirect to login
  if (!profile || profile.role !== 'retailer') {
    redirect('/auth/login?error=unauthorized');
  }

  // If no retailer_id linked, show error state
  if (!profile.retailer_id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* 3D Ribbon */}
          <div className="flex justify-center mb-0">
            <div className="relative w-32 h-20">
              <div className="absolute left-0 top-0 w-16 h-20 bg-red-600 transform -skew-y-6 origin-top-right"></div>
              <div className="absolute right-0 top-0 w-16 h-20 bg-red-400 transform skew-y-6 origin-top-left"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="pt-8 pb-4 px-8 text-center border-b border-gray-700/50">
              <h1 className="text-2xl font-bold text-white mb-2">Account Setup Error</h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your retailer account is not properly configured.
              </p>
            </div>
            
            <div className="px-8 py-6 space-y-3">
              <div className="bg-black/40 border border-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Contact support for assistance</p>
                <a href="mailto:support@unlimitedperfectdeals.com" className="text-teal-400 hover:text-teal-300 font-medium text-sm">
                  support@unlimitedperfectdeals.com
                </a>
              </div>
            </div>

            <div className="bg-black/40 px-8 py-5 border-t border-gray-700/50">  
              <a
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-black font-semibold rounded-lg transition-all shadow-lg text-sm"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If approved, redirect to landing page
  if (profile.retailer_id) {
    const { data: retailer } = await supabase
      .from('retailers')
      .select('status')
      .eq('id', profile.retailer_id)
      .single();

    if (retailer?.status === 'approved') {
      redirect('/');
    }
  }

  // Get full retailer details
  const { data: retailer, error: retailerError } = await supabase
    .from('retailers')
    .select('*')
    .eq('id', profile.retailer_id)
    .single();

  // If retailer record not found or error fetching it
  if (retailerError || !retailer) {
    console.error('Retailer fetch error:', retailerError);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* 3D Ribbon */}
          <div className="flex justify-center mb-0">
            <div className="relative w-32 h-20">
              <div className="absolute left-0 top-0 w-16 h-20 bg-red-600 transform -skew-y-6 origin-top-right"></div>
              <div className="absolute right-0 top-0 w-16 h-20 bg-red-400 transform skew-y-6 origin-top-left"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="pt-8 pb-4 px-8 text-center border-b border-gray-700/50">
              <h1 className="text-2xl font-bold text-white mb-2">Account Not Found</h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                We couldn't find your retailer account information.
              </p>
            </div>
            
            <div className="px-8 py-6 space-y-3">
              <div className="bg-black/40 border border-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 font-mono mb-2">
                  <span className="font-semibold text-gray-400">Error:</span> {retailerError?.message || 'Record not found'}
                </p>
              </div>
              
              <div className="bg-black/40 border border-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-2">Contact support for assistance</p>
                <a href="mailto:support@unlimitedperfectdeals.com" className="text-teal-400 hover:text-teal-300 font-medium text-sm">
                  support@unlimitedperfectdeals.com
                </a>
              </div>
            </div>

            <div className="bg-black/40 px-8 py-5 border-t border-gray-700/50">
              <a
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-black font-semibold rounded-lg transition-all shadow-lg text-sm"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If rejected, show rejection message
  const isRejected = retailer?.status === 'rejected';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Auto-refresh component - checks status every 30 seconds */}
      <AutoRefresh checkInterval={30000} />
      
      <div className="max-w-lg w-full">
        {/* 3D Ribbon at top */}
        <div className="flex justify-center mb-0">
          <div className="relative w-32 h-20">
            {/* Left fold - darker */}
            <div className={`absolute left-0 top-0 w-16 h-20 ${isRejected ? 'bg-red-600' : 'bg-teal-600'} transform -skew-y-6 origin-top-right`}></div>
            {/* Right fold - lighter */}
            <div className={`absolute right-0 top-0 w-16 h-20 ${isRejected ? 'bg-red-400' : 'bg-teal-400'} transform skew-y-6 origin-top-left`}></div>
          </div>
        </div>

        {/* Card hanging from ribbon */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Header */}
          <div className="pt-8 pb-4 px-8 text-center border-b border-gray-700/50">
            <h1 className="text-2xl font-bold text-white mb-2">
              {isRejected ? 'Application Declined' : 'Retailer Application'}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isRejected 
                ? 'Your application has been reviewed and declined' 
                : 'Your application is currently under review. We\'ll notify you once approved.'}
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-3">
            {isRejected ? (
              <>
                {/* Rejection Info */}
                <div className="bg-black/40 border border-red-500/20 rounded-lg p-4">
                  {retailer?.rejection_reason && (
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1">Reason</p>
                      <p className="text-sm text-gray-300">{retailer.rejection_reason}</p>
                    </div>
                  )}
                  {!retailer?.rejection_reason && (
                    <p className="text-sm text-gray-300">Your application did not meet our requirements.</p>
                  )}
                </div>

                <div className="bg-black/40 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Contact support for assistance</p>
                  <a href="mailto:support@unlimitedperfectdeals.com" className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                    support@unlimitedperfectdeals.com
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 rounded-lg px-4 py-3 border border-gray-700/50">
                    <label className="text-xs text-gray-500 block mb-1">Business Name</label>
                    <p className="text-sm text-white font-medium truncate">{retailer?.name || 'N/A'}</p>
                  </div>
                  
                  <div className="bg-black/40 rounded-lg px-4 py-3 border border-gray-700/50">
                    <label className="text-xs text-gray-500 block mb-1">Status</label>
                    <div className="inline-flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-teal-400 font-medium">Under Review</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg px-4 py-3 border border-gray-700/50">
                  <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                  <p className="text-sm text-white font-medium truncate">{user.email}</p>
                </div>
                
                <div className="bg-black/40 rounded-lg px-4 py-3 border border-gray-700/50">
                  <label className="text-xs text-gray-500 block mb-1">Submitted On</label>
                  <p className="text-sm text-white font-medium">
                    {retailer?.created_at ? new Date(retailer.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'N/A'}
                  </p>
                </div>

                {/* Footer Note */}
                <div className="bg-black/40 rounded-lg p-3 text-center border-t border-gray-700/50 mt-2">
                  <p className="text-xs text-gray-500 mb-1">For inquiries, contact us at</p>
                  <a href="mailto:support@unlimitedperfectdeals.com" className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                    support@unlimitedperfectdeals.com
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <PendingActions isRejected={isRejected} />
        </div>
      </div>
    </div>
  );
}
