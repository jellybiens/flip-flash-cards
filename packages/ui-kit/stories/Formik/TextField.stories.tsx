import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { TextFieldInput } from '@ui-kit';
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
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput
                  name="firstname"
                  placeholder="Firstname"
                  charLimit={100}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput
                  name="lastname"
                  charLimit={100}
                  placeholder="Lastname"
                  colour="violet"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} justify="center">
              <Grid item xs={6}>
                <TextFieldInput
                  name="firstname"
                  placeholder="Firstname"
                  charLimit={100}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldInput
                  name="lastname"
                  placeholder="Lastname"
                  charLimit={100}
                  colour="red"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} justify="center">
              <Grid item xs={6}>
                <TextFieldInput
                  fullWidth
                  name="firstname"
                  placeholder="Firstname"
                  colour="blue"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldInput
                  fullWidth
                  name="lastname"
                  placeholder="Lastname"
                  colour="purple"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} justify="center">
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput name="firstname" placeholder="Firstname" colour="green" />
              </Grid>
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput name="lastname" placeholder="Lastname" colour="black" />
              </Grid>
            </Grid>

            <Grid container spacing={2} justify="center">
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput
                  fullWidth
                  multiline
                  name="firstname"
                  placeholder="Firstname"
                  colour="yellow"
                />
              </Grid>
              <Grid item xs={6} style={{ height: 200 }}>
                <TextFieldInput
                  fullWidth
                  multiline
                  name="lastname"
                  placeholder="Lastname"
                  colour="cyan"
                />
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
