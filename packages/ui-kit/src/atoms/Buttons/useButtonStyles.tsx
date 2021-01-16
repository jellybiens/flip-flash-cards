import { makeStyles, Theme } from '@material-ui/core';
import { CustomColours } from '@types';
import { Hues } from '../../themes';

export const useStyles = makeStyles((theme: Theme) => {
  const colours = Object.keys(Hues).map((k: unknown) => k as CustomColours);
  let colourObjects = {};
  colours.map((c) => {
    colourObjects = Object.assign(colourObjects, {
      [c]: {
        backgroundColor: theme.palette[c].main,
        color: theme.palette[c].contrastText,
        '&:hover': { backgroundColor: theme.palette[c].dark },
      },
    });
  });

  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
      boxShadow: `grey 0px 1px 3px;`,
      // whiteSpace: 'nowrap',

      '&:hover': {
        transform: 'scale(1.02)',
        '&:active': {
          transform: 'scale(0.98)',
        },
      },
    },
    disabledButton: {
      backgroundColor: `${theme.palette.dull.main} !important`,
      color: `${theme.palette.dull.contrastText} !important`,
      '&:hover': { backgroundColor: 'unset' },
    },
    ...colourObjects,
  };
});
