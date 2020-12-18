import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { TextField } from '@ui-kit';
import { Form, Formik, FormikHelpers } from 'formik';

const title = 'TextField';

type InitVals = {
  firstname: string;
  lastname: string;
};

const Story = () => {
  const initialValues = {
    firstname: '',
    lastname: '',
  };

  const [error, setErrors] = React.useState({});

  return (
    <Container title={title}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={(values: InitVals, helpers: FormikHelpers<InitVals>) => {
          alert(JSON.stringify(values));
          helpers.setErrors({
            firstname: 'Incorrect',
            lastname: 'Try again',
          });
          return Promise.resolve(false);
        }}
      >
        {({ handleSubmit, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <TextField name="firstname" label="Firstname" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="lastname" label="Lastname" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              Values <code>{JSON.stringify(values)}</code>
            </Grid>
            <Grid item xs={12}>
              Errors <code>{JSON.stringify(errors)}</code>
            </Grid>
            <Grid item xs={12}>
              <button type="submit">Set Errors</button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
