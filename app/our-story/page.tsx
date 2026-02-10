import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Unlimited Perfect Deals',
  description: 'Learn about the journey and team behind Unlimited Perfect Deals.',
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600">
            How a simple idea became a movement
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Beginning</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Unlimited Perfect Deals was born from a frustration we all know too well: spending countless hours browsing multiple websites, comparing prices, and still wondering if we got the best deal. Our founders, a group of tech enthusiasts and bargain hunters, asked themselves a simple question: "Why isn't there a better way?"
          </p>

          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 my-12">
            <p className="text-xl italic text-gray-800 mb-0">
              "We wanted to create a platform that does all the hard work for you - finding, verifying, and organizing the best deals in one place, so you can spend less time searching and more time saving."
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Something Different</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            What started as a weekend project quickly evolved into something much bigger. We realized that millions of people were facing the same challenge - deal fatigue. The overwhelming number of choices, the uncertainty about whether a discount is genuine, and the fear of missing out on better deals.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            We set out to solve these problems by building intelligent tools that not only surface the best deals but also help you track prices, set alerts, and make informed decisions. Every feature we develop is tested with real users to ensure it actually solves real problems.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Where We Are Today</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Today, Unlimited Perfect Deals serves thousands of savvy shoppers every day, helping them save money on everything from electronics to groceries. We've partnered with hundreds of trusted retailers to bring you verified deals across all categories.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="text-center p-6 bg-white rounded-xl border-2 border-teal-100">
              <div className="text-3xl font-bold text-teal-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Deals</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Retail Partners</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border-2 border-orange-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">$5M+</div>
              <div className="text-gray-600">Total Savings</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Looking Ahead</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We're just getting started. Our roadmap includes AI-powered personalized recommendations, community features where users can share and rate deals, and partnerships with even more retailers to expand our reach.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            But through it all, our core mission remains the same: help you find the best deals with the least effort. We're building this platform for you, and your feedback shapes everything we do.
          </p>

          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Join Us on This Journey</h3>
            <p className="text-lg mb-6 text-white/90">
              Be part of a community that's changing how people shop online
            </p>
            <a
              href="/auth/signup"
              className="inline-block px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
