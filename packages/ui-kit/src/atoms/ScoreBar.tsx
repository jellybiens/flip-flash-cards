import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

const S = 2.5;

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      height: 10,
      width: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      borderStyle: 'groove inset',
      borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    progress: {
      height: 14,
      transform: 'translate(-1%, -2px)',
      borderRadius: 10,
      width: 0,
    },
    dull: {
      backgroundColor: theme.palette.dull.main,
      transition: `width ${S / 3}s ease-in-out`,
    },
    cyan: {
      animation: `$blue ease ${S / 2}s`,
      backgroundColor: theme.palette.cyan.main,
      transition: `width ${S / 2}s ease-in-out`,
    },
    green: {
      animation: `$green ease ${S / 1.2}s`,
      backgroundColor: theme.palette.green.main,
    },
    gold: {
      animation: `$gold ease ${S}s`,
      backgroundColor: theme.palette.gold.main,
      transition: `width ${S}s ease-in-out`,
    },
    '@keyframes cyan': {
      '0%': { backgroundColor: 'grey' },
      '40%': { backgroundColor: 'grey' },
      '60%': { backgroundColor: theme.palette.cyan.main },
      '100%': { backgroundColor: theme.palette.cyan.main },
    },
    '@keyframes green': {
      '0%': { backgroundColor: 'grey' },
      '33%': { backgroundColor: 'grey' },
      '46%': { backgroundColor: theme.palette.cyan.main },
      '66%': { backgroundColor: theme.palette.cyan.main },
      '100%': { backgroundColor: theme.palette.green.main },
    },
    '@keyframes gold': {
      '0%': { backgroundColor: 'grey' },
      '25%': { backgroundColor: 'grey' },
      '35%': { backgroundColor: theme.palette.cyan.main },
      '65%': { backgroundColor: theme.palette.cyan.main },
      '75%': { backgroundColor: theme.palette.green.main },
      '99%': { backgroundColor: theme.palette.green.main },
      '99.001%': { backgroundColor: theme.palette.gold.main },
      '100%': { backgroundColor: theme.palette.gold.main },
    },
  };
});

export type ScoreBarProps = { score: number; afterAnimationHandler?: () => void };

export const ScoreBar: React.FC<ScoreBarProps> = ({
  score,
  afterAnimationHandler = () => null,
}) => {
  const cs = useStyles();

  const colour = (() => {
    if (score < 31) return 'grey';
    else if (score < 66) return 'cyan';
    else if (score < 99) return 'green';
    else if (score === 100) {
      score = score + 2;
      return 'gold';
    }
  })();

  return (
    <div className={cs.root}>
      <div
        className={clsx(cs.progress, cs[colour])}
        style={{ width: `${score}%` }}
        onTransitionEnd={afterAnimationHandler}
      ></div>
    </div>
  );
};
