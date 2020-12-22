import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Container } from './helpers';
import { CardFace, FlipCard } from '@ui-kit';

const title = 'FlipCard';

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

export const cardDeck = [cardProps1, cardProps2, cardProps3, cardProps1, cardProps2, cardProps3];

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
    },
  };
});

const Story = () => {
  const [rotate1, setRotate1] = React.useState(false);
  const [rotate2, setRotate2] = React.useState(false);
  const [rotate3, setRotate3] = React.useState(false);
  const flipProps1 = { rotate: rotate1, setRotate: () => setRotate1(!rotate1) };
  const flipProps2 = { rotate: rotate2, setRotate: () => setRotate2(!rotate2) };
  const flipProps3 = { rotate: rotate3, setRotate: () => setRotate3(!rotate3) };

  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <FlipCard {...flipProps1}>
            <CardFace {...cardProps1.frontside} />
            <CardFace {...cardProps1.backside} />
          </FlipCard>
        </Grid>
        <Grid item xs={12}>
          <FlipCard {...flipProps2}>
            <CardFace {...cardProps2.frontside} />
            <CardFace {...cardProps2.backside} />
          </FlipCard>
        </Grid>
        <Grid item xs={12}>
          <FlipCard {...flipProps3}>
            <CardFace {...cardProps3.frontside} />
            <CardFace {...cardProps3.backside} />
          </FlipCard>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
