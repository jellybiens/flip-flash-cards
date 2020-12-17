import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid } from '@material-ui/core';
import { CardFace, CardFaceImageProps, CardFaceTextProps } from './CardFace';

export const CARD_WIDTH = 16;

const useStyles = makeStyles(() => {
  const WIDTH = CARD_WIDTH;
  const OUTLINE_COLOUR = '#eee';

  return {
    flipCard: {
      height: '100%',
      width: '100%',
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

export type FlipCardProps = {
  rotate?: boolean;
  setRotate?: () => void;
  frontside: CardFaceTextProps | CardFaceImageProps;
  backside: CardFaceTextProps | CardFaceImageProps;
};

export const FlipCard: React.FC<FlipCardProps> = ({
  rotate = false,
  setRotate = () => null,
  frontside,
  backside,
}) => {
  const cs = useStyles();

  return (
    <div className={cs.flipCard} onClick={() => setRotate()}>
      <Grid container className={clsx(cs.flipCardInner, { [cs.flipCardRotate]: rotate })}>
        <Grid item xs={12} className={clsx(cs.flipCardFront, cs.flipCardFace)}>
          <CardFace {...frontside} />
        </Grid>
        <Grid item xs={12} className={clsx(cs.flipCardBack, cs.flipCardFace)}>
          <CardFace {...backside} />
        </Grid>
      </Grid>
    </div>
  );
};
