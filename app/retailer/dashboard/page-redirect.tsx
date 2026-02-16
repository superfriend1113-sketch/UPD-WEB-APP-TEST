'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/retailer/apply');
  }, [router]);
  
  return (
    <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d0d0d] mx-auto mb-4"></div>
        <p className="text-[#888070]">Redirecting to application...</p>
      </div>
    </div>
  );
}
