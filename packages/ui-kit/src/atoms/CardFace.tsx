import * as React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { CardSize } from '@types';

const useStyles = makeStyles(() => {
  return {
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

export type CardFaceTextProps = {
  text: string;
  imgLink?: string;
};
export type CardFaceImageProps = {
  text?: string;
  imgLink: string;
};

type CardFaceProps = (CardFaceTextProps | CardFaceImageProps) & {
  size: CardSize;
};

export const CardFace: React.FC<CardFaceProps> = ({ text, imgLink, size }) => {
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
