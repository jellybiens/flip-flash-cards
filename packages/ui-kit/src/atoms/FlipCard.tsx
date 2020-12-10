import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Grid, Paper } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme: Theme) => {
  const FrontBackSizing: CSSProperties = {
    position: 'absolute',
    border: '3px solid #000',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden' /* Safari */,
    backfaceVisibility: 'hidden',
  };

  return {
    flipCard: {
      width: 100,
      height: 100,
      perspective: 1000,
    },

    /* This container is needed to position the front and back side */
    flipCardInner: {
      position: 'relative',
      textAlign: 'center',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
    },

    flipCardRotate: {
      transform: 'rotateY(180deg)',
    },

    /* Style the front side (fallback if image is missing) */
    flipCardFront: {
      backgroundColor: theme.palette.bg.main,
      color: '#000',
      ...FrontBackSizing,
    },

    /* Style the back side */
    flipCardBack: {
      backgroundColor: '#037',
      color: '#000',
      transform: 'rotateY(180deg)',
      ...FrontBackSizing,
    },
  };
});

type FlipCardProps = {
  index: number;
  frontside: string;
  backside: string;
};

export const FlipCard: React.FC<FlipCardProps> = ({ index, frontside, backside }) => {
  const cs = useStyles();
  const [flipCard, setFlipCard] = React.useState(false);

  return (
    <Grid className={cs.flipCard} container item xs={12} onClick={() => setFlipCard(!flipCard)}>
      <Grid
        container
        item
        xs={12}
        className={clsx(cs.flipCardInner, { [cs.flipCardRotate]: flipCard })}
      >
        <Grid component={Paper} item xs={12} className={cs.flipCardFront}>
          {frontside}
        </Grid>
        <Grid component={Paper} item xs={12} className={cs.flipCardBack}>
          {backside}
        </Grid>
      </Grid>
    </Grid>
  );
};
