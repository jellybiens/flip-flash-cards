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
  text: 'Patrick',
  imgLink:
    'https://external-preview.redd.it/TR1L3T91nzSrjq8Jpdo2B6r2VVuWZ4-kLTzOl1O5Bx0.png?auto=webp&s=b4661499712698340cd88068e1360b0db585f8e8',
};
const back2 = {
  text: 'Patrick',
};
const front3 = {
  text: 'Squidward',
  imgLink: 'https://i.ytimg.com/vi/5SbOeQp1EiI/maxresdefault.jpg',
};
const back3 = {
  text: 'Squidward',
  imgLink:
    'https://imgix.bustle.com/uploads/image/2019/11/16/8b29e56f-ec06-4c20-84b8-16d101911649-c001d474a8fb12c64fdeaa6bf2b007a4.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format%2Ccompress',
};

const cardProps1 = { cardId: 'qwe', front: front1, back: back1, answer: '' };
const cardProps2 = { cardId: 'rty', front: front2, back: back2, answer: '' };
const cardProps3 = { cardId: 'uio', front: back3, back: front3, answer: '' };

export const cardDeck: FlipCardProps[] = [cardProps1, cardProps2, cardProps3];

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
