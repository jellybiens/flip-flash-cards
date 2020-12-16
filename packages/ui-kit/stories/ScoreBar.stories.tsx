import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { ScoreBar } from '@ui-kit';

const title = 'ScoreBar';

const Story = () => {
  const [score, setScore] = React.useState(0);

  const buttons = [];
  for (let i = 0; i <= 100; i = i + 10) {
    buttons.push(<button onClick={() => setScore(i)}>{i}</button>);
  }

  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
        <ScoreBarManipulator />
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);

const ScoreBarManipulator = () => {
  const [score, setScore] = React.useState(0);

  const buttons = [];
  for (let i = 0; i <= 100; i = i + 10) {
    buttons.push(<button onClick={() => setScore(i)}>{i}</button>);
  }

  return (
    <>
      <Grid item xs={12}>
        {buttons} Score: {score}
      </Grid>
      <Grid item xs={12}>
        <ScoreBar score={score} afterAnimationHandler={() => alert(score)} />
        <br />
        <br />
        <br />
      </Grid>
    </>
  );
};
