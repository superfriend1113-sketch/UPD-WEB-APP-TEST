import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Unlimited Perfect Deals',
  description: 'Learn how our intelligent distribution platform helps retailers move excess inventory while protecting brand value.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-gray-500 text-lg">
            An intelligent platform that transforms excess inventory into revenue while protecting your brand.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-24">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="text-[200px] font-bold text-gray-100 absolute -top-20 -left-8 select-none">
                01
              </div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Retailers Upload Excess Inventory
                </h3>
                <div className="border-t border-gray-200 pt-6 mb-6"></div>
                <div className="flex justify-center">
                  <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Retailers Upload Excess Inventory
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Retailers securely list surplus, overstock, returns, or end-of-season products through our Retailer Dashboard or API.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Intelligent Distribution Engine
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our system determines the optimal path for each product  private deals, flash offers, bulk buyers, or consumer listings  based on velocity, margin recovery, and brand protection rules.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="text-[200px] font-bold text-gray-100 absolute -top-20 -right-8 select-none">
                02
              </div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 max-w-md ml-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Intelligent Distribution Engine
                </h3>
                <div className="border-t border-gray-200 pt-6 mb-6"></div>
                <div className="flex justify-center">
                  <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="text-[200px] font-bold text-gray-100 absolute -top-20 -left-8 select-none">
                03
              </div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Controlled Sales Channels
                </h3>
                <div className="border-t border-gray-200 pt-6 mb-6"></div>
                <div className="flex justify-center">
                  <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Controlled Sales Channels
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Inventory is sold without public price erosion, avoiding brand dilution common in open liquidation marketplaces.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fast Payouts & Reporting
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Retailers receive payments, analytics, and recovery insights in one place.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="text-[200px] font-bold text-gray-100 absolute -top-20 -right-8 select-none">
                04
              </div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 max-w-md ml-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Fast Payouts & Reporting
                </h3>
                <div className="border-t border-gray-200 pt-6 mb-6"></div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Analytics and insights dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
