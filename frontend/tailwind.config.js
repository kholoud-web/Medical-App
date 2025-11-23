/** @type {import('tailwindcss').Config} */
export default {
    content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        'card-bg':"#F0F0F0",
        'primary-black':"#1D4ED8",
        "primary-blue":"rgba(56, 104, 200, 1)",
        "primary-white":'rgba(237, 243, 255, 1)'
      },
      backgroundImage:{
        'gradient-border':'linear-gradient(to bottom ,#C6D8FD ,#207EFF )'
      },
      backgroundColor: theme => ({
        'card-bg-50': 'rgba(240,240,240,0.5)',
        "bg-blue":"rgba(56, 104, 200, 1)",
      }),
    },
  },
  plugins: [],
}

