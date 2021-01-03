import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { ColourPicker } from '@ui-kit';
import { Formik, Form } from 'formik';

const title = 'ColourPicker';

const Story = () => {
  return (
    <Container title={title}>
      <Formik initialValues={{ colour: 'white' }} onSubmit={() => Promise.resolve(false)}>
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <ColourPicker name="colour" />
              </Grid>
              <Grid item xs={12}>
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
