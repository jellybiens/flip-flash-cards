import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { ChallengeDeck } from '@ui-kit';
import { cardDeck } from './Atoms/FlipCardWrapper.stories';

const title = 'FlipCardDeck';

const SizeTest = () => (
  <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
    <div style={{ height: 100, width: 100, backgroundColor: '#000' }}></div>
  </Grid>
);

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <ChallengeDeck deck={cardDeck} />
        </Grid>
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
        <SizeTest />
      </Grid>
    </Container>
  );
};

storiesOf('Core/Molecules', module).add(title, Story);
