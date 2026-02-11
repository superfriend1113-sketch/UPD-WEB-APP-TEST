import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Unlimited Perfect Deals',
  description: 'A technology-enabled inventory recovery platform designed for modern retail, operating at the intersection of inventory intelligence, controlled liquidation, and retailer-first economics.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">Who We Are</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              About Us
            </h1>
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto">
              A technology-enabled inventory recovery platform designed for modern retail
            </p>
          </div>
        </div>
      </div>

      {/* Core Statement Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Where We Operate
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At the intersection of innovation and execution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Inventory Intelligence */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Inventory Intelligence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Smart algorithms analyze inventory data to optimize distribution channels and maximize recovery value.
              </p>
            </div>
          </div>

          {/* Controlled Liquidation */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Controlled Liquidation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strategic distribution prevents brand erosion while moving inventory efficiently through targeted channels.
              </p>
            </div>
          </div>

          {/* Retailer-First Economics */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-teal-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Retailer-First Economics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our model prioritizes retailer profitability with transparent pricing and fast payouts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scalability Section */}
      <div className="bg-gradient-to-br from-teal-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Built to Scale
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                From Independent to Enterprise
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Our platform is built to scale from independent retailers to national brands, adapting to your unique needs while maintaining consistent excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Small Retailers</h4>
                    <p className="text-gray-600 text-sm">Easy onboarding with immediate value</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Mid-Size Businesses</h4>
                    <p className="text-gray-600 text-sm">Advanced features and dedicated support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">National Brands</h4>
                    <p className="text-gray-600 text-sm">Enterprise-grade solutions with full customization</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-orange-200 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-gray-900 mb-2">∞</div>
                  <p className="text-lg font-bold text-gray-700">Unlimited Scalability</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-teal-700">API Access</div>
                    <p className="text-xs text-gray-600 mt-1">Seamless integration</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-orange-700">Custom Workflows</div>
                    <p className="text-xs text-gray-600 mt-1">Tailored to your needs</p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-orange-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-teal-700">White-Label Options</div>
                    <p className="text-xs text-gray-600 mt-1">Your brand, our platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Pillars Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
            Foundation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Built on Trust
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our core pillars ensure reliability, security, and transparency at every level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Compliance */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Full regulatory compliance across all jurisdictions with proactive monitoring and updates.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Industry standards</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Legal frameworks</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Regular audits</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Enterprise-grade security protocols protecting your sensitive business and customer data.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>End-to-end encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SOC 2 certified</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 monitoring</span>
              </li>
            </ul>
          </div>

          {/* Financial Transparency */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Transparency</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Clear reporting, predictable fees, and real-time visibility into every transaction.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No hidden fees</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real-time analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Detailed reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="relative bg-gradient-to-r from-teal-600 to-orange-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Experience the Difference</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
              Join the platform that's transforming retail inventory recovery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partner"
                className="inline-block px-8 py-4 bg-white text-teal-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Partner With Us
              </a>
              <a
                href="/how-it-works"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
