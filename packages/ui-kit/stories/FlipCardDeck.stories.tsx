import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { FlipCardDeck } from '@ui-kit';
import { cardDeck } from './FlipCard.stories';

const Story = () => {
  return (
    <Container title="Flipcard">
      <Grid container spacing={10} justify="center">
        <Grid item xs={3}>
          <FlipCardDeck deck={cardDeck} size="sm" />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('FlipCardDeck', Story);
