/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,scss,css,html}'],
  darkMode: false,
  variants: {
    extend: {
      borderRadius: ['hover'],
      height: ['hover']
    }
  },
  theme: {
    extend: {
      width: {
        408: '25.5rem',
        300: '18.75rem',
        500: '31.25rem',
        62: '3.875rem',
        770: '48.125rem'
      },
      height: {
        18: '4.5rem',
        62: '3.875rem'
      },
      spacing: {
        75: '4.6875rem',
        22: '5.5rem'
      },
      fontSize: {
        xxs: '0.625rem'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%'
      }
    },
    colors: {
      status: { waiting: '#FFD336', leaking: '#FF8B36' },
      white: '#fff',
      black: '#121212',
      grey25: '#FCFCFD',
      grey50: '#191b1f',
      grey100: '#F2F4F7',
      grey200: '#2d2f35',
      grey300: '#D0D5DD',
      grey400: '#C4C4C4',
      grey500: '#636366',
      grey600: '#8E8E93',
      grey700: '#afb3ba',
      grey750: '#3A3A3C',
      grey800: '#2C2C2E',
      grey850: '#2d2e35',
      grey900: '#202024',
      yellow: '#ffd467',
      danger: '#E75F55',
      primary: '#00ED76',
      secondary: '#D1ADFF',
      primary300: '#3BB278',
      primary500: '#00ed7b',
      primary700: '#41C681',
      error: '#dc3545',
      red: '#FD4040',
      border: '#636366',
      innerBorder: '#48484A'
    }
  },
  plugins: []
}
