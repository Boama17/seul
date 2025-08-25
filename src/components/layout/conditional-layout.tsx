"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import WaitlistOverlay (client-only)
const WaitlistOverlay = dynamic(() => import("../home/waitlist-overlay"), {
  ssr: false,
});

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const [showWaitlist, setShowWaitlist] = useState(true);

  useEffect(() => {
    // Check localStorage if the user already completed the waitlist
    const hasCompleted = localStorage.getItem("waitlistCompleted");
    if (hasCompleted === "true") {
      setShowWaitlist(false);
    }
  }, []);

  const handleWaitlistComplete = () => {
    // Mark waitlist as completed
    localStorage.setItem("waitlistCompleted", "true");
    setShowWaitlist(false);
  };

  return (
    <>
      {showWaitlist && (
        <WaitlistOverlay onComplete={handleWaitlistComplete} />
      )}
      {!showWaitlist && children}
    </>
  );
}
