import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Container } from './helpers';
import { CardFaceInputArray } from '@ui-kit';

const title = 'CardFaceInputArray';

const Story = () => {
  return (
    <Container title={title}>
      <CardFaceInputArray />
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
