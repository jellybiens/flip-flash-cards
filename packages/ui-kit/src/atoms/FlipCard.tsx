import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Grid, Paper, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { CardSize, CardPixels } from '@types';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const useStyles = makeStyles((theme: Theme) => {
  const WIDTH = 16;
  const OUTLINE_COLOUR = theme.palette.paper.main;

  const FrontBackSizing: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  return {
    sm: { height: CardPixels.sm, width: CardPixels.sm },
    md: { height: CardPixels.md, width: CardPixels.md },
    lg: { height: CardPixels.lg, width: CardPixels.lg },

    flipCard: {
      animation: '$fadeIn ease 0.5s',
      margin: 'auto',
      display: 'flex',
      perspective: 3000,
      transformStyle: 'preserve-3d',
    },

    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(40px)' },
      '100%': { opacity: 1, transform: 'translateY(0px)' },
    },

    rightSwipe: {
      animation: '$rightSwipe ease 0.5s',
    },
    leftSwipe: {
      animation: '$leftSwipe ease 0.5s',
    },
    '@keyframes rightSwipe': {
      '0%': { opacity: 1, transform: 'translate(0vw, 0px) rotate(0deg)' },
      '99%': { opacity: 0, transform: 'translate(200%, -20%) rotate(30deg)' },
      '100%': { display: 'none' },
    },
    '@keyframes leftSwipe': {
      '0%': { opacity: 1, transform: 'translate(0vw, 0px) rotate(0deg)' },
      '99%': { opacity: 0, transform: 'translate(-200%, -20%) rotate(-30deg)' },
      '100%': { display: 'none' },
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
        borderRadius: 5,
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

    /* Style the front side (fallback if image is missing) */
    flipCardFront: {
      transform: `translate3d(0px, 0px, ${WIDTH / 2}px)`,
      ...FrontBackSizing,
    },

    /* Style the back side */
    flipCardBack: {
      transform: `translate3d(0px, 0px, -${WIDTH / 2}px) rotateY(180deg)`,
      ...FrontBackSizing,
    },

    cardFace: { height: '100%', width: '100%', padding: '1%' },
    textContainer: { height: '20%', width: '100%' },
    typography: {
      transform: 'translateY(-50%)',
      top: '50%',
      position: 'relative',
    },
    imageArea: { height: '80%', width: '100%', padding: '5% 5% 0 5%' },
    imageContainer: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      borderRadius: 10,
      borderStyle: 'groove inset',
    },
    faceImage: { objectFit: 'cover', height: '100%', width: '100%' },
    fullFace: { height: '100%', width: '100%', padding: '5%' },
  };
});

type CardFaceTextProps = {
  text: string;
  imgLink?: string;
};
type CardFaceImageProps = {
  text?: string;
  imgLink: string;
};

type CardFaceProps = (CardFaceTextProps | CardFaceImageProps) & {
  size: CardSize;
};

export type FlipCardProps = {
  frontside: CardFaceTextProps | CardFaceImageProps;
  backside: CardFaceTextProps | CardFaceImageProps;
  size?: CardSize;
};

const PaperCard: React.FC = ({ ...props }) => <Paper variant="outlined" {...props} />;

export const FlipCard: React.FC<FlipCardProps> = ({ frontside, backside, size = 'md' }) => {
  const cs = useStyles();
  const [rotate, setRotate] = React.useState(false);
  const [rightSwipe, setRightSwipe] = React.useState(false);
  const [leftSwipe, setLeftSwipe] = React.useState(false);
  const [blockKeydown, setBlockKeydown] = React.useState(false);

  const handleKeyPress = (key) => {
    switch (key) {
      case 'space': {
        if (!blockKeydown) {
          setRotate(!rotate);
          setBlockKeydown(true);
          setTimeout(() => setBlockKeydown(false), 800);
        }

        break;
      }
      case 'right': {
        setRightSwipe(true);
        setTimeout(() => setRightSwipe(false), 600);
        break;
      }
      case 'left': {
        setLeftSwipe(true);
        setTimeout(() => setLeftSwipe(false), 600);
        break;
      }
    }
  };

  return (
    <div
      className={clsx(cs[size], cs.flipCard, {
        [cs.rightSwipe]: rightSwipe,
        [cs.leftSwipe]: leftSwipe,
      })}
      onClick={() => setRotate(!rotate)}
    >
      <KeyboardEventHandler handleKeys={['space', 'right', 'left']} onKeyEvent={handleKeyPress} />

      <Grid container className={clsx(cs.flipCardInner, { [cs.flipCardRotate]: rotate })}>
        <Grid item xs={12} component={PaperCard} className={cs.flipCardFront}>
          <CardFace {...frontside} size={size} />
        </Grid>
        <Grid item xs={12} component={PaperCard} className={cs.flipCardBack}>
          <CardFace {...backside} size={size} />
        </Grid>
      </Grid>
    </div>
  );
};

const CardFace: React.FC<CardFaceProps> = ({ text, imgLink, size }) => {
  const cs = useStyles();
  const textVariant = (() => {
    switch (size) {
      case 'sm': {
        return 'body1';
      }
      case 'md': {
        return 'h4';
      }
      case 'lg': {
        return 'h2';
      }
    }
  })();

  return (
    <Grid container className={cs.cardFace}>
      {imgLink && (
        <Grid item xs={12} className={text ? cs.imageArea : cs.fullFace}>
          <div className={cs.imageContainer}>
            <img className={cs.faceImage} src={imgLink} />
          </div>
        </Grid>
      )}
      {text && (
        <Grid item xs={12} className={imgLink ? cs.textContainer : cs.fullFace}>
          <Typography className={cs.typography} variant={textVariant}>
            {text}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
