import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { Button, IconKeys, IconNames } from '@ui-kit';
import { CustomColours } from '../src/themes';

const title = 'ResponsiveButton';

const colours = Object.keys(CustomColours).map((k: unknown) => k as CustomColours);

let c = -1;

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {IconKeys.map((icon: IconNames, i) => {
          c = c < 8 ? c + 1 : 0;
          return (
            <>
              <Grid item xs={3} key={i}>
                <Button iconName={icon} colour={colours[c]}>
                  {icon} {colours[c]}
                </Button>
              </Grid>
              <Grid item xs={3} key={i}>
                <Button startIcon={icon} colour={colours[c]}>
                  {icon} {colours[c]}
                </Button>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Buttons', module).add(title, Story);
