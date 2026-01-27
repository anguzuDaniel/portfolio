import type { Config } from "tailwindcss";

const config: Config = {
  // THIS LINE IS THE KEY. Without it, the toggle does nothing.
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Add this if you use a src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;