/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- ADDED HERE: Tells Tailwind to look for the 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clean-bg': '#ffffff',      // Pure white
        'clean-text': '#111111',    // Almost black (softer than #000)
        'clean-sub': '#666666',     // Muted gray
        'clean-green': '#003300',   // Deep green for text
        'clean-accent': '#e6f4ea',  // Very pale green tint
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'], 
      },
      backgroundImage: {
        'green-gradient': 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
      }
    },
  },
  plugins: [],
}