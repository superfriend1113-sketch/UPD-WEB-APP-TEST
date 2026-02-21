/**
 * Pricing Page
 * Displays pricing plans for retailers and customers
 */

import Link from 'next/link';

export const metadata = {
  title: 'Pricing Plans - Unlimited Perfect Deals',
  description: 'Choose the perfect plan for your business. Flexible pricing for retailers of all sizes.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the plan that works best for your business. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">For Shoppers</h2>
            <p className="text-lg text-gray-600">Browse and save on amazing deals</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-teal-600">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-teal-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Everything you need to save money</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Unlimited deal browsing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Price drop alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Personalized watchlist</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Email notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Mobile friendly</span>
                </li>
              </ul>

              <Link
                href="/auth/signup"
                className="block w-full text-center px-6 py-3 bg-teal-900 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Retailers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">For Retailers</h2>
            <p className="text-lg text-gray-600">Reach thousands of customers and move inventory faster</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">BASIC</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Small retailers testing the platform</p>
                <p className="text-sm text-orange-600 font-medium">Commission: 12%</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Standard listing access</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Basic dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Manual pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Monthly payout cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Email support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Basic analytics</span>
                </li>
              </ul>

              <Link
                href="/retailer/apply"
                className="block w-full text-center px-6 py-2.5 border-2 border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors text-sm"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-500 hover:shadow-xl transition-shadow relative flex flex-col">
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">PRO</h3>
                </div>
                <div className="mb-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">$149</span>
                    <span className="text-gray-600 text-sm">/month</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    or $1,499/year (save $289)
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">Single-location retailers</p>
                <p className="text-sm text-orange-600 font-medium">Commission: 10% (9.5% yearly)</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">AI pricing suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Markdown timing recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Bulk upload tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Featured listing boost</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Bi-weekly payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Priority support</span>
                </li>
              </ul>

              <Link
                href="/retailer/apply"
                className="block w-full text-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Elite Plan */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-xl p-6 border-2 border-purple-600 text-white flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <h3 className="text-xl font-bold">ELITE</h3>
                </div>
                <div className="mb-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">$499</span>
                    <span className="text-purple-200 text-sm">/month</span>
                  </div>
                  <div className="text-xs text-purple-200">
                    or $4,999/year (save $989)
                  </div>
                </div>
                <p className="text-purple-100 text-sm mb-2">High-volume stores / small chains</p>
                <p className="text-sm text-purple-300 font-medium">Commission: 8% (7.5% yearly)</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Everything in Pro +</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Advanced demand forecasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Dynamic pricing engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">API access (basic tier)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">POS integration support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Weekly payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Dedicated success advisor</span>
                </li>
              </ul>

              <Link
                href="/retailer/apply"
                className="block w-full text-center px-6 py-2.5 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-500 hover:shadow-xl transition-shadow flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">ENTERPRISE</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Chain / Regional / National</p>
                <p className="text-sm text-orange-600 font-medium">Custom pricing model</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Full API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Automated inventory routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Multi-warehouse syncing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Custom pricing models</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Data intelligence insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Private onboarding team</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Co-branded marketing</span>
                </li>
              </ul>

              <Link
                href="/contact-us"
                className="block w-full text-center px-6 py-2.5 border-2 border-red-600 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees. You only pay the monthly subscription fee for your chosen plan.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and PayPal for your convenience.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. Cancel your subscription anytime with no penalties or hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-900 to-teal-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Join thousands of retailers and shoppers on our platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/retailer/apply"
              className="px-8 py-4 bg-white text-teal-900 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg"
            >
              Become a Retailer
            </Link>
            <Link
              href="/deals"
              className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Browse Deals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
