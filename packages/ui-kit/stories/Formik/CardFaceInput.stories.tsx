import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { CardFaceInput, FlipCardWrapper } from '@ui-kit';
import { Form, Formik } from 'formik';

const title = 'CardFaceInput';

type CardFacePropsFieldValues = {
  text?: string;
  imgLink?: string;
  imgFile?: File;
};

type InitVals = {
  frontface: CardFacePropsFieldValues;
  backface: CardFacePropsFieldValues;
};

const initialValues: InitVals = {
  frontface: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
  backface: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
};

const Story = () => {
  return (
    <Container title={title}>
      <Formik initialValues={initialValues} onSubmit={() => Promise.resolve(false)}>
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} sm={6}>
                <FlipCardWrapper>
                  <CardFaceInput cardIndex={0} name="frontface" front />
                  <CardFaceInput cardIndex={0} name="backface" back />
                </FlipCardWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <code>{JSON.stringify(values)}</code>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
