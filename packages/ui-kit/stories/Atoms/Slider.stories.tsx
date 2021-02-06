import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '../helpers';
import { Slider } from '@ui-kit';

const title = 'Slider';

const Story = () => {
  const [value, setValue] = React.useState(1);
  return (
    <Container title={title}>
      <Slider
        value={value}
        setValue={setValue}
        min={1}
        max={2}
        step={0.05}
        onChange={(_, v) => setValue(v)}
      />
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
