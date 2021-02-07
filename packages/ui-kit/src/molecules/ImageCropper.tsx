import * as React from 'react';
import {
  ButtonBase,
  Grid,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddImage from '../images/addImage.png';
import { useCreateImage } from '../helpers';
import { ImageCropperWindow } from '../atoms/ImageCropperWindow';
import { Slider } from '../atoms/Slider';
import { useCropDispatch } from '../context/CroppingContextProvider';

const useStyles = makeStyles(() => ({
  buttonContainer: {},
  buttonWrapper: {
    height: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    top: '50%',
    left: '50%',
  },
  buttonImg: {
    height: '100%',
    width: '100%',
  },
}));

export interface ImageCropperProps extends React.HTMLProps<HTMLDivElement> {
  src?: string;
  px?: number;
  step?: number;
  min?: number;
  max?: number;
  handleAddImage: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  px = 300,
  step = 0.05,
  min = 1,
  max = 2,
  handleAddImage,
}) => {
  const cs = useStyles();
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
          <div
            style={{
              height: px,
              width: px,
            }}
          >
            <ButtonBase className={cs.buttonWrapper} onClick={() => handleAddImage()}>
              <img className={cs.buttonImg} src={AddImage} />
            </ButtonBase>
          </div>
        )}
        {src &&
          !!error && // TODO: Translate
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
            zoomIn={() => setZoom(zoom + step > max ? max : zoom + step)}
            zoomOut={() => setZoom(zoom - step < min ? min : zoom - step)}
          />
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
