/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      perspective: {
        1000: "1000px", // Adds perspective for 3D effects
      },
      translate: {
        "z-10": "10px", // Move forward along the Z-axis
        "z-20": "20px",
        "z-30": "30px",
      },
    },
  },
  plugins: [],
};
