module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeBlack: "#07090D",
        themeBackground: "#171c28",
        themeBackgroundLight: "#1E2434", 
        themeAccent: "#09BC8A",
        themeMild: "#8A99BC",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
