import * as React from 'react';
import clsx from 'clsx';
import { CardFaceProps } from '@types';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { PaperCard } from './PaperCard';
import { Typography } from './Typography';
import { FlipCardColours, FlipCardFaceStyles } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardColours(theme),
    ...FlipCardFaceStyles,
  };
});

export const CardFace: React.FC<Omit<CardFaceProps, '_id'>> = ({
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
            <Typography variant="h4">{text}</Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};
