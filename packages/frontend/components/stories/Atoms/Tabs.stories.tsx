import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, TabPanel } from '@components';

const title = 'Tabs';

const Story = () => {
  const [visibleTab, setVisibleTab] = React.useState(0);
  const tabs = ['tab 1', 'tab 2', 'tab 3'];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Tabs {...{ tabs, visibleTab, setVisibleTab }} />
      <TabPanel value={visibleTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={visibleTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={visibleTab} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};
storiesOf('Core/Atoms', module).add(title, Story);
