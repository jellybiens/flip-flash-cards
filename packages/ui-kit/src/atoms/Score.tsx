import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { CustomColours } from '@types';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles((theme: Theme) => {
  const textDarkShadow = (colour: CustomColours) => `
    1px 1px ${(theme.palette[colour] as PaletteColor).dark},
    -1px 1px ${(theme.palette[colour] as PaletteColor).dark},
    1px -1px ${(theme.palette[colour] as PaletteColor).dark},
    -1px -1px ${(theme.palette[colour] as PaletteColor).dark}
  `;

  return {
    root: {
      display: 'flex',
      height: '100%',
      width: '100%',
    },
    scoreWrapper: {
      margin: 'auto',
      height: 'auto',
      width: 'auto',
    },
    typography: {
      height: 'auto',
      width: 'fit-content',
      transition: 'color linear 0.3s',
      [theme.breakpoints.only('xs')]: { ...theme.typography.h5 },
      [theme.breakpoints.only('sm')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h3 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
    },
    darkRed: {
      color: theme.palette.red.dark,
      textShadow: textDarkShadow('dull'),
    },
    red: {
      color: theme.palette.red.main,
      textShadow: textDarkShadow('dull'),
    },
    orange: {
      color: theme.palette.orange.main,
      textShadow: textDarkShadow('red'),
    },
    cyan: {
      color: theme.palette.cyan.main,
      textShadow: textDarkShadow('blue'),
    },
    green: {
      color: theme.palette.green.light,
      textShadow: textDarkShadow('green'),
    },
    gold: {
      color: theme.palette.gold.main,
      transition: 'unset',
      animation: `$best-score ease 1.2s`,
      textShadow: `
        ${textDarkShadow('gold')},
        2px 2px 5px ${theme.palette.gold.light}, 
        -2px 2px 5px ${theme.palette.gold.light}, 
        2px -2px 5px ${theme.palette.gold.light}, 
        -2px -2px 5px ${theme.palette.gold.light}
      `,
    },
    topScore: {
      animation: `$top-score ease 1.2s`,
      transformOrigin: 'center',
    },

    '@keyframes top-score': {
      '0%': { transform: 'scale(1)' },
      '11.66%': { transform: 'scale(1.5)' },
      '33.33%': { transform: 'scale(1)' },
      '45%': { transform: 'scale(1.5)' },
      '66.66%': { transform: 'scale(1)' },
      '78.33%': { transform: 'scale(1.5)' },
      '100%': { transform: 'scale(1)' },
    },
    '@keyframes best-score': {
      '0%': {
        transform: 'scale(1)',
        textShadow: `
          ${textDarkShadow('gold')},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light}
        `,
      },
      '11.66%': {
        transform: 'scale(1.5)',
        textShadow: `
          ${textDarkShadow('gold')},
          2px 2px 5px ${theme.palette.gold.light}, 
          -2px 2px 5px ${theme.palette.gold.light}, 
          2px -2px 5px ${theme.palette.gold.light}, 
          -2px -2px 5px ${theme.palette.gold.light}
        `,
      },
      '33.33%': {
        transform: 'scale(1)',
        textShadow: `
          ${textDarkShadow('gold')},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light}
        `,
      },
      '45%': {
        transform: 'scale(1.5)',
        textShadow: `
          ${textDarkShadow('gold')},
          2px 2px 5px ${theme.palette.gold.light}, 
          -2px 2px 5px ${theme.palette.gold.light}, 
          2px -2px 5px ${theme.palette.gold.light}, 
          -2px -2px 5px ${theme.palette.gold.light}
        `,
      },
      '66.66%': {
        transform: 'scale(1)',
        textShadow: `
          ${textDarkShadow('gold')},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light},
          0px 0px 0px ${theme.palette.gold.light}
        `,
      },
      '78.33%': {
        transform: 'scale(1.5)',
        textShadow: `
          ${textDarkShadow('gold')},
          2px 2px 5px ${theme.palette.gold.light}, 
          -2px 2px 5px ${theme.palette.gold.light}, 
          2px -2px 5px ${theme.palette.gold.light}, 
          -2px -2px 5px ${theme.palette.gold.light}
        `,
      },
      '100%': {
        transform: 'scale(1)',
        textShadow: `
          ${textDarkShadow('gold')},
          2px 2px 5px ${theme.palette.gold.light}, 
          -2px 2px 5px ${theme.palette.gold.light}, 
          2px -2px 5px ${theme.palette.gold.light}, 
          -2px -2px 5px ${theme.palette.gold.light}
        `,
      },
    },

    badScore: {
      animation: `$bad-score ease 1.6s`,
      transformOrigin: 'bottom',
      transform: 'scaleX(1.2) scaleY(0.9)',
    },
    '@keyframes bad-score': {
      '0%': { transform: 'scaleX(1) scaleY(1)' },
      '100%': { transform: 'scaleX(1.2) scaleY(0.9)' },
    },
  };
});

type ScoreProps = {
  score: number;
  max: number;
};

export const Score: React.FC<ScoreProps> = ({ score, max }) => {
  const cs = useStyles();
  const [count, setCount] = React.useState(0);
  const [textColour, setTextColour] = React.useState('darkRed');

  const percent = Math.round((score / max) * 100);

  const startEase = Math.ceil(percent / 10);
  const startEasing = Math.ceil(startEase * 2);
  const startEased = Math.ceil(startEase * 3);

  const finalEase = percent > 90 ? 86 : percent - Math.ceil(startEase / 2);
  const finalEasing = percent > 90 ? 78 : percent - startEase;

  const T = 70 / score;

  React.useEffect(() => {
    if (count === 12) setTextColour('red');
    else if (count === 26) setTextColour('orange');
    else if (count === 51) setTextColour('cyan');
    else if (count === 76) setTextColour('green');
    else if (count === 100) setTextColour('gold');

    if (count < percent) {
      if (percent < 10) {
        setTimeout(() => setCount(count + 1), T * 10);
      } else if (count === 99) {
        setTimeout(() => setCount(count + 1), T * 500);
      } else if (count > 95) {
        setTimeout(() => setCount(count + 1), T * 140);
      } else if (count > finalEase) {
        setTimeout(() => setCount(count + 1), T * 70);
      } else if (count > finalEasing) {
        setTimeout(() => setCount(count + 1), T * 40);
      } else if (count > startEase) {
        setTimeout(() => setCount(count + 1), T * 5);
      } else if (count > startEasing) {
        setTimeout(() => setCount(count + 1), T * 10);
      } else if (count > startEased) {
        setTimeout(() => setCount(count + 1), T * 30);
      } else if (count >= 0) {
        setTimeout(() => setCount(count + 1), T * 50);
      }
    }
  }, [count]);

  return (
    <div className={cs.root}>
      <div className={cs.scoreWrapper}>
        <Typography
          className={clsx(cs.typography, cs[textColour], {
            [cs.badScore]: count === percent && percent < 25,
            [cs.topScore]: count === percent && percent > 85 && percent < 100,
          })}
        >
          Score: {count}%
        </Typography>
      </div>
    </div>
  );
};
