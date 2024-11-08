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
        link: "#0969da",
      },
      boxShadow: {
        DEFAULT:
          "rgba(31, 35, 40, 0.12) 0px 1px 3px, rgba(66, 74, 83, 0.12) 0px 8px 24px;",
      },
    },
  },
  plugins: [],
};
