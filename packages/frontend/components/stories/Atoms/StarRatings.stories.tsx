import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { StarRatingSubmission, StarRatingTotal } from '@components';

const title = 'StarRatings';

const Story = () => {
  const [rating, setRating] = React.useState(0);

  return (
    <>
      <Container title="StarRatingSubmission">
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <StarRatingSubmission handleSubmitRating={(i) => setRating(i)} />
          </Grid>
          <Grid item xs={2}>
            {rating}
          </Grid>
        </Grid>
      </Container>
      <Container title="StarRatingTotal">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <StarRatingTotal avgRating={3.5} totalVotes={1234} />
          </Grid>
          <Grid item xs={12}>
            <StarRatingTotal avgRating={3.5} totalVotes={1234} />
          </Grid>
          <Grid item xs={12}>
            <StarRatingTotal avgRating={3.5} totalVotes={1234} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
