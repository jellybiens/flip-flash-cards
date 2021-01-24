/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { TopRatedDecksQuery } from '../graphql/queries/getDecksTopRated';
import { Grid } from '@material-ui/core';
import { CardFaceButton } from '@ui-kit';

export const AllDecksPage: React.FC = () => {
  const [language, setLanguage] = React.useState('en');
  const [subject, setSubject] = React.useState('');

  const { loading, error, data } = useQuery(TopRatedDecksQuery, {
    variables: { language, subject },
  });

  if (loading) return <>Loading</>;

  if (data) {
    return (
      <Grid container>
        {data.decks.map((deck, i) => (
          <Grid key={i} item xs={12}>
            <CardFaceButton
              text={deck.text}
              imgLink={deck.imgLink}
              colour={deck.colour}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
};
