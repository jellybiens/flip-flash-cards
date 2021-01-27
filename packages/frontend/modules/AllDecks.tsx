import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { NewestDecksQuery } from '../graphql/queries/getDecksNewest';
import { Grid, makeStyles } from '@material-ui/core';
import { CardFaceButton } from '@ui-kit';
import { DeckOverviewProps } from '@types';

const useStyles = makeStyles(() => ({
  pageWrapper: {
    maxWidth: 800,
    margin: 'auto',
  },
  pageContainer: {
    paddingTop: 15,
  },
}));

export const AllDecksPage: React.FC = () => {
  const cs = useStyles();

  const [language, setLanguage] = React.useState('en');
  const [subject, setSubject] = React.useState('');

  const history = useHistory();
  const navigate = (link) => history.push(link);

  const { loading, error, data } = useQuery<{ decks: DeckOverviewProps[] }>(
    NewestDecksQuery,
    {
      variables: { language, subject },
    },
  );

  if (loading) return <>Loading</>;

  if (data) {
    return (
      <Grid container spacing={0} justify="center">
        <Grid container spacing={4} item xs={12}>
          {data.decks.map((deck, i) => (
            <Grid key={i} item xs={3}>
              <CardFaceButton
                onClick={() => navigate(`/PlayDeck/${deck._id}`)}
                text={deck.title}
                imgLink={deck.imgLink}
                colour={deck.colour}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
};
