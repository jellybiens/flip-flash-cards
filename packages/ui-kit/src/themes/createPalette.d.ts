import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    alpha?: PaletteColorOptions;
    beta?: PaletteColorOptions;
    gamma?: PaletteColorOptions;
    omega?: PaletteColorOptions;
    bg?: PaletteColorOptions;
  }

  interface Palette {
    alpha?: PaletteColor;
    beta?: PaletteColor;
    gamma?: PaletteColor;
    omega?: PaletteColor;
    bg?: PaletteColor;
  }
}
