/** @type {import('tailwindcss').Config} */
export default {
    content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors:{
        'card-bg':"#F0F0F0"
      },
      backgroundImage:{
        'gradient-border':'linear-gradient(to bottom ,#C6D8FD ,#207EFF )'
      },
      backgroundColor: theme => ({
        'card-bg-50': 'rgba(240,240,240,0.5)',
      }),
    },
  },
  plugins: [],
}

