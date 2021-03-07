import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Container } from '../helpers';
import { CardFaceButton, FlipCardSizing } from '@components';
import { CardFaceProps } from '@types';

const title = 'CardFaceButton';

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

const frontside1: CardFaceProps = {
  text: 'Spongebob',
  imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
  colour: 'red',
};
const backside1: CardFaceProps = {
  colour: 'cyan',
  text: 'Spongebob',
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
            <CardFaceButton {...frontside1} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={cs.root}>
            <CardFaceButton {...backside1} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Buttons', module).add(title, Story);
