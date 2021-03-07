import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Typography } from '@material-ui/core';
import { Container } from '../helpers';
import { NavigationButtons } from '@components';

const title = 'NavigationButtons';

const Story = () => {
  const [totalCards, setTotalCards] = React.useState(3);
  const [topCardIndex, setTopCardIndex] = React.useState(3);

  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography>
            {topCardIndex}
            {' of '}
            {totalCards}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NavigationButtons
            topCardIndex={topCardIndex}
            totalCards={totalCards}
            handleRotate={() => false}
            gotoPreviousCard={() => setTopCardIndex(topCardIndex - 1)}
            gotoNextCard={() => setTopCardIndex(topCardIndex + 1)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {topCardIndex}
            {' of '}
            {totalCards}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NavigationButtons
            creatingDeck
            topCardIndex={topCardIndex}
            totalCards={totalCards}
            handleRotate={() => false}
            gotoPreviousCard={() => setTopCardIndex(topCardIndex - 1)}
            gotoNextCard={() => setTopCardIndex(topCardIndex + 1)}
            addNewCard={() => setTotalCards(totalCards + 1)}
            removeCard={() => setTotalCards(totalCards - 1)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Molecules', module).add(title, Story);
