import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { FlipCardSwitch } from '@ui-kit';

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <FlipCardSwitch />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('FlipCardSwitch', Story);