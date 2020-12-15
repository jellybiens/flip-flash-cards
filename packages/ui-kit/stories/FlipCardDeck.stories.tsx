import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { FlipCardDeck } from '@ui-kit';
import { cardDeck } from './FlipCard.stories';

const SizeTest = () => (
  <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
    <div style={{ height: 100, width: 100, backgroundColor: '#000' }}></div>
  </Grid>
);

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <FlipCardDeck deck={cardDeck} />
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

storiesOf('Core/Atoms', module).add('FlipCardDeck', Story);
