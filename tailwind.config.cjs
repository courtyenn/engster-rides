/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",

        // Dark sections
        bg1: "rgb(var(--color-bg1) / <alpha-value>)",
        text1: "rgb(var(--color-text1) / <alpha-value>)",
        link1: "rgb(var(--color-link1) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Verdana", "sans-serif"],
        body: ["Inter", "Helvetica", "Verdana", "sans-serif"],
        accent: ["Poppins", "Helvetica", "Verdana", "sans-serif"],
      },
      boxShadow: {
        inset: " inset 2px 2px 40px -20px rgba(0, 0, 0, 0.3)",
        "inset-s": " inset 2px 2px 30px -10px rgba(0, 0, 0, 0.4)",
      },
      screens: {
        xs: "500px",
      },
      backgroundImage: {
        engstarides: "url('/engsta_logo_full@small.png')",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "16px" },
      });
    }),
  ],
};
