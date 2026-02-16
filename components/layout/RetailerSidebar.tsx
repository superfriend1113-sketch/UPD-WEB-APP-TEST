'use client';

/**
 * Retailer Sidebar Component
 * Pixel-perfect implementation matching UPD design
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/config';

const navigation = [
  { name: 'Overview', href: '/retailer/dashboard', icon: '📊', section: 'dashboard' },
  { name: 'Upload Inventory', href: '/retailer/dashboard/deals/new', icon: '📤', section: 'dashboard' },
  { name: 'My Listings', href: '/retailer/dashboard/deals', icon: '📦', section: 'dashboard' },
];

export default function RetailerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [retailerName, setRetailerName] = useState('');
  const [retailerInitial, setRetailerInitial] = useState('A');
  const [retailerStatus, setRetailerStatus] = useState('approved');

  useEffect(() => {
    async function fetchRetailerInfo() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('retailer_id')
        .eq('id', user.id)
        .single();

      if (profile?.retailer_id) {
        const { data: retailer } = await supabase
          .from('retailers')
          .select('name, status')
          .eq('id', profile.retailer_id)
          .single();

        if (retailer) {
          setRetailerName(retailer.name);
          setRetailerInitial(retailer.name.charAt(0).toUpperCase());
          setRetailerStatus(retailer.status);
        }
      }
    }
    fetchRetailerInfo();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-20 left-0 right-0 bg-[#0d0d0d] border-b border-[#222] px-4 py-3 z-40">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#999] hover:text-[#f5f2eb]"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-[220px] bg-[#0d0d0d] transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full pt-6">
          {/* Retailer Avatar Section */}
          <div className="px-5 pb-5 border-b border-[#222] mb-2">
            <div className="w-10 h-10 bg-[#c8401a] rounded-full flex items-center justify-center font-display text-[20px] text-white mb-[10px]">
              {retailerInitial}
            </div>
            <div className="text-[13.5px] font-semibold text-[#f5f2eb] leading-tight">
              {retailerName || 'Retailer'}
            </div>
            <div className="mt-[2px]">
              {retailerStatus === 'approved' ? (
                <span className="inline-flex items-center gap-[6px] text-[10px] font-semibold px-2 py-[2px] rounded-[20px] bg-[#f0faf5] text-[#1e8a52] uppercase tracking-[0.4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#1e8a52]"></span>
                  APPROVED
                </span>
              ) : retailerStatus === 'pending' ? (
                <span className="inline-flex items-center gap-[6px] text-[10px] font-semibold px-2 py-[2px] rounded-[20px] bg-[#fef8e7] text-[#856404] uppercase tracking-[0.4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#856404]"></span>
                  PENDING
                </span>
              ) : (
                <span className="inline-flex items-center gap-[6px] text-[10px] font-semibold px-2 py-[2px] rounded-[20px] bg-[#fef2f0] text-[#c8401a] uppercase tracking-[0.4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#c8401a]"></span>
                  REJECTED
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-0 py-0 overflow-y-auto">
            <div className="text-[10px] font-semibold text-[#555] uppercase tracking-[1.2px] px-5 mb-2 mt-2">
              DASHBOARD
            </div>
            {navigation.map((item) => {
              const isActive = item.href === '/retailer/dashboard'
                ? pathname === '/retailer/dashboard'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-[10px] px-5 py-[10px] text-[13.5px] transition-all border-l-[3px]
                    ${isActive
                      ? 'text-[#f5f2eb] border-l-[#c8401a] bg-[rgba(200,64,26,0.12)]'
                      : 'text-[#999] border-l-transparent hover:text-[#f5f2eb] hover:bg-[rgba(255,255,255,0.05)]'
                    }
                  `}
                >
                  <span className="text-[16px] w-[18px] text-center">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}

            <div className="text-[10px] font-semibold text-[#555] uppercase tracking-[1.2px] px-5 mb-2 mt-5">
              ACCOUNT
            </div>
            <Link
              href="/retailer/dashboard/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center gap-[10px] px-5 py-[10px] text-[13.5px] transition-all border-l-[3px]
                ${pathname === '/retailer/dashboard/settings'
                  ? 'text-[#f5f2eb] border-l-[#c8401a] bg-[rgba(200,64,26,0.12)]'
                  : 'text-[#999] border-l-transparent hover:text-[#f5f2eb] hover:bg-[rgba(255,255,255,0.05)]'
                }
              `}
            >
              <span className="text-[16px] w-[18px] text-center">⚙️</span>
              Settings
            </Link>
          </nav>

          {/* Logout button */}
          <div className="border-t border-[#222] px-0 py-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center w-full gap-[10px] px-5 py-[10px] text-[13.5px] text-[#999] hover:text-[#f5f2eb] hover:bg-[rgba(255,255,255,0.05)] transition-all disabled:opacity-50 border-l-[3px] border-l-transparent"
            >
              <span className="text-[16px] w-[18px] text-center">🚪</span>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
