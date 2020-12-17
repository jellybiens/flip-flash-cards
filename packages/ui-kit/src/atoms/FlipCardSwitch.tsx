import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import { CardPixels } from '@types';
import { CARD_WIDTH as WIDTH, FlipCard } from './FlipCard';

const cardInnerProps = {
  frontside: { text: 'Learn', imgLink: undefined },
  backside: { text: 'Test', imgLink: undefined },
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    backInset: {
      borderStyle: 'groove inset',
      position: 'relative',
      margin: 'auto',
      boxShadow: `grey inset 0px 3px 3px;`,
      backgroundColor: 'rgb(0,0,0,0)',
      [theme.breakpoints.down('xs')]: {
        height: CardPixels.xs / 8,
        width: (CardPixels.xs + WIDTH) / 2,
      },
      [theme.breakpoints.down('sm')]: {
        height: CardPixels.sm / 8,
        width: (CardPixels.sm + WIDTH) / 2,
      },
      [theme.breakpoints.up('md')]: {
        height: CardPixels.md / 8,
        width: (CardPixels.md + WIDTH) / 2,
      },
      [theme.breakpoints.up('lg')]: {
        height: CardPixels.lg / 4,
        width: (CardPixels.lg + WIDTH) / 2,
      },
      [theme.breakpoints.up('xl')]: {
        height: CardPixels.xl / 4 + 1,
        width: (CardPixels.xl + WIDTH) / 2,
      },
    },

    switchContainer: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      transition: 'transform 0.5s',
      transformStyle: 'preserve-3d',
    },
    switchToggle: {
      transform: `rotateY(180deg)`,
    },
    cardContainer: {
      position: 'absolute',
      height: '100%',
      width: '50%',
    },
  };
});

export const FlipCardSwitch: React.FC = () => {
  const cs = useStyles();
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className={cs.backInset} onClick={() => setToggle(!toggle)}>
      <div className={clsx(cs.switchContainer, { [cs.switchToggle]: toggle })}>
        <div className={cs.cardContainer}>
          <FlipCard {...cardInnerProps} />
        </div>
      </div>
    </div>
  );
};
