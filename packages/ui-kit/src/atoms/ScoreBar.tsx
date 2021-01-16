import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

const S = 2.5;

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      height: 10,
      width: '50%',
      left: '25%',
    },
    barWrapper: {
      position: 'relative',
      height: 10,
      width: '100%',
      left: 0,
      top: 0,
      borderRadius: 5,
      overflow: 'hidden',
      borderStyle: 'groove inset',
      borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    popAnimation: {
      animation: `$popAnimation ease-out 1s`,
    },
    '@keyframes popAnimation': {
      '0%': { filter: 'brightness(1)', boxShadow: `#fff 0px 0px 0px;` },
      '50%': {
        filter: 'brightness(2)',
        boxShadow: `${theme.palette.gold.main} 0px 0px 20px;`,
      },
      '100%': { filter: 'brightness(1)', boxShadow: `#fff 0px 0px 0px;` },
    },
    starIconWrapper: {
      position: 'relative',
      height: 0,
      width: 0,
      transform: 'translate(-32px, -31px)',
      zIndex: 100,
    },
    flashStar: {
      height: 'fit-content',
      width: 'fit-content',
      fontSize: '4em',
      transform: 'scale(0) rotate(0deg)',

      background: `-webkit-linear-gradient(${theme.palette.gold.dark}, ${theme.palette.gold.light})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    backStar: {
      height: 'fit-content',
      width: 'fit-content',
      fontSize: '4em',
      transform: 'scale(0) rotate(0deg)',

      background: `-webkit-linear-gradient(${theme.palette.gold.dark}, ${theme.palette.gold.light})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      textShadow: `#fff 0px 0px 0px, #000 0px 0px 5px;`,
    },
    flashStarAnimation: {
      animation: `$flashStar linear 1s`,
      transform: 'scale(0.7) rotate(360deg)',
    },
    '@keyframes flashStar': {
      '0%': {
        filter: 'brightness(1)',
        textShadow: `#fff 0px 0px 0px, #000 0px 0px 5px;`,
        transform: 'scale(0) rotate(0deg)',
      },
      '50%': {
        filter: 'brightness(1)',
        textShadow: `${theme.palette.gold.main} 0px 0px 20px, #000 0px 0px 5px;`,
        transform: 'scale(2.5) rotate(180deg)',
      },
      '100%': {
        color: theme.palette.gold.main,
        filter: 'brightness(1)',
        textShadow: `#fff 0px 0px 0px, #000 0px 0px 5px;`,
        transform: 'scale(0.7) rotate(360deg)',
      },
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
      animation: `$cyan ease ${S / 2}s`,
      backgroundColor: theme.palette.cyan.main,
      transition: `width ${S / 2}s ease-in-out`,
    },
    green: {
      animation: `$green ease ${S / 1.2}s`,
      backgroundColor: theme.palette.green.main,
      transition: `width ${S / 1.2}s ease-in-out`,
    },
    gold: {
      animation: `$gold ease ${S}s`,
      backgroundColor: theme.palette.gold.main,
      transition: `width ${S}s ease-in-out`,
    },
    '@keyframes cyan': {
      '0%': { backgroundColor: theme.palette.dull.main },
      '40%': { backgroundColor: theme.palette.dull.main },
      '60%': { backgroundColor: theme.palette.cyan.main },
      '100%': { backgroundColor: theme.palette.cyan.main },
    },
    '@keyframes green': {
      '0%': { backgroundColor: theme.palette.dull.main },
      '33%': { backgroundColor: theme.palette.dull.main },
      '46%': { backgroundColor: theme.palette.cyan.main },
      '66%': { backgroundColor: theme.palette.cyan.main },
      '100%': { backgroundColor: theme.palette.green.main },
    },
    '@keyframes gold': {
      '0%': { backgroundColor: theme.palette.dull.main },
      '25%': { backgroundColor: theme.palette.dull.main },
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
  const [endAnimation, runEndAnimation] = React.useState(false);
  const [starAnimation, runStarAnimation] = React.useState(false);

  const runAnimation = () => {
    if (score > 65) {
      runEndAnimation(!endAnimation);
    }
    afterAnimationHandler();
  };

  const colour = (() => {
    if (score < 31) return 'dull';
    else if (score < 66) return 'cyan';
    else if (score < 99) return 'green';
    else if (score === 100) {
      score = score + 2;
      return 'gold';
    }
  })();

  return (
    <div className={cs.root}>
      <div className={cs.starIconWrapper} style={{ left: `${score}%` }}>
        <div className={clsx(cs.backStar, { [cs.flashStarAnimation]: starAnimation })}>
          <span>★</span>
        </div>
      </div>
      <div className={cs.starIconWrapper} style={{ left: `${score}%` }}>
        <div className={clsx(cs.flashStar, { [cs.flashStarAnimation]: starAnimation })}>
          <span>★</span>
        </div>
      </div>
      <div
        className={clsx(cs.barWrapper, { [cs.popAnimation]: endAnimation })}
        onTransitionEnd={() => {
          runAnimation();
          runStarAnimation(true);
        }}
      >
        <div
          className={clsx(cs.progress, cs[colour])}
          style={{ width: `${score}%` }}
          onTransitionEnd={runAnimation}
        ></div>
      </div>
    </div>
  );
};
