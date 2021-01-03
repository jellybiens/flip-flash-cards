import * as React from 'react';
import { CardFaceProps } from '@types';
import { makeStyles, Theme, Grid, Typography, useTheme } from '@material-ui/core';
import { PaperCard } from './PaperCard';
import { FlipCardFaceStyles } from '../definitions';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardFaceStyles,
    typography: {
      [theme.breakpoints.only('xs')]: { ...theme.typography.h5 },
      [theme.breakpoints.only('sm')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h3 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
    },
  };
});

export const CardFace: React.FC<CardFaceProps> = ({ text, imgLink, colour = 'white' }) => {
  const cs = useStyles();
  const { palette } = useTheme();
  const paletteColour = palette[colour] as PaletteColor;

  return (
    <Grid
      container
      className={cs.cardFace}
      component={PaperCard}
      style={{
        backgroundColor: paletteColour.main,
        color: paletteColour.contrastText,
      }}
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
