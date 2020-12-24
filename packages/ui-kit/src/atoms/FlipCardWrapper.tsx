import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Theme } from '@material-ui/core';
import { FlipCardSizing } from '../definitions';

export const CARD_WIDTH = 16;

const useStyles = makeStyles((theme: Theme) => {
  const WIDTH = CARD_WIDTH;
  const OUTLINE_COLOUR = '#eee';

  return {
    flipCard: {
      ...FlipCardSizing(theme),
      position: 'relative',
      margin: 'auto',
      perspective: 3000,
      transformStyle: 'preserve-3d',
    },
    /* This container is needed to position the front and back side */
    flipCardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
      boxShadow: `grey 0px 6px 7px;`,
      '&::after': {
        backgroundColor: OUTLINE_COLOUR,
        bottom: 0,
        contain: 'content',
        content: '""',
        left: 0,
        width: WIDTH,
        transform: `translate3d(-${WIDTH - 1}px, 0px, ${WIDTH / 2}px) rotateY(-90deg)`,
        transformOrigin: '100% 50%',
      },
    },

    flipCardRotate: {
      transform: 'rotateY(180deg)',
    },

    flipCardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    },

    /* Style the front side (fallback if image is missing) */
    flipCardFront: {
      transform: `translate3d(0px, 0px, ${WIDTH / 2}px)`,
    },

    /* Style the back side */
    flipCardBack: {
      transform: `translate3d(0px, 0px, -${WIDTH / 2}px) rotateY(180deg)`,
    },
  };
});

export type FlipCardWrapperProps = {
  rotate?: boolean;
  setRotate?: () => void;
  className?: string;
};

export const FlipCardWrapper: React.FC<FlipCardWrapperProps> = ({
  rotate = false,
  setRotate = () => null,
  className,
  children,
}) => {
  const cs = useStyles();

  return (
    <div className={clsx(cs.flipCard, className)} onClick={() => setRotate()}>
      <Grid container className={clsx(cs.flipCardInner, { [cs.flipCardRotate]: rotate })}>
        <Grid item xs={12} className={clsx(cs.flipCardFront, cs.flipCardFace)}>
          {children[0] || children}
        </Grid>
        {children[1] && (
          <Grid item xs={12} className={clsx(cs.flipCardBack, cs.flipCardFace)}>
            {children[1]}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
