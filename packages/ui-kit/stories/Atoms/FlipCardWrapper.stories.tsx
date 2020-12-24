import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { CardFace, FlipCardWrapper } from '@ui-kit';
import { FlipCardProps } from '@types';

const title = 'FlipCardWrapper';

const front1 = {
  text: 'Spongebob',
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const back1 = {
  text: 'Squarepants',
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};
const front2 = {
  text: 'Spongebob',
};
const back2 = {
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};
const front3 = {
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const back3 = {
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};

const cardProps1 = { cardId: 'qwe', front: front1, back: back1, answer: '' };
const cardProps2 = { cardId: 'rty', front: front2, back: back2, answer: '' };
const cardProps3 = { cardId: 'uio', front: back3, back: front3, answer: '' };

export const cardDeck: FlipCardProps[] = [
  cardProps1,
  cardProps2,
  cardProps3,
  cardProps1,
  cardProps2,
  cardProps3,
];

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
          <FlipCardWrapper {...flipProps1}>
            <CardFace {...cardProps1.front} />
            <CardFace {...cardProps1.back} />
          </FlipCardWrapper>
        </Grid>
        <Grid item xs={12}>
          <FlipCardWrapper {...flipProps2}>
            <CardFace {...cardProps2.front} />
            <CardFace {...cardProps2.back} />
          </FlipCardWrapper>
        </Grid>
        <Grid item xs={12}>
          <FlipCardWrapper {...flipProps3}>
            <CardFace {...cardProps3.front} />
            <CardFace {...cardProps3.back} />
          </FlipCardWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
