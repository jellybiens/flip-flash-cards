import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { ImageCropper, SquareButton } from '@ui-kit';

const title = 'ImageCropper';

const Story = () => {
  const [imageToCrop, setImageToCrop] = React.useState<string>(
    'https://pbs.twimg.com/media/EYCeOH_U4AAk6SS.jpg',
  );
  const [croppedImage, setCroppedImage] = React.useState<string>();
  const uploadInput = React.useRef<HTMLInputElement>();

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
                }}
              >
                Clear
              </SquareButton>
            </>
          )}
          {!croppedImage && imageToCrop ? (
            <Grid item xs={12}>
              <ImageCropper
                image={imageToCrop}
                setCroppedImage={(image) => setCroppedImage(image)}
              />
            </Grid>
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
