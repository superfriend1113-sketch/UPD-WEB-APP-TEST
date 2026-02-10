import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission | Unlimited Perfect Deals',
  description: 'Our mission is to help everyone discover and save on the best deals online.',
};

export default function OurMissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Mission
          </h1>
          <p className="text-2xl text-teal-600 font-medium mb-8">
            Making Smart Shopping Accessible to Everyone
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-xl text-gray-800 leading-relaxed mb-0">
              At Unlimited Perfect Deals, we believe that everyone deserves access to the best prices on the products they love. Our mission is to democratize deal discovery and empower shoppers to make informed purchasing decisions without spending hours searching across multiple websites.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Drives Us</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-700">
                We're committed to providing verified, authentic deals from trusted retailers. No hidden fees, no inflated "original prices" - just real savings you can count on.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">User-First Approach</h3>
              <p className="text-gray-700">
                Every feature we build starts with one question: "How does this help our users save more?" From price alerts to watchlists, we're constantly innovating to put more money back in your pocket.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-700">
                We're building more than a deals platform - we're creating a community of smart shoppers who share tips, discover new products, and help each other find the best values online.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Improvement</h3>
              <p className="text-gray-700">
                The shopping landscape is always evolving, and so are we. We listen to your feedback, track emerging trends, and constantly update our platform to serve you better.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Our Commitment to You</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Always free for consumers - no subscriptions, no premium tiers</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Daily updates with fresh deals across all categories</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified deals from reputable retailers only</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-teal-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Privacy-first approach - your data is never sold</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/deals"
            className="inline-block px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-lg hover:bg-teal-700 transition-colors"
          >
            Start Exploring Deals
          </a>
        </div>
      </div>
    </main>
  );
}
