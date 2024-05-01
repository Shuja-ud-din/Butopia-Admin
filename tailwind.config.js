/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1440px" },
      // => @media (max-width: 1440px) { ... }
      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }
      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }
      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }
      sm: { max: "640px" },
      // => @media (max-width: 640px) { ... }
      xs: { max: "480px" },
      // => @media (max-width: 480px) { ... }
    },
    colors: {
      primary: "#039443",
      secondary: "#b5b5b5",
      light: "F8F8F8",
    },
    extend: {
      fontFamily: {
        segoe: "Segoe UI",
        segoeBold: "Segoe UI Bold",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
