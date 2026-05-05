/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A227',
        'gold-light': '#F5C842',
        green: {
          DEFAULT: '#0E9E06',
          dark: '#0A7205',
          light: '#16C70C',
        },
        muted: {
          DEFAULT: '#5E665E',
          light: '#8A938A',
        },
        bg: {
          DEFAULT: '#F4F4EF',
          2: '#ECEEE8',
          3: '#E4E6DF',
        },
        dark: '#1C1C1A',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0E9E06, #C9A227)',
        'gradient-green-gold': 'linear-gradient(90deg, #0E9E06, #C9A227)',
      },
      boxShadow: {
        'green-glow': '0 0 18px rgba(14,158,6,0.22)',
        'gold-glow': '0 0 18px rgba(201,162,39,0.3)',
        card: '0 2px 12px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 36px rgba(14,158,6,0.09)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        floatCard: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
        livePulse: { '0%,100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(22,199,12,0.4)' }, '50%': { opacity: 0.7, boxShadow: '0 0 0 5px rgba(22,199,12,0)' } },
        scrollPulse: { '0%,100%': { opacity: 0.3, transform: 'scaleY(0.7)' }, '50%': { opacity: 1, transform: 'scaleY(1)' } },
        connectorFlow: { '0%': { backgroundPosition: '0% 0' }, '100%': { backgroundPosition: '200% 0' } },
        feedIn: { to: { opacity: 1, transform: 'translateY(0)' } },
        logoPulse: { from: { opacity: 0.6, transform: 'scale(0.97)' }, to: { opacity: 1, transform: 'scale(1)' } },
        loadBar: { from: { width: '0' }, to: { width: '100%' } },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        blink: 'blink 0.7s step-end infinite',
        floatCard: 'floatCard 4.5s ease-in-out infinite',
        livePulse: 'livePulse 1.2s ease-in-out infinite',
        scrollPulse: 'scrollPulse 2.2s ease-in-out infinite',
        connectorFlow: 'connectorFlow 3s linear infinite',
        feedIn: 'feedIn 0.5s forwards',
        logoPulse: 'logoPulse 1s ease-in-out infinite alternate',
        loadBar: 'loadBar 1.2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
