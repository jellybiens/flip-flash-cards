import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Slider } from '@material-ui/core';
import { Container } from '../helpers';
import { cropImageOnCanvas, ImageCropper, SquareButton, useCreateImage } from '@ui-kit';

const title = 'ImageCropper';

const Story = () => {
  const [croppedImage, setCroppedImage] = React.useState<string>();
  const [imageToCrop, setImageToCrop] = React.useState<string>(
    'https://pbs.twimg.com/media/EYCeOH_U4AAk6SS.jpg',
  );
  const uploadInput = React.useRef<HTMLInputElement>();
  const { image, loading, error } = useCreateImage(imageToCrop);

  const [scale, setScale] = React.useState({
    height: image?.height,
    width: image?.width,
  });
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
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
                  <ImageCropper
                    {...{ image, position, setPosition, scale, setScale, zoom }}
                    px={200}
                  />
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
                <SquareButton
                  colour="turquoise"
                  onClick={() =>
                    cropImageOnCanvas(image, position, scale, 200).then((res) =>
                      setCroppedImage(res),
                    )
                  }
                >
                  Crop
                </SquareButton>
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
