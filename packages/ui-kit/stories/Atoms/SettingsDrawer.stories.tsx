import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { SettingsDrawer } from '@ui-kit';

const title = 'SettingsDrawer';

const Story = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <SettingsDrawer {...{ open, setOpen }} />
      <Container title={title}>
        <Grid container spacing={2} justify="center">
          <button onClick={() => setOpen(!open)}>Open Drawer</button>
        </Grid>
      </Container>
    </>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
