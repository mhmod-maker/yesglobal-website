/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",   // Schwarz
        secondary: "#FFFFFF", // Weiß
        accent: "#009CFF",    // Blau
        graylight: "#F5F5F5", // Hellgrau
        graytext: "#9CA3AF"   // Mittelgrau
      }
    },
  },
  plugins: [],
}

