/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        protest: ["Protest Revolution", "system-ui", "sans-serif"],
        cabin: ["Cabin Sketch", "system-ui", "sans-serif"],
        rockSalt: ["Rock Salt", "system-ui", "sans-serif"],
        sawarabi: ["Sawarabi Gothic", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
