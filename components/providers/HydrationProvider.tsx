"use client";

import { useEffect, useState } from "react";

interface HydrationProviderProps {
  children: React.ReactNode;
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Suppress hydration warnings for known browser extension attributes
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('Hydration failed') || 
         args[0].includes('cz-shortcut-listen') ||
         args[0].includes('server rendered HTML didn\'t match'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    setIsHydrated(true);

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="relative flex flex-col min-h-screen">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 mb-4"></div>
          <div className="flex-1 bg-gray-100"></div>
          <div className="h-16 bg-gray-200 mt-4"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}