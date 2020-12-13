import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { CardFace } from '@ui-kit';

const frontside1 = {
  text: 'Spongebob',
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const backside1 = {
  text: 'Squarepants',
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={10} justify="center">
        <Grid item xs={6}>
          <CardFace {...frontside1} size="sm" />
        </Grid>
        <Grid item xs={6}>
          <CardFace {...backside1} size="sm" />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('CardFace', Story);
