/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#363636',
        "white": "#f5f5f5",
        "gray" : '#a4a4a4',
        "danger": "#df4759"
      },
      maxHeight:{
        '125': "125px",
        "512": "445px",
        "72": "18rem"
      }
    },
  },
  plugins: [],
}
