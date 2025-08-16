/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors with opacity support
        white: '#dbdbdb',
        black: '#0a0a0a',

        // Primary brand colors extracted from Figma
        primary: {
          base: '#22272F',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#22272F',
          900: '#1a1e23',
        },
        // Background colors
        background: {
          dark: '#1a1e23',
          overlay: 'rgba(34, 39, 47, 0.9)',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#e9ecef',
          muted: '#adb5bd',
        },
        // Accent colors
        accent: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
        },
      },
      fontFamily: {
        // PP Neue Montreal for chat and context panels
        'neue-montreal': [
          'PP Neue Montreal',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        // PP Pangaia Light for headings
        pangaia: [
          'PP Pangaia Light',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        // PP Museum Light for paragraphs
        museum: [
          'PP Museum Light',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        // PP Mondwest Regular for eyebrows
        mondwest: [
          'PP Mondwest Regular',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        // Legacy fallbacks
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        // PP Pangaia Light - Headings (Mobile first, then desktop)
        'heading-mega1': ['10rem', { lineHeight: '0.7', fontWeight: '300' }], // 96px mobile -> 192px desktop
        'heading-mega2': ['6rem', { lineHeight: '0.7', fontWeight: '300' }], // 64px mobile -> 128px desktop
        'heading-mega3': ['4rem', { lineHeight: '0.7', fontWeight: '300' }], // 64px mobile -> 128px desktop
        heading1: ['3rem', { lineHeight: '1.0', fontWeight: '300' }], // 48px mobile -> 60px desktop
        heading2: ['2.25em', { lineHeight: '1.0', fontWeight: '300' }], // 36px mobile -> 48px desktop
        heading3: ['1.875rem', { lineHeight: '1.0', fontWeight: '300' }], // 30px mobile -> 36px desktop
        heading4: ['1.5rem', { lineHeight: '1.0', fontWeight: '300' }], // 24px mobile -> 30px desktop
        heading5: ['1.25rem', { lineHeight: '1.0', fontWeight: '300' }], // 20px mobile -> 24px desktop

        // PP Museum Light - Paragraphs (Mobile first, then desktop)
        paragraph1: ['1rem', { lineHeight: '1.4', fontWeight: '300' }], // 16px mobile -> 20px desktop
        paragraph2: ['0.875rem', { lineHeight: '1.4', fontWeight: '300' }], // 14px mobile -> 16px desktop

        // PP Mondwest Regular - Eyebrows (Mobile first, then desktop)
        eyebrow1: ['1.875rem', { lineHeight: '1.0', fontWeight: '400' }], // 24px mobile -> 36px desktop
        eyebrow2: ['1.5rem', { lineHeight: '1.0', fontWeight: '400' }], // 20px mobile -> 30px desktop
        eyebrow3: ['1.25rem', { lineHeight: '1.0', fontWeight: '400' }], // 18px mobile -> 24px desktop
        eyebrow4: ['1rem', { lineHeight: '1.0', fontWeight: '400' }], // 16px mobile -> 20px desktop
        eyebrow5: ['0.875rem', { lineHeight: '1.0', fontWeight: '400' }], // 14px mobile -> 16px desktop

        // Desktop sizes (to be used with md: prefix)
        'heading-mega1-md': ['12rem', { lineHeight: '0.7', fontWeight: '300' }], // 192px
        'heading-mega2-md': ['10rem', { lineHeight: '0.7', fontWeight: '300' }], // 128px
        'heading-mega3-md': ['8rem', { lineHeight: '0.7', fontWeight: '300' }], // 128px
        'heading1-md': ['3.75rem', { lineHeight: '1.0', fontWeight: '300' }], // 60px
        'heading2-md': ['3rem', { lineHeight: '1.0', fontWeight: '300' }], // 48px
        'heading3-md': ['2.25rem', { lineHeight: '1.0', fontWeight: '300' }], // 36px
        'heading4-md': ['1.875rem', { lineHeight: '1.0', fontWeight: '300' }], // 30px
        'heading5-md': ['1.5rem', { lineHeight: '1.0', fontWeight: '300' }], // 24px
        'paragraph1-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '300' }], // 20px
        'paragraph2-md': ['1rem', { lineHeight: '1.4', fontWeight: '300' }], // 16px
        'eyebrow1-md': ['2.25rem', { lineHeight: '1.0', fontWeight: '400' }], // 36px
        'eyebrow2-md': ['1.875rem', { lineHeight: '1.0', fontWeight: '400' }], // 30px
        'eyebrow3-md': ['1.5rem', { lineHeight: '1.0', fontWeight: '400' }], // 24px
        'eyebrow4-md': ['1.25rem', { lineHeight: '1.0', fontWeight: '400' }], // 20px
        'eyebrow5-md': ['1rem', { lineHeight: '1.0', fontWeight: '400' }], // 16px

        // PP Neue Montreal - Chat Application Typography (Mobile first, then desktop)
        'app-heading': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '700', letterSpacing: '0.01em' },
        ], // 14px mobile
        'app-heading-md': [
          '1rem',
          { lineHeight: '1.0', fontWeight: '700', letterSpacing: '0.01em' },
        ], // 16px desktop
        'app-subheading': [
          '0.75rem',
          { lineHeight: '1.0', fontWeight: '700', letterSpacing: '0.01em' },
        ], // 12px mobile
        'app-subheading-md': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '700', letterSpacing: '0.01em' },
        ], // 14px desktop
        'app-paragraph1': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.01em' },
        ], // 14px mobile
        'app-paragraph1-md': [
          '1rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.01em' },
        ], // 16px desktop
        'app-paragraph2': [
          '0.75rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.02em' },
        ], // 12px mobile
        'app-paragraph2-md': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.02em' },
        ], // 14px desktop
        'app-eyebrow': [
          '0.625rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.00em' },
        ], // 10px mobile
        'app-eyebrow-md': [
          '0.75rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.00em' },
        ], // 12px desktop
        'app-support': [
          '0.625rem',
          { lineHeight: '1.0', fontWeight: '400', letterSpacing: '0.05em' },
        ], // 10px mobile
        'app-support-md': [
          '0.75rem',
          { lineHeight: '1.0', fontWeight: '400', letterSpacing: '0.05em' },
        ], // 12px desktop

        // PP Neue Montreal - Context Panel Typography (Mobile first, then desktop)
        'app-h1': [
          '1.125rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.0em' },
        ], // 18px mobile
        'app-h1-md': [
          '1.25rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.0em' },
        ], // 20px desktop
        'app-h2': [
          '1rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.01em' },
        ], // 16px mobile
        'app-h2-md': [
          '1.125rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.01em' },
        ], // 18px desktop
        'app-h3': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.02em' },
        ], // 14px mobile
        'app-h3-md': [
          '1rem',
          { lineHeight: '1.0', fontWeight: '500', letterSpacing: '0.02em' },
        ], // 16px desktop
        'app-p': [
          '0.75rem',
          { lineHeight: '1.0', fontWeight: '400', letterSpacing: '0.03em' },
        ], // 12px mobile
        'app-p-md': [
          '0.875rem',
          { lineHeight: '1.0', fontWeight: '400', letterSpacing: '0.03em' },
        ], // 14px desktop

        // Legacy fallbacks (keep for existing components)
        hero: ['2.5rem', { lineHeight: '1.0', fontWeight: '300' }],
        'hero-sm': ['1.5rem', { lineHeight: '1.0', fontWeight: '300' }],
        h1: ['1.75rem', { lineHeight: '1.0', fontWeight: '300' }],
        h2: ['1.25rem', { lineHeight: '1.0', fontWeight: '300' }],
        h3: ['1.125rem', { lineHeight: '1.0', fontWeight: '300' }],
        'body-lg': ['1rem', { lineHeight: '1.4', fontWeight: '300' }],
        body: ['0.875rem', { lineHeight: '1.4', fontWeight: '300' }],
        'body-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '300' }],
        caption: ['0.625rem', { lineHeight: '1.0', fontWeight: '400' }],
      },
      spacing: {
        // Custom spacing scale
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        128: '32rem',
        144: '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backgroundImage: {
        'gradient-dark':
          'linear-gradient(135deg, rgba(26, 30, 35, 0.9) 0%, rgba(34, 39, 47, 0.8) 100%)',
        'hero-gradient':
          'linear-gradient(180deg, rgba(26, 30, 35, 0.2) 0%, rgba(34, 39, 47, 0.9) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'panel-slide-in': 'panelSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'panel-slide-out': 'panelSlideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'button-fade-in':
          'buttonFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        panelSlideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        panelSlideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1', width: '380px' },
          '100%': { transform: 'translateX(100%)', opacity: '0', width: '0px' },
        },
        buttonFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        contextPanelDelayedEntry: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};
