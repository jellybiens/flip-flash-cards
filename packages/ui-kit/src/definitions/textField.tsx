import { darken, lighten, Theme } from '@material-ui/core';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import { CustomColours } from '@types';
import { Contrast } from '../themes';

export enum ErrorColours {
  white = '#f44336',
  black = '#f44336',
  red = '#2196f3',
  orange = '#2196f3',
  yellow = '#2196f3',
  green = '#f44336',
  lime = '#f44336',
  turquoise = '#f44336',
  cyan = '#f44336',
  blue = '#f44336',
  purple = '#00bcd4',
  violet = '#00bcd4',
}

export const textFieldColours = (
  theme: Theme,
): { [key: string]: CreateCSSProperties } => {
  const colours = {};
  Object.keys(ErrorColours).map((k: CustomColours) => {
    const colour = theme.palette[k];

    const dark = Contrast[k] === 'l';
    const contrastText = colour.contrastText;
    const background = colour.light;
    const hover = dark ? lighten(colour.main, 0.5) : darken(colour.main, 0.5);
    const focus = dark ? lighten(colour.main, 0.9) : darken(colour.main, 0.9);
    const errorText = ErrorColours[k];
    // const errorShadow = theme.palette.white.main;

    colours[`root-${k}-bg`] = {
      backgroundColor: background,
    };
    colours[`root-${k}`] = {
      color: contrastText,
      '& input': {
        color: contrastText,
      },
      '& label.MuiFormLabel-root': {
        color: contrastText,
      },
      '& label.Mui-focused': {
        color: contrastText,
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: hover,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: focus,
      },
      '& .MuiInput-underline': {
        color: contrastText,
        '&:hover': {
          '&:before': {
            borderBottomColor: hover,
          },
          '&:after': {
            borderBottomColor: focus,
          },
        },
      },

      '& .MuiFormHelperText-root.Mui-error': {
        fontWeight: 'bold',
        color: errorText,
        // textShadow: `
        //   1px 1px 0px ${errorShadow},
        //   -1px 1px 0px ${errorShadow},
        //   1px -1px 0px ${errorShadow},
        //   -1px -1px 0px ${errorShadow},
        //   1px 0px 0px ${errorShadow},
        //   0px 1px 0px ${errorShadow},
        //   -1px 0px 0px ${errorShadow},
        //   0px -1px 0px ${errorShadow}
        // `,
      },

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: contrastText,
        },
        '&:hover fieldset': {
          borderColor: contrastText,
        },
        '&.Mui-focused fieldset': {
          borderColor: contrastText,
        },
      },
    };
  });
  return colours;
};
