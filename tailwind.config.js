const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // purge: [
  //   './components/*.tsx',
  //   './components/**/*.tsx',
  //   './pages/*.tsx',
  //   './pages/**/*.tsx',
  //   './styles/*.css',
  //   './styles/**/*.css',
  // ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#1b1f23',

      primary: '#0366d6',
      secondary: '#435372',
      tertiary: '#63708A',

      gray: {
        '50': '#f9fafb',
        '100': '#f4f5f7',
        '200': '#e5e7eb',
        '300': '#d2d6dc',
        '400': '#9fa6b2',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#252f3f',
        '900': '#161e2e',
      },
      red: {
        '50': '#fdf2f2',
        '100': '#fde8e8',
        '200': '#fbd5d5',
        '300': '#f8b4b4',
        '400': '#f98080',
        '500': '#f05252',
        '600': '#e02424',
        '700': '#c81e1e',
        '800': '#9b1c1c',
        '900': '#771d1d',
      },
      yellow: {
        '50': '#fdfdea',
        '100': '#fdf6b2',
        '200': '#fce96a',
        '300': '#faca15',
        '400': '#e3a008',
        '500': '#c27803',
        '600': '#9f580a',
        '700': '#8e4b10',
        '800': '#723b13',
        '900': '#633112',
      },
      green: {
        '50': '#f3faf7',
        '100': '#def7ec',
        '200': '#bcf0da',
        '300': '#84e1bc',
        '400': '#31c48d',
        '500': '#0e9f6e',
        '600': '#057a55',
        '700': '#046c4e',
        '800': '#03543f',
        '900': '#014737',
      },
      blue: {
        '50': '#f1f8ff',
        '100': '#dbedff',
        '200': '#c8e1ff',
        '300': '#79b8ff',
        '400': '#2188ff',
        '500': '#0366d6',
        '600': '#005cc5',
        '700': '#044289',
        '800': '#032f62',
        '900': '#05264c',
      },
      purple: {
        '50': '#f6f5ff',
        '100': '#edebfe',
        '200': '#dcd7fe',
        '300': '#cabffd',
        '400': '#ac94fa',
        '500': '#9061f9',
        '600': '#7e3af2',
        '700': '#6c2bd9',
        '800': '#5521b5',
        '900': '#4a1d96',
      },
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        // => @media (prefers-color-scheme: dark) { ... }
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  plugins: [require('@tailwindcss/ui')],
};
