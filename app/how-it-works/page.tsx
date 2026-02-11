import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Unlimited Perfect Deals',
  description: 'Learn how our intelligent distribution platform helps retailers move excess inventory while protecting brand value.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">Our Process</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed font-light">
              An intelligent platform that transforms excess inventory into revenue while protecting your brand
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="mt-4">
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Step 1
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Retailers Upload Excess Inventory
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Retailers securely list surplus, overstock, returns, or end-of-season products through our Retailer Dashboard or API.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="mt-4">
              <div className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Step 2
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Intelligent Distribution Engine
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our system determines the optimal path for each product — private deals, flash offers, bulk buyers, or consumer listings — based on velocity, margin recovery, and brand protection rules.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="mt-4">
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Step 3
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Controlled Sales Channels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Inventory is sold without public price erosion, avoiding brand dilution common in open liquidation marketplaces.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="mt-4">
              <div className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Step 4
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Payouts & Reporting
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Retailers receive payments, analytics, and recovery insights in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-teal-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Built for retailers who value their brand</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Move inventory quickly through optimized channels</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Brand Protected</h3>
              <p className="text-gray-600 text-sm">Maintain brand value with controlled distribution</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Full Analytics</h3>
              <p className="text-gray-600 text-sm">Real-time insights and recovery metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="relative bg-gradient-to-r from-teal-600 to-orange-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
              Join leading retailers who trust our platform to optimize their inventory recovery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partner"
                className="inline-block px-8 py-4 bg-white text-teal-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Become a Partner
              </a>
              <a
                href="/auth/signup"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Sign Up as Consumer
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
