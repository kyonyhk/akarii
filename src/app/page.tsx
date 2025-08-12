import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import ValueProposition from '@/components/sections/ValueProposition';
import Title from '@/components/sections/Title';
import Overview from '@/components/sections/Overview';
import Features from '@/components/sections/Features';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <Title />
      <Overview />
      <Features />
      <Footer />
    </main>
  );
}
