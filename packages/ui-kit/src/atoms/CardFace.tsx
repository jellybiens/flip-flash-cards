import * as React from 'react';
import { makeStyles, Theme, Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  return {
    cardFace: {
      height: '100%',
      width: '100%',
      padding: '1%',
      textAlign: 'center',
    },
    textContainer: { height: '20%', width: '100%' },
    typography: {
      transform: 'translateY(-50%)',
      top: '50%',
      position: 'relative',

      [theme.breakpoints.down('sm')]: { ...theme.typography.body1 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
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

type CardFaceProps = CardFaceTextProps | CardFaceImageProps;

const PaperCard: React.FC = ({ ...props }) => <Paper variant="outlined" square {...props} />;

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
        <Grid item xs={12} className={imgLink ? cs.textContainer : cs.fullFace}>
          <Typography className={cs.typography}>{text}</Typography>
        </Grid>
      )}
    </Grid>
  );
};
