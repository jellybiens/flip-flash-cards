import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { FlipCard } from '@ui-kit';

const frontside1 = {
  text: 'Spongebob',
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const backside1 = {
  text: 'Squarepants',
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};
const frontside2 = {
  text: 'Spongebob',
};
const backside2 = {
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};
const frontside3 = {
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const backside3 = {
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};

const cardProps1 = { frontside: frontside1, backside: backside1 };
const cardProps2 = { frontside: frontside2, backside: backside2 };
const cardProps3 = { frontside: backside3, backside: frontside3 };

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={10} justify="center">
        <Grid item xs={3}>
          <FlipCard index={0} {...cardProps1} size="sm" />
        </Grid>
        <Grid item xs={3}>
          <FlipCard index={0} {...cardProps2} size="sm" />
        </Grid>
        <Grid item xs={3}>
          <FlipCard index={0} {...cardProps3} size="sm" />
        </Grid>
        <Grid item xs={6}>
          <FlipCard index={0} {...cardProps1} size="md" />
        </Grid>
        <Grid item xs={6}>
          <FlipCard index={0} {...cardProps2} size="md" />
        </Grid>
        <Grid item xs={6}>
          <FlipCard index={0} {...cardProps1} size="lg" />
        </Grid>
        <Grid item xs={6}>
          <FlipCard index={0} {...cardProps2} size="lg" />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('FlipCard', Story);
