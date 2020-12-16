import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    alpha?: PaletteOptions['primary'];
    bravo?: PaletteColorOptions;
    charlie?: PaletteColorOptions;
    delta?: PaletteColorOptions;
    echo?: PaletteColorOptions;
    foxtrot?: PaletteColorOptions;
    golf?: PaletteColorOptions;
    hotel?: PaletteColorOptions;
    india?: PaletteColorOptions;
  }

  interface Palette {
    alpha?: Palette['primary'];
    bravo?: PaletteColor;
    charlie?: PaletteColor;
    delta?: PaletteColor;
    echo?: PaletteColor;
    foxtrot?: PaletteColor;
    golf?: PaletteColor;
    hotel?: PaletteColor;
    india?: PaletteColor;
  }
}
