import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

export type CustomColours =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'turquoise'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'violet'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'dull';

export enum Hues {
  red = '#f44336',
  orange = '#ff9800',
  yellow = '#ffeb3b',
  green = '#4caf50',
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

enum Contrast {
  red = 'l',
  orange = 'd',
  yellow = 'd',
  green = 'l',
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

export default createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#0c103d',
    },
    ...colourDefinitions,
  },
});
