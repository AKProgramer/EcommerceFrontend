/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'selector',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width : {
        '7/10': '80%'
      }
    },
    colors: {
      primary : "#101828",
      secondary : '#111d3f',
      subHeading : 'rgb(226 232 240)',
      logoutBtnColor : '#FF0000',
      whiteSubHeading : '#666666',
      selected : 'purple',
      light: {
        background: '#E5E7EB',
        primaryText: '#333333',
        secondaryText: '#555555',
        accentGreen: '#00C48C',
        accentBlue: '#00B9F1',
        accentYellow: '#FFD700',
        danger: '#FF4C61',
        white: '#FFFFFF',
        graySidebar: '#E5E7EB',
        chartLineGreen: '#3BCEAC',
        chartFillGreen: '#D6F5EC',
        sidebarBackground: '#F6F7F9',
      },
    }
  },
  plugins: [],
}
// primary : '#0A0A11'
//#3D1F5F
