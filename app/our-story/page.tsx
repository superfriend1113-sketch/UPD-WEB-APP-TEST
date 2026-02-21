import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Unlimited Perfect Deals',
  description: 'Built to solve retail inefficiency by focusing on recovery instead of prevention. Turning sunk costs into recovered capital without brand damage.',
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-teal-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">Our Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              Our Story
            </h1>
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto">
              Built from a simple observation: retail needs recovery, not just prevention
            </p>
          </div>
        </div>
      </div> */}

      {/* The Problem Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-red-100 text-red-700 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              The Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              A Massive Inefficiency in Retail
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Unlimited Perfect Deals was created after observing a critical issue affecting retailers worldwide:
            </p>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
              <p className="text-2xl font-bold text-gray-900 mb-2">Billions Lost Annually</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Unsold inventory sitting in warehouses</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Forced markdowns destroying margins</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Accumulating storage fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Liquidation losses with brand damage</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 rounded-3xl transform -rotate-3"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Existing solutions focus on <span className="font-bold text-gray-900">forecasting and prevention</span>, but the damage is already done when inventory sits unsold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="bg-gradient-to-br from-teal-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              Our Approach
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              We Focus on Recovery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Instead of trying to predict the future, we maximize value from what already exists
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Approach */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Solutions</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Focus on demand forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Require system replacement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Prevention-oriented tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Don't help with existing inventory</span>
                </li>
              </ul>
            </div>

            {/* Our Approach */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Solution</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Focus on inventory recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Work alongside existing systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Turn liabilities into assets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Protect brand reputation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Details Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-100">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              The Result
            </h2>
            <p className="text-2xl text-gray-700 font-light leading-relaxed max-w-4xl mx-auto">
              Instead of replacing retailer systems, we built a platform that works <span className="font-bold text-teal-600">after</span> inventory becomes a liability  turning <span className="font-bold text-orange-600">sunk costs into recovered capital</span> without brand damage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-teal-700 mb-2">Recovery</div>
              <p className="text-sm text-gray-700">Maximize value from existing inventory</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-orange-700 mb-2">Protection</div>
              <p className="text-sm text-gray-700">Maintain brand value and reputation</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-orange-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-teal-700 mb-2">Integration</div>
              <p className="text-sm text-gray-700">Works with your current systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="relative bg-gradient-to-r from-teal-600 to-orange-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Transform Your Inventory?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
              Join retailers who are turning excess inventory into opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partner"
                className="inline-block px-8 py-4 bg-white text-teal-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Become a Partner
              </a>
              <a
                href="/how-it-works"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
