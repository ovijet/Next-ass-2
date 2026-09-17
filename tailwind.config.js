/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B0F17",
          card: "#151C2C",
          accent: "#7C3AED",
          cyan: "#06B6D4",
          gold: "#F59E0B"
        }
      }
    },
  },
  plugins: [],
}
