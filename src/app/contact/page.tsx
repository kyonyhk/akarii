'use client';

import { Button, Input, Logo } from '@/components/atoms';
import { ExternalLink } from '@/components/icons';
import { useFounderContact } from '@/components/hooks/useFounderContact';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function ContactForm() {
  const { submitMessage, isSubmitting, isSubmitted, error, reset } =
    useFounderContact();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMessage(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-[640px] flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <div className="heading4 text-white">Message sent successfully!</div>
          <div className="paragraph1 text-white/50">
            Thank you for reaching out. You'll hear back within 24 hours.
          </div>
        </div>

        <div className="flex flex-col gap-2 w-fit">
          <Button
            onClick={() => router.push('/')}
            className="w-full mx-auto"
          >
            Home
          </Button>
          <Button
            onClick={reset}
            className="w-fit mx-auto"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <div className="heading4 text-white">
          Start a conversation that matters.
        </div>
        <div className="paragraph1 text-white/50">
          Whether you're exploring Akarii, discussing a partnership, sharing a
          story, or bringing an idea worth building, this is the direct line to
          the founder. Will respond within 24 hours.
        </div>
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Name"
          type="text"
          name="name"
          id="name"
          required
          autoComplete="name"
          className="w-full md:flex-1"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required
          autoComplete="email"
          className="w-full md:flex-1"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <Input
          placeholder="Company"
          type="text"
          name="company"
          id="company"
          autoComplete="organization"
          className="w-full md:flex-1"
          value={formData.company}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        <textarea
          placeholder="What's on your mind?"
          name="message"
          id="message"
          rows={4}
          required
          className="px-6 py-6 border border-white/20 rounded-[40px] paragraph2 text-white placeholder:text-white/50 bg-white/5 backdrop-blur-xs focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 w-full md:flex-1 resize-none"
          value={formData.message}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />

        {error && (
          <div className="paragraph2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <Button
          type="submit"
          icon={<ExternalLink size={16} />}
          className="w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : "Let's Talk"}
        </Button>
      </form>

      <div>
        <div className="heading5 text-white">
          Akarii is for teams who don't settle.
        </div>
        <div className="paragraph2 text-white/50">
          We're building the core intelligence of modern teams where work,
          memory, and decisions live together.
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="absolute top-10 flex flex-col justify-center">
        <Logo size={64} />
        <div className="heading5 text-white">AKARII</div>
      </div>

      <ContactForm />
    </main>
  );
}
