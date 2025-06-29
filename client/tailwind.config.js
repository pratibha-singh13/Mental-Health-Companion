import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6C63FF',
        secondary: '#FEEBCB',
        accent: '#FFD700',
        background: '#F3F4F6',
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0, 0, 0, 0.1)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
      },
    },
  },
  plugins: [forms, typography],
}
