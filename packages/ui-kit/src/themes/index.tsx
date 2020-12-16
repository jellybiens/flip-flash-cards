import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

export enum CustomColours {
  alpha = 'alpha',
  bravo = 'delta',
  charlie = 'echo',
  delta = 'charlie',
  echo = 'india',
  foxtrot = 'hotel',
  golf = 'bravo',
  hotel = 'foxtrot',
  india = 'golf',
}

enum Hues {
  alpha = '#f44336',
  bravo = '#ff9800',
  charlie = '#ffeb3b',
  delta = '#4caf50',
  echo = '#009688',
  foxtrot = '#00bcd4',
  golf = '#2196f3',
  hotel = '#9c27b0',
  india = '#673ab7',
}

enum Contrast {
  alpha = 'l',
  bravo = 'd',
  charlie = 'd',
  delta = 'l',
  echo = 'l',
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
