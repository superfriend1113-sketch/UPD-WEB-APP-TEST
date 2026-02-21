/**
 * Call to Action Page
 * Encourages users to take action - sign up, browse deals, or become a retailer
 */

import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Join Unlimited Perfect Deals Today',
  description: 'Start saving on amazing deals or become a retailer partner. Join thousands of satisfied customers and retailers.',
};

export default function CallToActionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ready to Start Saving?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of smart shoppers finding incredible deals on quality products every day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/deals"
              className="px-8 py-4 bg-teal-900 text-white text-lg font-semibold rounded-full hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Deals Now
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-4 border-2 border-teal-600 text-teal-900 text-lg font-semibold rounded-full hover:bg-teal-50 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Unlimited Perfect Deals?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Huge Savings</h3>
              <p className="text-gray-600">
                Save up to 70% on quality products from trusted retailers. New deals added daily.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Deals</h3>
              <p className="text-gray-600">
                Every deal is verified by our team to ensure quality and authenticity.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Price Alerts</h3>
              <p className="text-gray-600">
                Get notified when prices drop on your favorite products. Never miss a deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-900 to-teal-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are You a Retailer?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Partner with us to reach thousands of eager customers and move your inventory faster.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-teal-100">Active Shoppers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Partner Retailers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">$2M+</div>
              <div className="text-teal-100">Products Sold</div>
            </div>
          </div>

          <Link
            href="/retailer/apply"
            className="inline-block px-8 py-4 bg-white text-teal-900 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Become a Retailer Partner
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Are You Waiting For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community today and start discovering amazing deals.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}
