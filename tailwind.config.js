/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./MyuzeRedesign/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a", // Primary dark blue/almost black
        secondary: "#f5f5f7", // Light gray/white for backgrounds
        gray: {
          light: "#e0e0e0", // Light gray for inactive states
          medium: "#9e9e9e", // Medium gray for placeholders
          dark: "#616161", // Dark gray for supporting text
        },
        accent: {
          blue: "#3b82f6", // Blue for gradient
          purple: "#8b5cf6", // Purple for gradient
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
}; 