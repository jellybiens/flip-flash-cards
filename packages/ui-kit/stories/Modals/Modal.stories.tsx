import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { Modal } from '@ui-kit';

const title = 'Modal';

const Story = () => {
  const [open, setOpen] = React.useState(false);

  const ModalEl = (
    <Modal open={open}>
      <Container title={title}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <button onClick={() => setOpen(false)}>Close Modal</button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
  return (
    <Container title={title}>
      {ModalEl}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <button onClick={() => setOpen(true)}>Open Modal</button>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Modals', module).add(title, Story);
