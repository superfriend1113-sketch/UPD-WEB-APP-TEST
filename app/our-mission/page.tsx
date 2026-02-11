import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission | Unlimited Perfect Deals',
  description: 'To eliminate retail waste by transforming excess inventory into measurable value — sustainably, transparently, and intelligently.',
};

export default function OurMissionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">Our Purpose</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              Our Mission
            </h1>
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto">
              To eliminate retail waste by transforming excess inventory into measurable value — sustainably, transparently, and intelligently.
            </p>
          </div>
        </div>
      </div>

      {/* Core Statement Section */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why We Exist
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              We exist to help retailers operate leaner, smarter, and more profitably while giving consumers access to affordable, high-quality products without compromise.
            </p>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="bg-gradient-to-br from-teal-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 - Sustainability */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                Reducing waste and environmental impact by ensuring excess inventory finds its purpose instead of ending up in landfills.
              </p>
            </div>

            {/* Value 2 - Transparency */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Operating with complete openness in pricing, analytics, and reporting so retailers can make informed decisions with confidence.
              </p>
            </div>

            {/* Value 3 - Intelligence */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                Leveraging smart algorithms to optimize distribution channels, maximize recovery, and protect brand value at every step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              Our Impact
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Creating Value for Everyone
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We're building a better ecosystem for retail where nothing goes to waste, retailers recover maximum value, and consumers gain access to quality products at fair prices.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">For Retailers</h4>
                  <p className="text-gray-600 text-sm">Maximize inventory recovery while protecting brand reputation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">For Consumers</h4>
                  <p className="text-gray-600 text-sm">Access premium products at exceptional prices</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">For the Planet</h4>
                  <p className="text-gray-600 text-sm">Reduce waste and promote sustainable commerce</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-orange-200 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
                  <div className="text-3xl font-black text-teal-700 mb-2">Measurable</div>
                  <p className="text-sm text-gray-700">Real-time analytics and clear ROI metrics</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                  <div className="text-3xl font-black text-orange-700 mb-2">Scalable</div>
                  <p className="text-sm text-gray-700">Built to grow with your business needs</p>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-orange-100 rounded-xl p-6">
                  <div className="text-3xl font-black text-teal-700 mb-2">Reliable</div>
                  <p className="text-sm text-gray-700">Consistent performance you can count on</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Join Our Mission</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
              Be part of the solution. Help us create a more sustainable and efficient retail ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partner"
                className="inline-block px-8 py-4 bg-white text-teal-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Partner With Us
              </a>
              <a
                href="/deals"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Browse Deals
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
