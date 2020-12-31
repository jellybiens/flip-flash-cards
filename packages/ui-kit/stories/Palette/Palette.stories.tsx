import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { Container } from '../helpers';
import { CustomColours, Hues } from '@ui-kit';

const title = 'Colours';

type SCProps = { name: string; textColour: string; bgColour: string };

const SquareColour: React.FC<SCProps> = ({ name, textColour, bgColour }) => (
  <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
    <div style={{ height: 100, width: 100, backgroundColor: bgColour, color: textColour }}>
      <span>{name}</span>
    </div>
  </Grid>
);

const Story = () => {
  const theme = useTheme();
  const colours = Object.keys(Hues).map((k: unknown) => k as CustomColours);
  const items = colours.map((c) => (
    <>
      <SquareColour
        bgColour={theme.palette[c].light}
        name={`${c}.light`}
        textColour={theme.palette[c].contrastText}
      />
      <SquareColour
        bgColour={theme.palette[c].main}
        name={`${c}.main`}
        textColour={theme.palette[c].contrastText}
      />
      <SquareColour
        bgColour={theme.palette[c].dark}
        name={`${c}.dark`}
        textColour={theme.palette[c].contrastText}
      />
    </>
  ));
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        {items}
      </Grid>
    </Container>
  );
};

storiesOf('Core/Theme', module).add(title, Story);
