'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavBar from './nav';
import WaitlistOverlay from '../home/waitlist-overlay';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuxPage = pathname.includes('/about') || 
                    pathname.includes('/contact');

  // Only show waitlist on home page
  const isHomePage = pathname === '/';

  // Check if user has already completed waitlist
  useEffect(() => {
    const hasCompletedWaitlist = localStorage.getItem('waitlist_completed');
    
    // Only show waitlist if:
    // 1. User is on home page
    // 2. User hasn't completed waitlist before
    if (isHomePage && hasCompletedWaitlist !== 'true') {
      setShowWaitlist(true);
    }
    
    setIsLoading(false);
  }, [isHomePage]);

  const handleWaitlistComplete = () => {
    localStorage.setItem('waitlist_completed', 'true');
    setShowWaitlist(false);
  };

  // Show loading spinner while checking localStorage
  if (isLoading && isHomePage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black/80 via-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      {/* Waitlist Overlay - only shows on home page if not completed */}
      {showWaitlist && (
        <WaitlistOverlay
          onComplete={handleWaitlistComplete}
          targetDate="2025-12-31T23:59:59" // Set your target launch date
        />
      )}
      
      {/* Navigation - hidden when waitlist is active or on aux pages */}
      {!showWaitlist && !isAuxPage && <NavBar />}
      
      {/* Main Content - hidden when waitlist is active */}
      <main className={`flex-grow ${showWaitlist ? 'hidden' : 'block'}`}>
        {children}
      </main>
    </>
  );
}