import * as React from 'react';
import { Grid } from '@material-ui/core';
import { CircleButton } from '../../atoms/Buttons';
import { useStyles } from './useCardStyles';

type ImageDisplayProps = {
  handleRevertImage: () => void;
  imgLink: string;
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ handleRevertImage, imgLink }) => {
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
