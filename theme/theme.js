import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#fdfaea',
      '#fcf6d5',
      '#f8edac',
      '#f5e382',
      '#f1da59',
      '#eed12f',
      '#d6bc2a',
      '#bea726',
      '#a79221',
      '#8f7d1c',
    ],
  },
  fontFamily: 'Montserrat',
  headings: {
    fontFamily: 'Playfair Display',
  },
  defaultRadius: 'md',
});

export { theme };
