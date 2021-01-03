import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    white?: PaletteColorOptions;
    black?: PaletteColorOptions;
    red?: PaletteColorOptions;
    orange?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
    green?: PaletteColorOptions;
    turquoise?: PaletteColorOptions;
    cyan?: PaletteColorOptions;
    blue?: PaletteColorOptions;
    purple?: PaletteColorOptions;
    violet?: PaletteColorOptions;
    gold?: PaletteColorOptions;
    silver?: PaletteColorOptions;
    bronze?: PaletteColorOptions;
    dull?: PaletteColorOptions;
  }

  interface Palette {
    white?: PaletteColor;
    black?: PaletteColor;
    red?: PaletteColor;
    orange?: PaletteColor;
    yellow?: PaletteColor;
    green?: PaletteColor;
    turquoise?: PaletteColor;
    cyan?: PaletteColor;
    blue?: PaletteColor;
    purple?: PaletteColor;
    violet?: PaletteColor;
    gold?: PaletteColor;
    silver?: PaletteColor;
    bronze?: PaletteColor;
    dull?: PaletteColor;
  }
}
