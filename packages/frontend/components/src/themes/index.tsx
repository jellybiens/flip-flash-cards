import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';
import './fonts/fonts.css';

export enum Hues {
  white = '#fbfbfb',
  black = '#131313',
  red = '#f44336',
  orange = '#ff9800',
  yellow = '#ffeb3b',
  green = '#4caf50',
  lime = '#76ff03',
  turquoise = '#009688',
  cyan = '#00bcd4',
  blue = '#2196f3',
  purple = '#9c27b0',
  violet = '#673ab7',
  gold = '#ffe55b',
  silver = '#C0C0C0',
  bronze = '#cd7f32',
  dull = '#696969',
}

export enum Contrast {
  white = 'd',
  black = 'l',
  red = 'l',
  orange = 'd',
  yellow = 'd',
  green = 'l',
  lime = 'd',
  turquoise = 'l',
  cyan = 'l',
  blue = 'l',
  purple = 'l',
  violet = 'l',
  gold = 'd',
  silver = 'd',
  bronze = 'd',
  dull = 'l',
}

const colours = Object.keys(Hues).map((k: unknown) => k as Hues);
let colourDefinitions = {};
colours.map((c) => {
  colourDefinitions = Object.assign(colourDefinitions, {
    [c]: {
      light: lighten(Hues[c], 0.25),
      main: Hues[c],
      dark: darken(Hues[c], 0.2),
      contrastText: Contrast[c] === 'd' ? darken(Hues[c], 0.85) : lighten(Hues[c], 0.95),
    },
  });
});

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'OliverRegular',
      'PumpkinCheesecake',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#00bcd4',
    },
    ...colourDefinitions,
  },
});

export default theme;
