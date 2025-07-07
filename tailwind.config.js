/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      fontWeight: {
        'orbitron-regular': '400',
        'orbitron-medium': '500',
        'orbitron-extra-bold': '800',
        'orbitron-black': '900',
      }
    },
  },
  plugins: [],
} 