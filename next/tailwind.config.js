/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sniglet: ["Sniglet"],
      },
      colors: {
        "sniglet-blue": "#38B5DCA1",
        "sngilet-blue-light": "#81E1FF",
        "sniglet-blue-dark": "#38B5DC",
      },
    },
  },
  plugins: [],
};
