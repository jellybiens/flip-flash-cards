import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { NewestDecksQuery } from '../graphql/queries/getDecksNewest';
import { Grid } from '@material-ui/core';
import { CardFaceButton } from '@ui-kit';
import { DeckOverviewProps } from '@types';

export const AllDecksPage: React.FC = () => {
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
      <Grid container spacing={4}>
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
    );
  }
};
