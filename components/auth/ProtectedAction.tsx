'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import LoginPrompt from './LoginPrompt';

interface ProtectedActionProps {
  children: React.ReactNode;
  action: 'cart' | 'purchase' | 'watchlist';
  fallback?: React.ReactNode;
  onAuthRequired?: () => void;
}

/**
 * Wrapper component that protects actions requiring authentication
 * Shows login prompt when unauthenticated users try to perform protected actions
 */
export default function ProtectedAction({
  children,
  action,
  fallback,
  onAuthRequired,
}: ProtectedActionProps) {
  const { user, loading } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  // Show loading state
  if (loading) {
    return fallback || children;
  }

  // If user is authenticated, render children normally
  if (user) {
    return <>{children}</>;
  }

  // If user is not authenticated, wrap with click handler
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPrompt(true);
    onAuthRequired?.();
  };

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {fallback || children}
      </div>
      
      {showPrompt && (
        <LoginPrompt
          action={action}
          onClose={() => setShowPrompt(false)}
          returnUrl={window.location.pathname}
        />
      )}
    </>
  );
}
