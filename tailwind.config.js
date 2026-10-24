/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
      },
      colors: {
        brand: {
          teal: '#72B2AB',
          'teal-light': '#8ec4be',
          'teal-dark': '#245D59',
          'teal-deep': '#163f3c',
          mint: '#EAF5F2',
          'mint-light': '#F4FAF8',
          ivory: '#FAF8F4',
          cream: '#F4EFEB',
          charcoal: '#282D2D',
          muted: '#626C6B',
          border: '#E2EAE7',
          gold: '#C89B3C',
          'gold-light': '#F7E7C4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        editorial: ['Newsreader', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 63, 60, 0.05)',
        'card': '0 10px 30px -4px rgba(22, 63, 60, 0.08)',
        'float': '0 20px 40px -8px rgba(22, 63, 60, 0.12)',
        'glow': '0 0 25px rgba(114, 178, 171, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
