import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { CircleButton, IconKeys, IconNames } from '@ui-kit';
import { Hues } from '../../src/themes';
import { CustomColours } from '@types';

const title = 'CircleButton';

const colours = Object.keys(Hues).map((k: unknown) => k as CustomColours);
let c = -1;
const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {IconKeys.map((icon: IconNames, i) => {
          c = c < 8 ? c + 1 : 0;
          return (
            <Grid item key={i} xs={4} container spacing={6}>
              <Grid item xs={6} container>
                <Grid item xs={12}>
                  <code>iconName={icon}</code>
                </Grid>
                <Grid item xs={12}>
                  <code>colour={colours[c]}</code>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <CircleButton iconName={icon} colour={colours[c]} />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Buttons', module).add(title, Story);
