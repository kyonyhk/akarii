import { Button, Input, Logo } from '@/components/atoms';
import { ExternalLink } from '@/components/icons';
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

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="absolute top-10 flex flex-col justify-center">
        <Logo size={64} />
        <div className="heading5 text-white">AKARII</div>
      </div>

      <div className="max-w-[640px] flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <div className="heading4 text-white">
            Start a conversation that matters.
          </div>
          <div className="paragraph1 text-white/50">
            Whether you’re exploring Akarii, discussing a partnership, sharing a
            story, or bringing an idea worth building, this is the direct line
            to the founder. Will respond within 24 hours.
          </div>
        </div>

        <form
          className="flex flex-col gap-2"
          action="#"
          method="POST"
        >
          <Input
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            required
            autoComplete="name"
            className="w-full md:flex-1"
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            className="w-full md:flex-1"
          />
          <Input
            placeholder="Company"
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            className="w-full md:flex-1"
          />
          <textarea
            placeholder="What's on your mind?"
            name="message"
            id="message"
            rows={4}
            required
            className="px-6 py-6 border border-white/20 rounded-[40px] paragraph2 text-white placeholder:text-white/50 bg-white/5 backdrop-blur-xs focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 w-full md:flex-1 resize-none"
          />
          <Button
            type="submit"
            icon={<ExternalLink size={16} />}
            className="w-fit"
          >
            Let's Talk
          </Button>
        </form>

        <div>
          <div className="heading5 text-white">
            Akarii is for teams who don’t settle.
          </div>
          <div className="paragraph2 text-white/50">
            We’re building the core intelligence of modern teams where work,
            memory, and decisions live together.
          </div>
        </div>
      </div>
    </main>
  );
}
