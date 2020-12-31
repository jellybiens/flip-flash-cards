import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { Modal, Score, LoadingBar } from '@ui-kit';

const title = 'Score';

const Story = () => {
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const buttons = [];
  for (let i = 0; i <= 100; i = i + 10) {
    buttons.push(
      <button
        key={i}
        onClick={() => {
          setScore(i);
          setOpen(true);
        }}
      >
        {i}
      </button>,
    );
  }

  const ModalEl = (
    <Modal open={open}>
      <Grid container spacing={2} justify="center" style={{ height: '100%' }}>
        <Grid item xs={12} style={{ height: '50%' }}>
          <Score score={score} max={100} />
        </Grid>
        <Grid xs={12}>
          <LoadingBar handleLoaded={() => false} />
        </Grid>
        <Grid item xs={12} style={{ height: '50%' }}>
          <button onClick={() => setOpen(false)}>close</button>
        </Grid>
      </Grid>
    </Modal>
  );
  return (
    <Container title={title}>
      {ModalEl}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          {buttons}
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
