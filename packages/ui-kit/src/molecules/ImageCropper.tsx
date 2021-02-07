import * as React from 'react';
import { Grid, CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { useCreateImage } from '../helpers';
import { ImageCropperWindow } from '../atoms/ImageCropperWindow';
import { Slider } from '../atoms/Slider';
import { useCropDispatch, useCropState } from '../context/CroppingContextProvider';
import { CircleButton, PasteDropButton } from '../atoms/Buttons';

const useStyles = makeStyles(() => ({
  binButton: { position: 'absolute', top: 5, right: 5 },
}));

export type ImageCropperProps = {
  px?: number;
  step?: number;
  min?: number;
  max?: number;
  handleAddImage: () => void;
};

export const ImageCropper: React.FC<ImageCropperProps> = ({
  px = 300,
  step = 0.05,
  min = 1,
  max = 2,
  handleAddImage,
}) => {
  const cs = useStyles();

  const { src, image } = useCropState();
  const { setSrc, setImage, unSet } = useCropDispatch();
  const [zoom, setZoom] = React.useState(1);

  const { image: cratedImage, loading, error } = useCreateImage(src);

  React.useEffect(() => {
    if (cratedImage) setImage(cratedImage);
  }, [cratedImage]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {!!loading && <CircularProgress />}
        {!image && !loading && (
          <div
            style={{
              height: px,
              width: px,
            }}
          >
            <PasteDropButton
              handleReturnSrc={(imageSrc) => setSrc(imageSrc)}
              onClick={() => handleAddImage()}
            />
          </div>
        )}
        {src &&
          !!error && // TODO: Translate
          !loading && (
            <Typography>
              There was an error loading your image, please try again.
            </Typography>
          )}
        {!!image && !loading && (
          <div
            style={{
              height: px,
              width: px,
              position: 'relative',
            }}
          >
            <ImageCropperWindow
              {...{ px, image, zoom }}
              zoomIn={() => setZoom(zoom + step > max ? max : zoom + step)}
              zoomOut={() => setZoom(zoom - step < min ? min : zoom - step)}
            />
            <CircleButton
              className={cs.binButton}
              iconName="bin"
              colour="red"
              size="small"
              onClick={() => {
                unSet();
                setZoom(1);
              }}
            />
          </div>
        )}
      </Grid>
      {!!image && !loading && (
        <Grid item xs={12}>
          <Slider
            value={zoom}
            setValue={setZoom}
            min={min}
            max={max}
            step={step}
            onChange={(_, zoom: number) => setZoom(zoom)}
          />
        </Grid>
      )}
    </Grid>
  );
};
