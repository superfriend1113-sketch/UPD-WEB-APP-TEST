/**
 * PromoBanner Component
 * Promotional banner carousel for featured deals
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const promos = [
  {
    id: 1,
    title: 'Up to 70% off Electronics',
    description: 'Save big on laptops, tablets, and smartphones from top brands.',
    buttonText: 'Shop now',
    buttonLink: '/deals?category=electronics',
    bgColor: 'from-teal-900 to-teal-800',
    images: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Home & Garden Sale',
    description: 'Transform your space with amazing deals on furniture and decor.',
    buttonText: 'Shop now',
    buttonLink: '/deals?category=home-garden',
    bgColor: 'from-orange-600 to-orange-500',
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1615875221248-d3856a8c0b7c?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Fashion Clearance',
    description: 'Refresh your wardrobe with up to 60% off clothing and accessories.',
    buttonText: 'Shop now',
    buttonLink: '/deals?category=clothing',
    bgColor: 'from-gray-900 to-gray-800',
    images: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    ],
  },
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const promo = promos[currentSlide];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[320px] md:min-h-[400px]">
          {promos.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentSlide ? 'opacity-100 translate-x-0' : idx < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'}`}
              style={{
                backgroundImage: `linear-gradient(to right, ${slide.bgColor.includes('teal') ? '#134e4a, #115e59' : slide.bgColor.includes('orange') ? '#ea580c, #f97316' : '#111827, #1f2937'})`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center min-h-[320px] md:min-h-[400px]">
                {/* Content */}
                <div className="py-12 md:py-16 lg:py-20 px-6 md:px-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-8 max-w-md">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </div>

                {/* Product Images */}
                <div className="relative hidden md:flex items-center justify-end gap-4 py-8 pr-6">
                  {slide.images.map((image, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative bg-white rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        width: imgIdx === 1 ? '280px' : '240px',
                        height: imgIdx === 1 ? '280px' : '240px',
                        transform: imgIdx === 0 ? 'rotate(-8deg) translateY(20px)' : imgIdx === 2 ? 'rotate(8deg) translateY(20px)' : 'scale(1.1)',
                        zIndex: imgIdx === 1 ? 10 : 5,
                      }}
                    >
                      <Image
                        src={image}
                        alt="Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Control Buttons - Bottom Right */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pause/Play Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? (
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {promos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
