import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CardFaceButton, FlipCardSizing, PlayDeckModal } from '@ui-kit';
import { cardDeck } from '../Atoms/FlipCardWrapper.stories';
import { Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { DeckOverviewProps } from '@types';

const title = 'PlayDeckModal';

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

const Story = () => {
  const cs = useStyles();
  const [open, setOpen] = React.useState(true);
  const props: DeckOverviewProps = {
    _id: 'blahbalh',
    title: 'Spongebob People',
    colour: 'red',
    imgLink: 'https://static.wikia.nocookie.net/spongebob/images/2/26/Bubbletown_002.png',
    cards: cardDeck,
    score: 3.5,
    subject: 'english',
    language: 'en',
    totalVotes: 2134,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <>
      <PlayDeckModal {...{ open, ...props }} onClose={() => setOpen(false)} />
      <Container title={title}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <div className={cs.root}>
              <CardFaceButton
                text={props.title}
                imgLink={props.imgLink}
                colour={props.colour}
                onClick={() => setOpen(true)}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

storiesOf('Core/Modals', module).add(title, Story);
