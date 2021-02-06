import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Slider } from '@material-ui/core';
import { Container } from '../helpers';
import {
  CroppingContextProvider,
  ImageCropperWindow,
  SquareButton,
  useCreateImage,
} from '@ui-kit';

const title = 'ImageCropperWindow';

const Story = () => {
  const [croppedImage, setCroppedImage] = React.useState<string>();
  const [imageToCrop, setImageToCrop] = React.useState<string>(
    'https://pbs.twimg.com/media/EYCeOH_U4AAk6SS.jpg',
  );
  const uploadInput = React.useRef<HTMLInputElement>();
  const { image, loading, error } = useCreateImage(imageToCrop);
  const [zoom, setZoom] = React.useState(1);

  return (
    <Container title={title}>
      <div style={{ padding: 50 }}>
        <Grid container spacing={2} justify="center">
          {!!croppedImage && (
            <>
              <img src={croppedImage} />
              <SquareButton
                fullWidth
                startIcon="bin"
                colour="orange"
                onClick={() => {
                  setCroppedImage(null);
                  setImageToCrop(null);
                  setZoom(1);
                }}
              >
                Clear
              </SquareButton>
            </>
          )}
          {!croppedImage && imageToCrop ? (
            <>
              <Grid item xs={12}>
                {!loading && image && (
                  <CroppingContextProvider>
                    <ImageCropperWindow
                      {...{ image, zoom }}
                      zoomIn={() => setZoom(zoom + 0.05 > 2 ? 2 : zoom + 0.05)}
                      zoomOut={() => setZoom(zoom - 0.05 < 1 ? 1 : zoom - 0.05)}
                      px={200}
                    />
                  </CroppingContextProvider>
                )}
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={zoom}
                  min={1}
                  max={2}
                  step={0.05}
                  aria-labelledby="Zoom"
                  onChange={(_, zoom: number) => setZoom(zoom)}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <input
                hidden
                ref={uploadInput}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setImageToCrop(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <SquareButton
                fullWidth
                startIcon="save"
                colour="cyan"
                onClick={() => uploadInput.current.click()}
              >
                Upload Image
              </SquareButton>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
