import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container, FormikStateValues } from '../helpers';
import { Formik } from 'formik';
import { ImageCropperField, ImageCropFieldArgs, cropImageOnCanvas } from '@ui-kit';

const title = 'ImageCropperField';

const initialValues: { imageCropArgs: ImageCropFieldArgs } = {
  imageCropArgs: {
    image: null,
    position: { x: 0, y: 0 },
    scale: null,
    px: null,
  },
};

const Story = () => {
  const [img, setImg] = React.useState(null);

  return (
    <Container title={title}>
      <Formik
        initialValues={initialValues}
        onSubmit={({ imageCropArgs: { image, position, scale, px } }) =>
          cropImageOnCanvas(image, position, scale, px).then((i) => setImg(i))
        }
      >
        {({ handleSubmit }) => (
          <Grid container spacing={2} justify="center">
            <Grid item xs={6}>
              <ImageCropperField />
            </Grid>
            <Grid item xs={6}>
              <img src={img} />
            </Grid>
            <Grid item xs={6}>
              <button onClick={() => handleSubmit()}>Submit/Crop</button>
            </Grid>
            <Grid item xs={6}>
              <FormikStateValues />
            </Grid>
          </Grid>
        )}
      </Formik>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
