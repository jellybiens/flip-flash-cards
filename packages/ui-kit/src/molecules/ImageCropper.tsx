import * as React from 'react';
import { ButtonBase, Grid, CircularProgress, Typography } from '@material-ui/core';
import AddImage from '../images/addImage.png';
import { useCreateImage } from '../helpers';
import { ImageCropperWindow } from '../atoms/ImageCropperWindow';
import { Slider } from '../atoms/Slider';
import { useCropDispatch } from '../context/CroppingContextProvider';

type ImageCropperProps = {
  src?: string;
  px: number;
  step?: number;
  handleAddImage: () => void;
};

export const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  px,
  step = 0.05,
  handleAddImage,
}) => {
  const { image, loading, error } = useCreateImage(src);

  const { setImage } = useCropDispatch();
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    if (image) setImage(image);
  }, [image]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {!!loading && <CircularProgress />}
        {!image && !loading && (
          <ButtonBase onClick={() => handleAddImage()}>
            <img src={AddImage} style={{ height: px, width: px }} />
          </ButtonBase>
        )}
        {src &&
          error && // TODO: Translate
          !loading && (
            <ButtonBase onClick={() => handleAddImage()}>
              <Typography>
                There was an error loading your image, please try again.
              </Typography>
            </ButtonBase>
          )}
        {!!image && !loading && (
          <ImageCropperWindow
            {...{ px, image, zoom }}
            zoomIn={() => setZoom(zoom + step > 2 ? 2 : zoom + step)}
            zoomOut={() => setZoom(zoom - step < 1 ? 1 : zoom - step)}
          />
        )}
      </Grid>
      {!!image && !loading && (
        <Grid item xs={12}>
          <Slider
            value={zoom}
            setValue={setZoom}
            min={1}
            max={2}
            step={step}
            onChange={(_, zoom: number) => setZoom(zoom)}
          />
        </Grid>
      )}
    </Grid>
  );
};
