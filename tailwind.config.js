/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["UnifrakturMaguntia", "serif"], // Definir la nueva fuente
        sans: ["Roboto", "sans-serif"], // Definir "Roboto" como fuente sans-serif
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
