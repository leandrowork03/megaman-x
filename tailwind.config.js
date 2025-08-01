// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // páginas no /app
    "./pages/**/*.{js,ts,jsx,tsx}",   // páginas no /pages
    "./components/**/*.{js,ts,jsx,tsx}", // componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
