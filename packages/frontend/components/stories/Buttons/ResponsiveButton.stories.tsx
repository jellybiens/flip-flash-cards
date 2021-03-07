import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { ResponsiveButton, IconKeys, IconNames } from '@components';
import { Hues } from '../../src/themes';
import { CustomColours } from '@types';

const title = 'ResponsiveButton';

const colours = Object.keys(Hues).map((k: unknown) => k as CustomColours);

let c = -1;

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {IconKeys.map((icon: IconNames, i) => {
          c = c < 17 ? c + 1 : 0;
          return (
            <React.Fragment key={i}>
              <Grid item xs={3} key={`${i}-iconName-${icon}-${colours[c]}`}>
                <ResponsiveButton iconName={icon} colour={colours[c]}>
                  {icon} {colours[c]}
                </ResponsiveButton>
              </Grid>
              <Grid item xs={3} key={`${i}-startIcon-${icon}-${colours[c]}`}>
                <ResponsiveButton startIcon={icon} colour={colours[c]}>
                  {icon} {colours[c]}
                </ResponsiveButton>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Buttons', module).add(title, Story);
