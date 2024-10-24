/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#278a41",
        "primary-hover": "#18b541",
        danger: "#C12A24",
        "danger-hover": "#d42922",
      },
    },
  },
  plugins: [],
};
