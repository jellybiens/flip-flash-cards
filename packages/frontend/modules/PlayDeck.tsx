import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DeckCardsQuery } from '../graphql/queries/getDeckCards';
import { Grid } from '@material-ui/core';
import { ChallengeDeck } from '@components';
import { FlipCardProps } from '@types';

export const PlayDeckPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();

  const { loading, error, data } = useQuery<{ cards: FlipCardProps[] }>(DeckCardsQuery, {
    variables: { deckId },
  });

  if (loading) return <>Loading</>;

  if (data) {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ChallengeDeck
            deckCards={data.cards}
            difficulty="easy"
            handleReportFinalScore={(score) => console.log(score)}
          />
        </Grid>
      </Grid>
    );
  }
};
