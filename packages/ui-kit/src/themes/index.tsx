import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

export enum CustomColours {
  alpha = 'alpha',
  bravo = 'bravo',
  charlie = 'charlie',
  delta = 'delta',
  echo = 'echo',
  foxtrot = 'foxtrot',
  golf = 'golf',
  hotel = 'hotel',
  india = 'india',
}

enum Hues {
  alpha = '#f44336',
  bravo = '#2196f3',
  charlie = '#4caf50',
  delta = '#ff9800',
  echo = '#ffeb3b',
  foxtrot = '#9c27b0',
  golf = '#673ab7',
  hotel = '#00bcd4',
  india = '#009688',
}

enum Contrast {
  alpha = 'd',
  bravo = 'l',
  charlie = 'l',
  delta = 'd',
  echo = 'd',
  foxtrot = 'd',
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
      contrastText: Contrast[c] === 'd' ? darken(Hues[c], 0.75) : lighten(Hues[c], 0.95),
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
