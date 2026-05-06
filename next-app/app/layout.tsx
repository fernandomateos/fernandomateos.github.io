import type { Metadata } from 'next';
import './globals.css';
import type { ReactNode } from 'react';
import { BodyWithPreload } from '@/components/BodyWithPreload';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Dr Fernando Mateos-González',
  description: 'Field biologist, scientist, expedition leader',
  icons: {
    icon: '/images/ICON.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <BodyWithPreload>
        <div id="wrapper">
          {children}
          <footer id="footer">
            <p className="copyright">
              &copy; Fernando Mateos-González. 
                      </p>
          </footer>
        </div>
        <div id="bg" />
      </BodyWithPreload>
      <Analytics />
    </html>
  );
}

