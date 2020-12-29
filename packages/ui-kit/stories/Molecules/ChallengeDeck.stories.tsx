import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { ChallengeDeck, SquareButton } from '@ui-kit';
import { cardDeck } from '../Atoms/FlipCardWrapper.stories';

const title = 'ChallengeDeck';

const Story = () => {
  const [difficulty, setDifficulty] = React.useState(false);
  const d = difficulty ? 'easy' : 'hard';

  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <SquareButton colour="blue" onClick={() => setDifficulty(!difficulty)}>
            {d}
          </SquareButton>
        </Grid>
        <Grid item xs={12}>
          <ChallengeDeck deckCards={cardDeck} difficulty={d} />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Molecules', module).add(title, Story);
