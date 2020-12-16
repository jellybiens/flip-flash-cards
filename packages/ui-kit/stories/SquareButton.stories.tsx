import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from './helpers';
import { SquareButton, IconKeys, IconNames } from '@ui-kit';
import { CustomColours } from '../src/themes';

const title = 'SquareButton';

const colours = Object.keys(CustomColours).map((k: unknown) => k as CustomColours);

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {IconKeys.map((icon: IconNames, i) => {
          return (
            <Grid item xs={4} key={i}>
              <SquareButton startIcon={icon} colour={colours[Math.round(i / 8)]}>
                {icon}
              </SquareButton>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={2} justify="center">
        {colours.map((colour, i) => {
          return (
            <Grid item xs={4} key={i}>
              <SquareButton fullWidth colour={colour}>
                {colour}
              </SquareButton>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Buttons', module).add(title, Story);
