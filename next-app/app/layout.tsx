import type { Metadata } from 'next';
import './globals.css';
import type { ReactNode } from 'react';
import { BodyWithPreload } from '@/components/BodyWithPreload';

export const metadata: Metadata = {
  title: 'Dr Fernando Mateos-González',
  description: 'Field biologist, scientist, expedition leader',
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
              &copy; Fernando Mateos-González. Design{' '}
              <a href="https://html5up.net" target="_blank" rel="noreferrer">
                HTML5 UP
              </a>
              .
            </p>
          </footer>
        </div>
        <div id="bg" />
      </BodyWithPreload>
    </html>
  );
}

