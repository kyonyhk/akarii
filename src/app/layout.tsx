import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import '../styles/globals.css';
import ConvexClientProvider from '@/components/sections/ConvexClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akarii - AI Workplace for Teams Who Move Fast',
  description:
    'An intelligent AI workspace for AI native teams. Join the waitlist to be among the first to experience the future of team collaboration.',
  keywords: ['AI', 'workspace', 'teams', 'collaboration', 'productivity'],
  authors: [{ name: 'Akarii' }],
  openGraph: {
    title: 'Akarii - AI Workplace for Teams Who Move Fast',
    description: 'An intelligent AI workspace for AI native teams',
    type: 'website',
  },
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
            zIndex: 10,
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
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </div>
      </body>
    </html>
  );
}
