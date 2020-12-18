import * as React from 'react';
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import { PaperCard } from './PaperCard';
import { FlipCardFaceStyles } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardFaceStyles,
    typography: {
      transform: 'translateY(-50%)',
      top: '50%',
      position: 'relative',

      [theme.breakpoints.down('sm')]: { ...theme.typography.body1 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
    },
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

export type CardFaceProps = CardFaceTextProps | CardFaceImageProps;

export const CardFace: React.FC<CardFaceProps> = ({ text, imgLink }) => {
  const cs = useStyles();

  return (
    <Grid container className={cs.cardFace} component={PaperCard}>
      {imgLink && (
        <Grid item xs={12} className={text ? cs.imageArea : cs.fullFace}>
          <div className={cs.imageContainer}>
            <img className={cs.faceImage} src={imgLink} />
          </div>
        </Grid>
      )}
      {text && (
        <Grid item xs={12} className={imgLink ? cs.bottomContainer : cs.fullFace}>
          <Typography className={cs.typography}>{text}</Typography>
        </Grid>
      )}
    </Grid>
  );
};
