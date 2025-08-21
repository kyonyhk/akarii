import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import '../styles/globals.css';
import ConvexClientProvider from '@/components/sections/ConvexClientProvider';
import { PostHogAppProvider } from '@/components/providers/PostHogProvider';
import LenisProvider from '@/components/providers/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akarii - AI Workplace for Teams Who Move Fast',
  description:
    'An intelligent AI workspace for AI native teams. Join the waitlist to be among the first to experience the future of team collaboration.',
  keywords: ['AI', 'workspace', 'teams', 'collaboration', 'productivity'],
  authors: [{ name: 'Akarii' }],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Akarii - AI Workplace for Teams Who Move Fast',
    description: 'An intelligent AI workspace for AI native teams. Join the waitlist to be among the first to experience the future of team collaboration.',
    type: 'website',
    url: 'https://akarii.ai',
    siteName: 'Akarii',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Akarii - AI Workplace for Teams Who Move Fast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akarii - AI Workplace for Teams Who Move Fast',
    description: 'An intelligent AI workspace for AI native teams. Join the waitlist to be among the first to experience the future of team collaboration.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://akarii.ai'),
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#231A19]`}>
        {/* Safari Color Sampling Elements */}
        <div
          className="fixed top-0 left-0 w-full h-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #766F61, rgba(118, 111, 97, 0))',
            zIndex: 50,
          }}
        />

        {/* Fixed Background */}
        <div className="fixed inset-0 w-full h-full">
          <Image
            src="/background-image.png"
            alt="Background"
            fill
            className="object-cover object-center"
            style={{ zIndex: -10 }}
            priority
            quality={85}
          />
        </div>

        {/* Scrollable Content */}
        <div className="relative min-h-screen">
          <LenisProvider>
            <PostHogAppProvider>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </PostHogAppProvider>
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
