'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional CSS classes to apply to the input
   */
  className?: string;
}

/**
 * Reusable Input component with styling patterns from the Hero component
 * Features rounded borders, glass-morphism effects, and consistent typography
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base layout and sizing
          'px-6 py-4',

          // Border and shape styling
          'border border-white/20 rounded-[40px]',

          // Typography and text styling
          'paragraph2 text-white placeholder:text-white/50',

          // Background and effects
          'bg-white/5 backdrop-blur-sm',

          // Focus states
          'focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30',

          // Disabled states
          'disabled:cursor-not-allowed disabled:opacity-50',

          // Transition effects
          'transition-colors duration-200',

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
