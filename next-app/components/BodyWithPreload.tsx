'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Wraps the body content and manages the is-preload class for the initial
 * reveal animation. Matches the original Dimension template behavior:
 * body starts with is-preload (content hidden/blurred), then the class
 * is removed after 100ms to trigger CSS transitions.
 */
export function BodyWithPreload({ children }: { children: ReactNode }) {
  const [isPreload, setIsPreload] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPreload(false);
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <body className={isPreload ? 'is-preload' : undefined}>
      {children}
    </body>
  );
}
