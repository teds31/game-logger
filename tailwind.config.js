/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "sig-red": 'E51736',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

