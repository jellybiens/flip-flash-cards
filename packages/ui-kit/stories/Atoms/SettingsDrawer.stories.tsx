import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { SettingsDrawer } from '@ui-kit';
import { Languages } from '@types';

const title = 'SettingsDrawer';

const Story = () => {
  const [open, setOpen] = React.useState(false);
  const [defaultLang, setLanguage] = React.useState<Languages>('de');

  return (
    <>
      <SettingsDrawer {...{ open, setOpen }} {...{ defaultLang, setLanguage }} />
      <Container title={title}>
        <Grid container spacing={2} justify="center">
          <button onClick={() => setOpen(!open)}>Open Drawer</button>
        </Grid>
      </Container>
    </>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
