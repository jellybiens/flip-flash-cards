import * as React from 'react';
import { makeStyles, Theme, Grid, Paper } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type FlipCardProps = {
  frontside: string;
  backside: string;
};

const useStyles = makeStyles((theme: Theme) => {
  const FrontBackSizing: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden' /* Safari */,
    backfaceVisibility: 'hidden',
  };

  return {
    root: { backgroundColor: theme.palette.bg.main },
    flipCard: {
      backgroundColor: theme.palette.bg.main,
      border: '1px solid #f1f1f1',
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
      backgroundColor: '#bbb',
      color: '#000',
      ...FrontBackSizing,
    },

    /* Style the back side */
    flipCardBack: {
      backgroundColor: '#037',
      color: '#fff',
      transform: 'rotateY(180deg)',
      ...FrontBackSizing,
    },
  };
});

export const FlipCard: React.FC<FlipCardProps> = ({ frontside, backside }) => {
  const cs = useStyles();
  const [flipCard, setFlipCard] = React.useState(true);

  return (
    <Grid
      className={cs.flipCard}
      container
      component={Paper}
      item
      xs={12}
      onClick={() => setFlipCard(!flipCard)}
    >
      <Grid container item xs={12} className={flipCard && cs.flipCardInner}>
        <Grid item xs={12} className={cs.flipCardFront}>
          {frontside}
        </Grid>
        <Grid item xs={12} className={cs.flipCardBack}>
          {backside}
        </Grid>
      </Grid>
    </Grid>
  );
};
