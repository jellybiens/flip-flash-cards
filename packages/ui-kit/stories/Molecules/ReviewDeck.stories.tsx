import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { ReviewDeck } from '@ui-kit';
import { cardDeck } from '../Atoms/FlipCardWrapper.stories';

const title = 'ReviewDeck';

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <ReviewDeck deckCards={cardDeck} />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Molecules', module).add(title, Story);
