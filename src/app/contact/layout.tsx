import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talk to Founder - Akarii',
  description:
    'Connect directly with the Akarii founder. Share your feedback, ideas, or questions about the AI workspace for teams.',
  openGraph: {
    title: 'Talk to Founder - Akarii',
    description: 'Connect directly with the Akarii founder',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}