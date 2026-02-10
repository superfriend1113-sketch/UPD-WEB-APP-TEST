import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal | Unlimited Perfect Deals',
  description: 'Terms of Service and Privacy Policy for Unlimited Perfect Deals.',
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Legal
          </h1>
          <p className="text-xl text-gray-600">
            Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Link
            href="/legal/terms"
            className="block p-8 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-transparent hover:border-teal-500"
          >
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h2>
            <p className="text-gray-700">
              Read our terms and conditions for using Unlimited Perfect Deals
            </p>
          </Link>

          <Link
            href="/legal/privacy"
            className="block p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
            <p className="text-gray-700">
              Learn how we protect and handle your personal information
            </p>
          </Link>
        </div>

        {/* Overview */}
        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At Unlimited Perfect Deals, we are committed to protecting your privacy and ensuring transparency in how we operate. Our legal documents outline your rights and our responsibilities as you use our platform.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
            <p className="text-gray-800 mb-0">
              <strong>Last Updated:</strong> February 9, 2026
            </p>
            <p className="text-gray-700 text-sm mt-2 mb-0">
              We may update these documents from time to time. We'll notify you of any material changes via email or through our platform.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Key Points</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Our service is free for consumers - no hidden fees</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We never sell your personal data to third parties</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You can delete your account and data at any time</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We use industry-standard security to protect your information</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cookies are used to improve your experience (you can opt-out)</span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Questions?</h3>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our Terms of Service or Privacy Policy, please contact us at{' '}
            <a href="mailto:legal@unlimitedperfectdeals.com" className="text-teal-600 hover:text-teal-700 font-medium">
              legal@unlimitedperfectdeals.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
