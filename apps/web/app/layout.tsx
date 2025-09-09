'use client';
import { ReactNode, useEffect } from 'react';
import { trackPageView } from './telemetry';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
