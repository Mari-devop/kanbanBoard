/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBGC": '#C5CBD3',
        "columnBGC": '#8CBCB9',
        "taskBGC": '#DCBC89'
      }
    },
  },
  plugins: [],
}