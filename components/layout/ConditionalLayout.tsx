'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRetailerRoute = pathname?.startsWith('/retailer');

  // Retailer routes don't show consumer header/footer
  if (isRetailerRoute) {
    return <>{children}</>;
  }

  // Consumer routes show header and footer
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
