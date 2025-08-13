'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * - primary: Semi-transparent background with backdrop blur (default Hero style)
   * - ghost: Transparent background with border only
   * - outline: Border-only style without background
   */
  variant?: 'primary' | 'ghost' | 'outline';

  /**
   * Button size
   * - default: Standard padding (px-6 py-4)
   * - sm: Smaller padding (px-4 py-2)
   * - lg: Larger padding (px-8 py-5)
   */
  size?: 'sm' | 'default' | 'lg';

  /**
   * Optional icon to display alongside text
   * Should be a React component that accepts size and className props
   */
  icon?: ReactNode;

  /**
   * Position of the icon relative to text
   */
  iconPosition?: 'left' | 'right';

  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;

  /**
   * Content of the button
   */
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles shared across all variants
    const baseStyles = cn(
      // Layout & Structure
      'inline-flex items-center justify-center',
      'rounded-[40px]',
      'border',
      'transition-all duration-200 ease-in-out',

      // Typography
      'paragraph2',

      // Interactive States
      'focus:outline-none focus:ring-1 focus:ring-white/20 focus:ring-offset-0 focus:ring-offset-transparent',
      'active:scale-95',

      // Disabled State
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-opacity-5',

      // Full Width
      fullWidth ? 'w-full' : 'w-fit'
    );

    // Variant-specific styles
    const variantStyles = {
      primary: cn(
        // Background & Border
        'bg-white/5 border-white/20 backdrop-blur-sm',

        // Text Color
        'text-white',

        // Hover & Active States
        'hover:bg-white/10 hover:border-white/30',
        'active:bg-white/15',

        // Disabled State
        'disabled:hover:bg-white/5'
      ),

      ghost: cn(
        // Background & Border
        'bg-transparent border-white/20',

        // Text Color
        'text-white',

        // Hover & Active States
        'hover:bg-white/5 hover:border-white/30',
        'active:bg-white/10',

        // Disabled State
        'disabled:hover:bg-transparent'
      ),

      outline: cn(
        // Background & Border
        'bg-transparent border-white/40',

        // Text Color
        'text-white/80',

        // Hover & Active States
        'hover:bg-white/5 hover:border-white/60 hover:text-white',
        'active:bg-white/10',

        // Disabled State
        'disabled:hover:bg-transparent disabled:hover:border-white/40'
      ),
    };

    // Size-specific styles
    const sizeStyles = {
      sm: 'px-4 py-2 gap-2',
      default: 'px-6 py-4 gap-4',
      lg: 'px-8 py-5 gap-5',
    };

    // Icon styles based on position and variant
    const getIconStyles = () => {
      const iconOpacity =
        variant === 'outline' ? 'text-white/60' : 'text-white/50';
      return cn(iconOpacity, 'transition-colors duration-200');
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Icon on left */}
        {icon && iconPosition === 'left' && (
          <span className={getIconStyles()}>{icon}</span>
        )}

        {/* Button text */}
        {children && <span className="flex-shrink-0">{children}</span>}

        {/* Icon on right */}
        {icon && iconPosition === 'right' && (
          <span className={getIconStyles()}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
