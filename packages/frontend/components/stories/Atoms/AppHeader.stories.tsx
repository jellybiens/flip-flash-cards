import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppHeader } from '@components';

const title = 'AppHeader';

const Story = () => {
  const [open, setOpen] = React.useState(false);

  return <AppHeader {...{ open, setOpen }} />;
};

storiesOf('Core/Atoms', module).add(title, Story);
