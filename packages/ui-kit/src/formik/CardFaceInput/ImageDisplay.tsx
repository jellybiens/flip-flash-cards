import * as React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { CircleButton } from '../../atoms/Buttons';
import { FlipCardFaceStyles } from '../../definitions';

export const useStyles = makeStyles(() => ({
  ...FlipCardFaceStyles,
  binButton: { position: 'absolute', top: 5, right: 5 },
}));

type ImageDisplayProps = {
  handleRevertImage: () => void;
  imgLink: string;
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  handleRevertImage,
  imgLink,
}) => {
  const cs = useStyles();

  return (
    <Grid item xs={12}>
      <img className={cs.faceImage} src={imgLink} />
      <CircleButton
        className={cs.binButton}
        iconName="bin"
        colour="red"
        size="small"
        onClick={handleRevertImage}
      />
    </Grid>
  );
};
