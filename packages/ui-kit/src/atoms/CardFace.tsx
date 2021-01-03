import * as React from 'react';
import clsx from 'clsx';
import { CardFaceProps } from '@types';
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import { PaperCard } from './PaperCard';
import { FlipCardColours, FlipCardFaceStyles } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardColours(theme),
    ...FlipCardFaceStyles,
    typography: {
      [theme.breakpoints.only('xs')]: { ...theme.typography.h5 },
      [theme.breakpoints.only('sm')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h3 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
    },
  };
});

export const CardFace: React.FC<CardFaceProps> = ({
  text,
  imgLink,
  colour = 'white',
}) => {
  const cs = useStyles(colour);

  return (
    <Grid
      container
      className={clsx(cs[`${colour}Card`], cs.cardFace)}
      component={PaperCard}
    >
      {imgLink && (
        <Grid item xs={12} className={text ? cs.imageArea : cs.fullFace}>
          <div className={cs.imageContainer}>
            <img className={cs.faceImage} src={imgLink} />
          </div>
        </Grid>
      )}
      {text && (
        <Grid item xs={12} className={imgLink ? cs.bottomContainer : cs.fullFace}>
          <div className={cs.bottomWrapper}>
            <Typography className={cs.typography}>{text}</Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};
