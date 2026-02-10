import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Unlimited Perfect Deals',
  description: 'Learn how Unlimited Perfect Deals helps you discover and save on the best deals online.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing deals in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Deals</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Explore thousands of curated deals across multiple categories. Use our filters to find exactly what you're looking for - from electronics to home goods, fashion to grocery items.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              2
            </div>
            <div className="flex-1 md:text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Save Your Favorites</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Found something you like? Add it to your watchlist with a single click. Keep track of deals you're interested in and get notified when prices drop even further.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Set Price Alerts</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Never miss a great deal! Set price alerts for products you want, and we'll notify you when they reach your target price. Smart shopping made simple.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              4
            </div>
            <div className="flex-1 md:text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop & Save</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Click through to the retailer's website to complete your purchase. We track all verified deals to ensure you're getting authentic discounts from trusted retailers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of savvy shoppers finding the best deals every day
            </p>
            <a
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-white text-teal-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
