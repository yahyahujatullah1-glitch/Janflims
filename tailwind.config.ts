import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      colors: {
        accent:   'var(--color-accent)',
        danger:   'var(--color-danger)',
        success:  'var(--color-success)',
        surface:  'var(--color-bg-surface)',
        surface2: 'var(--color-bg-surface-2)',
      },
      animation: {
        shimmer:  'shimmer 1.5s ease infinite',
        fadeIn:   'fadeIn 0.35s ease both',
        fadeUp:   'fadeUp 0.5s ease both',
        slideLeft:'slideLeft 0.55s cubic-bezier(0.16,1,0.3,1) both',
        scaleIn:  'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        spin:     'spin 0.7s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
