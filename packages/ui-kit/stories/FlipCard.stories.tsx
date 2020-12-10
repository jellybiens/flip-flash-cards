import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { FlipCard } from '@ui-kit';

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={10} justify="center">
        <Grid item>
          <FlipCard frontside="Hello" backside="World" />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('FlipCard', Story);
