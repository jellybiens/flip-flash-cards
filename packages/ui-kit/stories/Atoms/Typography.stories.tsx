import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, TypographyVariant } from '@material-ui/core';
import { Container } from '../helpers';
import { Typography } from '@ui-kit';

const title = 'Typography';

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'overline',
];

const Story = () => {
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {variants.map((v: TypographyVariant) => (
          <Grid item xs={12}>
            <Typography variant={v}>{v}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
