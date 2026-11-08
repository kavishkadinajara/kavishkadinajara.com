import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        display: ["var(--font-space-grotesk)", '"Space Grotesk"', "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", '"JetBrains Mono"', "monospace"],
        body:    ["var(--font-inter)", '"Inter"', "sans-serif"],
      },
      colors: {
        // brown re-theme: remap blue-ish palettes to warm browns
        cyan:   {50:'#fbf6f1',100:'#f3e6d8',200:'#e8d0b5',300:'#dcb78f',400:'#d4a373',500:'#c08552',600:'#a06a3e',700:'#7d502d',800:'#573720',900:'#3a2414',950:'#1f130b'},
        blue:   {50:'#fbf6f1',100:'#f3e6d8',200:'#e8d0b5',300:'#dcb78f',400:'#d4a373',500:'#c08552',600:'#a06a3e',700:'#7d502d',800:'#573720',900:'#3a2414',950:'#1f130b'},
        sky:    {50:'#fbf6f1',100:'#f3e6d8',200:'#e8d0b5',300:'#dcb78f',400:'#d4a373',500:'#c08552',600:'#a06a3e',700:'#7d502d',800:'#573720',900:'#3a2414',950:'#1f130b'},
        indigo: {50:'#fbf6f1',100:'#f3e6d8',200:'#e8d0b5',300:'#dcb78f',400:'#d4a373',500:'#c08552',600:'#a06a3e',700:'#7d502d',800:'#573720',900:'#3a2414',950:'#1f130b'},
        'bg-primary': '#0A0705',
        'bg-secondary': '#140D09',
        'bg-card': '#1C110B',
        'accent-blue': '#C08552',
        'accent-cyan': '#D4A373',
        'accent-green': '#10B981',
        'text-primary': '#F5EDE6',
        'text-muted': '#A8927F',
      },
      animation: {
        'orbit': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbit 12s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideUp': 'slideUp 0.6s ease-out forwards',
        'gradient-border': 'gradientBorder 3s ease infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientBorder: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(192,133,82,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(192,133,82,0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(192,133,82,0.4), 0 0 40px rgba(192,133,82,0.1)',
        'glow-cyan': '0 0 20px rgba(212,163,115,0.4), 0 0 40px rgba(212,163,115,0.1)',
        'glow-green': '0 0 20px rgba(16,185,129,0.4)',
        'card': '0 0 0 1px rgba(192,133,82,0.15), 0 4px 20px rgba(0,0,0,0.4)',
      },
      borderColor: {
        'accent': 'rgba(192,133,82,0.2)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    nextui(),
  ],
}
