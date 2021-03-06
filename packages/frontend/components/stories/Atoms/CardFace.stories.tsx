import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Container } from '../helpers';
import { CardFace, FlipCardSizing } from '@components';
import { CustomColours } from '@types';

const title = 'CardFace';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
      ...FlipCardSizing(theme),
    },
  };
});

const frontside1 = {
  colour: 'yellow' as CustomColours,
  text: 'Spongebob',
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
};
const backside1 = {
  colour: 'red' as CustomColours,
  text: 'Squarepants',
  imgLink:
    'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl',
};

const Story = () => {
  const cs = useStyles();
  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <div className={cs.root}>
            <CardFace {...frontside1} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={cs.root}>
            <CardFace {...backside1} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
