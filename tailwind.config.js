/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: "#12072B",
        "space-card": "#1A0B3D",
      },
    },
  },
  plugins: [],
};
