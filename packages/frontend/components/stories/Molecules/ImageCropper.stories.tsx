import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import {
  cropImageOnCanvas,
  CroppingContextProvider,
  ImageCropper,
  SquareButton,
  useCropDispatch,
  useCropState,
} from '@components';

const title = 'ImageCropper';

const Story = () => {
  const { setSrc } = useCropDispatch();
  const [croppedImage, setCroppedImage] = React.useState<string>('');

  const uploadInput = React.useRef<HTMLInputElement>();

  const { image, position, scale } = useCropState();
  const px = 300;
  const ImageCropperProps = {
    px,
    handleAddImage: () => uploadInput.current.click(),
  };

  return (
    <Container title={title}>
      <div style={{ padding: 20 }}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={6}>
            <ImageCropper {...ImageCropperProps} />
            <input
              hidden
              ref={uploadInput}
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setSrc(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <img src={croppedImage} />
          </Grid>
          <Grid item xs={6}>
            <SquareButton
              colour="turquoise"
              onClick={() =>
                void cropImageOnCanvas(image, position, scale, px).then((res) =>
                  setCroppedImage(res),
                )
              }
            >
              Crop
            </SquareButton>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const StoryWrapper = () => (
  <CroppingContextProvider>
    <Story />
  </CroppingContextProvider>
);

storiesOf('Core/Molecules', module).add(title, StoryWrapper);
