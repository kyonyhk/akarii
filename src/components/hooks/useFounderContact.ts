"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function useFounderContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFounderMessage = useMutation(api.founderMessages.addFounderMessage);

  const submitMessage = async (formData: ContactFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addFounderMessage({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
        referrer: typeof window !== "undefined" ? window.document.referrer : undefined,
      });

      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitted(false);
    setError(null);
    setIsSubmitting(false);
  };

  return {
    submitMessage,
    isSubmitting,
    isSubmitted,
    error,
    reset,
  };
}