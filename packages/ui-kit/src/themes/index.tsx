import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

export enum CustomColours {
  alpha = 'alpha',
  delta = 'delta',
  echo = 'echo',
  charlie = 'charlie',
  india = 'india',
  hotel = 'hotel',
  bravo = 'bravo',
  foxtrot = 'foxtrot',
  golf = 'golf',
}

enum Hues {
  alpha = '#f44336',
  delta = '#ff9800',
  echo = '#ffeb3b',
  charlie = '#4caf50',
  india = '#009688',
  hotel = '#00bcd4',
  bravo = '#2196f3',
  foxtrot = '#9c27b0',
  golf = '#673ab7',
}

enum Contrast {
  alpha = 'l',
  bravo = 'l',
  charlie = 'l',
  delta = 'd',
  echo = 'd',
  foxtrot = 'l',
  golf = 'l',
  hotel = 'l',
  india = 'l',
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
      main: '#84ffff',
    },
    secondary: {
      main: '#0c103d',
    },
    ...colourDefinitions,
  },
});
